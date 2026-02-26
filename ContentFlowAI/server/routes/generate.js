import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const buildPrompt = (topic, audience_type, selected_platforms) => {
  const platformsStr = selected_platforms.join(', ');
  return `
You are Antigravity, the AI engine of ContentFlow AI.

Your task is to generate structured, platform-optimized content for students and early professionals in India.

Strict Rules:
- Return ONLY valid JSON.
- No markdown.
- No explanations outside JSON.
- Follow schema exactly.

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
- Max 1300 characters
- 3-5 hashtags

Instagram:
- Conversational tone
- 5-10 hashtags
- Engaging style

Blog:
- 800-1200 words
- SEO structure
- Meta description

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
const MODEL_FALLBACKS = [
  'gemini-2.0-flash',
  'gemini-1.5-flash',
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
          generationConfig: { temperature: 0.8, topP: 0.95, maxOutputTokens: 8192 },
        });

        const result = await model.generateContent(prompt);
        const text = result.response.text();
        const cleaned = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
        const parsed = JSON.parse(cleaned);

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

        if (msg.includes('429') || msg.includes('Too Many Requests') || msg.includes('exhausted')) {
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

        if (msg.includes('prompt is too long')) {
          return res.status(400).json({ error: 'The provided topic or input is too large. Please reduce the length of your text.' });
        }

        if (err instanceof SyntaxError) {
          return res.status(500).json({ error: 'Failed to parse AI response as JSON. Please retry.' });
        }

        // For other errors, log and try next model
        console.error(`Gemini API Error with ${modelName}:`, err);
        break;
      }
    }
  }

  console.error('All models quota-exhausted or API key expired. Returning exact error to user.');

  // Don't use mock data, return the real Google Generative AI Error so the user knows it's an actual API limit
  return res.status(429).json({
    error: `Google Generative AI Error: Your API Key hit the daily free-tier quota limits (429 Too Many Requests). Details: ${lastError?.message || 'Quota Exhausted'}. Please provide a new API key in server/.env or wait for the quota to reset.`
  });
});

export { router as generateRoute };
