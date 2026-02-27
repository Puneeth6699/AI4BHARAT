import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const buildPrompt = (topic, audience_type, selected_platforms) => {
  const platformsStr = selected_platforms.join(', ');
  return `
You are Antigravity, the AI engine of ContentFlow AI.

Your task is to generate structured, platform-optimized content for students and early professionals in India.

Strict Rules:
- IMPORTANT: Your response must start with { and end with }. No other text before or after.
- Return ONLY a single valid JSON object. Nothing else.
- No markdown code fences (no \`\`\`json).
- No explanations, preambles, or summaries outside the JSON.
- Follow the output schema exactly.

INPUT:
Topic: ${topic}
Audience: ${audience_type}
Platforms: ${platformsStr}

PROCESS:

1) Generate exactly 3 distinct content ideas.
Each idea must contain:
- id
- title
- brief_description
- key_angle

2) Select the strongest idea strategically.
Create an outline with:
- hook
- main_points (3-5 items)
- call_to_action

3) For each requested platform, generate optimized content:

LinkedIn:
- Professional tone
- Max 1000 characters
- 3-5 hashtags

Instagram:
- Conversational tone
- Max 300 characters
- 3-5 hashtags
- Engaging style

Blog:
- 400-600 words
- SEO structure
- Meta description (max 160 characters)

4) Provide quality scores:
- clarity (1-100)
- engagement (1-100)
- platform_optimization (1-100)
- originality (1-100)
- overall (weighted average)

Also include:
- explanation
- improvements
- optimal_posting_time_india
- engagement_suggestions

OUTPUT JSON FORMAT:

{
  "ideas": [
    {
      "id": "string",
      "title": "string",
      "brief_description": "string",
      "key_angle": "string"
    }
  ],
  "selected_idea_outline": {
    "hook": "string",
    "main_points": ["string"],
    "call_to_action": "string"
  },
  "platform_content": [
    {
      "platform": "linkedin | instagram | blog",
      "content": "string",
      "hashtags": ["string"],
      "optimal_posting_time_india": "string",
      "engagement_suggestions": ["string"],
      "quality_score": {
        "clarity": 0,
        "engagement": 0,
        "platform_optimization": 0,
        "originality": 0,
        "overall": 0,
        "explanation": "string",
        "improvements": ["string"]
      }
    }
  ]
}
`.trim();
};

// Models to try in order if one hits quota limits
// Only models confirmed available via ListModels for this API key
const MODEL_FALLBACKS = [
  'gemini-2.5-flash',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRetryDelay = (errMsg) => {
  const match = errMsg?.match(/Please retry in (\d+)/);
  const suggested = match ? parseInt(match[1]) * 1000 : 10000;
  return Math.min(suggested, 10000); // reduced cap to 10s
};

router.post('/generate', async (req, res) => {
  const { topic, audience_type, selected_platforms } = req.body;

  if (!topic || !audience_type || !selected_platforms || selected_platforms.length === 0) {
    return res.status(400).json({
      error: 'Missing required fields: topic, audience_type, selected_platforms',
    });
  }

  // Cap topic length
  let safeTopic = topic;
  if (safeTopic.length > 300000) {
    safeTopic = safeTopic.substring(0, 300000) + '... [text truncated to fit AI limits]';
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'your_gemini_api_key_here') {
    return res.status(500).json({
      error: 'GEMINI_API_KEY not configured. Please set it in server/.env',
    });
  }

  const genAI = new GoogleGenerativeAI(apiKey);
  const prompt = buildPrompt(safeTopic, audience_type, selected_platforms);
  let lastError = null;

  for (const modelName of MODEL_FALLBACKS) {
    const MAX_RETRIES = 1;
    for (let attempt = 0; attempt <= MAX_RETRIES; attempt++) {
      try {
        console.log(`Trying model: ${modelName} (attempt ${attempt + 1})`);
        const model = genAI.getGenerativeModel({
          model: modelName,
          generationConfig: {
            temperature: 0.5,
            topP: 0.95,
            maxOutputTokens: 16384,
            responseMimeType: 'application/json',
          },
        });

        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();

        // Robustly extract the first valid JSON object from the response.
        // gemini-2.5-flash sometimes adds thinking text or preambles around the JSON.
        let parsed;
        try {
          // First attempt: strip markdown fences and try direct parse
          const stripped = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
          parsed = JSON.parse(stripped);
        } catch {
          // Second attempt: find the first {...} block using regex
          const match = text.match(/\{[\s\S]*\}/);
          if (!match) {
            console.error(`No JSON object found in response from ${modelName}. Raw text:`, text.substring(0, 500));
            throw new SyntaxError('No JSON object found in AI response');
          }
          try {
            parsed = JSON.parse(match[0]);
          } catch (innerErr) {
            console.error(`JSON parse failed for ${modelName}. Raw text:`, text.substring(0, 500));
            throw new SyntaxError(`Failed to parse JSON from AI response: ${innerErr.message}`);
          }
        }

        if (parsed.platform_content) {
          parsed.platform_content = parsed.platform_content.filter((pc) =>
            selected_platforms.includes(pc.platform)
          );
        }

        console.log(`Success with model: ${modelName}`);
        return res.json(parsed);

      } catch (err) {
        lastError = err;
        const msg = err.message || '';
        const status = err.status || 500;

        console.error(`Gemini API Error with ${modelName} (Status ${status}):`, msg);

        if (status === 429 || msg.includes('Too Many Requests') || msg.includes('exhausted')) {
          if (attempt < MAX_RETRIES) {
            const delay = getRetryDelay(msg);
            console.warn(`Rate limited on ${modelName}. Retrying in ${delay / 1000}s...`);
            await sleep(delay);
            continue;
          } else {
            console.warn(`Quota exhausted for ${modelName}. Trying next model...`);
            break;
          }
        }

        if (status === 404 || msg.includes('not found')) {
          console.warn(`Model ${modelName} not found or not available for this API key. Trying next...`);
          break;
        }

        if (msg.includes('prompt is too long')) {
          return res.status(400).json({ error: 'The provided topic or input is too large. Please reduce the length of your text.' });
        }

        if (err instanceof SyntaxError) {
          return res.status(500).json({ error: 'Failed to parse AI response as JSON. Please retry.' });
        }

        // For other errors, try next model
        break;
      }
    }
  }

  console.error('All models failed or quota-exhausted. Returning best error to user.');

  const finalStatus = lastError?.status || 429;
  return res.status(finalStatus).json({
    error: `Gemini AI Error: ${lastError?.message || 'The AI service is currently unavailable.'}`,
    details: 'This usually happens due to quota limits or temporary API issues. Please check your API key in server/.env or try again later.'
  });
});

export { router as generateRoute };
