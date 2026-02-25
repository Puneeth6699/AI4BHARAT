import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const buildPrompt = (topic, audience_type, selected_platforms) => {
    const platformsStr = selected_platforms.join(' | ');
    return `
You are the Antigravity AI Engine powering Content-Flow AI, an AI-driven content lifecycle assistant built for students, early professionals, and first-generation creators from Tier-2 and Tier-3 regions of India.

Your role is to transform a single topic into a complete, platform-optimized, audience-personalized content package with engagement optimization insights and structured quality scoring.

INPUT:
Topic: ${topic}
Target Audience: ${audience_type}
Platforms: ${platformsStr}

EXECUTION WORKFLOW:

STEP 1 — IDEA GENERATION
Generate exactly 3 distinct, high-quality content ideas based on the topic.
Each idea must include:
- id
- title
- brief_description (2-3 concise lines)
- key_angle (unique positioning perspective)

Ensure ideas are practical, relevant, and aligned with Indian student or early professional audiences where appropriate.

STEP 2 — STRATEGIC IDEA SELECTION & OUTLINE
Select the strongest idea strategically.
Create:
- hook (compelling opening line)
- main_points (3-5 structured insights)
- call_to_action (clear and actionable)
Tailor tone and depth according to the specified audience.

STEP 3 — PLATFORM-SPECIFIC CONTENT GENERATION
For each requested platform, generate optimized content while maintaining core message consistency.

LinkedIn:
- Professional tone
- Maximum 1300 characters
- 3-5 relevant hashtags
- Insight-driven structure
- Clear CTA

Instagram:
- Conversational and engaging tone
- Meaningful emoji usage
- 5-10 hashtags
- Scroll-stopping hook
- Storytelling style

Blog:
- 800-1200 words
- SEO-optimized
- Introduction, structured sections, conclusion
- Clear subheadings
- Meta description (max 160 characters)

STEP 4 — ENGAGEMENT OPTIMIZATION
For each platform version, provide:
- optimal_posting_time_india
- engagement_suggestions (specific, actionable improvements)
- discoverability tips (hashtags/keywords guidance)
- CTA enhancement suggestion if applicable

STEP 5 — QUALITY SCORING
Evaluate content using the following weighted criteria:
- clarity (25%)
- engagement (30%)
- platform_optimization (25%)
- originality (20%)

Provide:
- clarity score (1-100)
- engagement score (1-100)
- platform_optimization score (1-100)
- originality score (1-100)
- overall score (weighted average)
- explanation (reasoning for scores)
- improvements (specific actionable refinements)

OUTPUT FORMAT (STRICT JSON):

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
        "clarity": number,
        "engagement": number,
        "platform_optimization": number,
        "originality": number,
        "overall": number,
        "explanation": "string",
        "improvements": ["string"]
      }
    }
  ]
}

Return raw JSON only. No commentary. No markdown. No additional text.
`.trim();
};

router.post('/generate', async (req, res) => {
    const { topic, audience_type, selected_platforms } = req.body;

    if (!topic || !audience_type || !selected_platforms || selected_platforms.length === 0) {
        return res.status(400).json({
            error: 'Missing required fields: topic, audience_type, selected_platforms',
        });
    }

    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey || apiKey === 'your_gemini_api_key_here') {
        return res.status(500).json({
            error: 'GEMINI_API_KEY not configured. Please set it in server/.env',
        });
    }

    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({
            model: 'gemini-1.5-flash',
            generationConfig: {
                temperature: 0.8,
                topP: 0.95,
                maxOutputTokens: 8192,
            },
        });

        const prompt = buildPrompt(topic, audience_type, selected_platforms);
        const result = await model.generateContent(prompt);
        const text = result.response.text();

        // Strip any markdown code fences if present
        const cleaned = text
            .replace(/```json\s*/gi, '')
            .replace(/```\s*/gi, '')
            .trim();

        const parsed = JSON.parse(cleaned);

        // Filter platform_content to only include requested platforms
        if (parsed.platform_content) {
            parsed.platform_content = parsed.platform_content.filter((pc) =>
                selected_platforms.includes(pc.platform)
            );
        }

        return res.json(parsed);
    } catch (err) {
        console.error('Gemini API Error:', err);
        if (err instanceof SyntaxError) {
            return res.status(500).json({ error: 'Failed to parse AI response as JSON. Please retry.' });
        }
        return res.status(500).json({ error: err.message || 'Internal server error' });
    }
});

export { router as generateRoute };
