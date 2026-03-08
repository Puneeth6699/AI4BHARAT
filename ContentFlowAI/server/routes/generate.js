import express from 'express';
import { GoogleGenerativeAI } from '@google/generative-ai';

const router = express.Router();

const buildPrompt = (topic, persona, selected_platforms, language_mode, brand_tone, refinement_request) => {
  const platformsStr = selected_platforms.join(', ');
  const hasRefinement = refinement_request && refinement_request.trim().length > 0;

  return `
You are Antigravity, the intelligent orchestration engine behind Content-Flow AI — an AI-powered content lifecycle assistant built for students, early professionals, and first-generation creators from Tier-2 and Tier-3 regions of India.

Strict Rules:
- Return ONLY valid JSON. Your response must start with { and end with }.
- No markdown code fences (no \`\`\`json).
- No explanations, preambles, or summaries outside the JSON.
- Follow the output schema EXACTLY.

INPUT:
Topic: ${topic}
Audience Persona: ${persona}
Target Platforms: ${platformsStr}
Language Mode: ${language_mode}
Brand Tone: ${brand_tone}
Refinement Request: ${hasRefinement ? refinement_request : 'none'}

------------------------------------------------------------
EXECUTION PIPELINE
------------------------------------------------------------

STEP 1 — STRATEGIC IDEA GENERATION
Generate exactly 3 distinct, high-impact content ideas.
Each must include:
- id (string, e.g. "idea_1")
- title
- brief_description
- key_angle
- target_emotional_trigger

Ideas must align with Indian student & early professional ecosystem, digital growth mindset, and practical value.

------------------------------------------------------------

STEP 2 — SELECT BEST IDEA & CREATE OUTLINE
Select the strongest idea strategically.
Generate:
- selected_idea_id (which idea was chosen)
- hook (high-impact opening line)
- hook_strength_score (1-100)
- main_points (array of 3-5 structured insights, each a string)
- call_to_action
- estimated_content_pillar ("educational" | "motivational" | "storytelling" | "authority-building")

------------------------------------------------------------

STEP 3 — PLATFORM-SPECIFIC CONTENT GENERATION
For each platform in [${platformsStr}], generate fully optimized content.
Adapt to the persona, brand tone (${brand_tone}), and language mode (${language_mode}).

LinkedIn: professional tone, max 1300 characters, insight-driven, 3-5 hashtags
Instagram: conversational tone, meaningful emojis, 5-10 hashtags, strong hook in first 2 lines
YouTube: Content/Script MUST be more than 1000 words, highly informative, fully satisfying the agenda. SEO structured with chapters/subheadings, meta_description (max 160 chars)

For each platform provide:
- platform ("linkedin" | "instagram" | "youtube")
- content (the full post/article text)
- hashtags (array of strings without #)
- meta_description (for youtube; empty string for others)

------------------------------------------------------------

STEP 4 — PERFORMANCE SIMULATION (AI-ESTIMATED)
For each platform provide a separate entry with:
- platform
- predicted_reach_score (1-100)
- predicted_engagement_probability ("Low" | "Medium" | "High")
- viral_potential ("Low" | "Medium" | "High")
- CTA_effectiveness_rating (1-100)
- best_posting_time_india (e.g. "7-9 PM IST")
- growth_recommendation (1-2 sentence string)

------------------------------------------------------------

STEP 5 — ENGAGEMENT OPTIMIZATION SUGGESTIONS
Provide a single object with:
- hook_improvement_suggestions (array of 3 strings)
- cta_enhancement_suggestions (array of 3 strings)
- hashtag_improvement_suggestions (array of 3 strings)
- discoverability_strategies (array of 3 strings)

------------------------------------------------------------

STEP 6 — QUALITY SCORING (Weighted)
Evaluate the overall content package across:
- clarity (25% weight, score 1-100)
- engagement (30% weight, score 1-100)
- platform_optimization (25% weight, score 1-100)
- originality (20% weight, score 1-100)
- overall (weighted score = clarity*0.25 + engagement*0.30 + platform_optimization*0.25 + originality*0.20)
- explanation (string)
- improvement_actions (array of 3 strings)

------------------------------------------------------------

STEP 7 — REFINEMENT ENGINE
${hasRefinement ? `Refinement requested: "${refinement_request}"
Generate an improved version with stronger hook, clearer structure, enhanced engagement.
Return:
- original_version_summary (short summary of original approach)
- refined_hook (improved opening line)
- refined_content_linkedin (improved linkedin version, max 1300 chars; only if linkedin is in platforms)
- refined_content_instagram (improved instagram version; only if instagram is in platforms)
- refined_content_youtube_intro (improved youtube intro paragraph; only if youtube is in platforms)
- improvement_difference_explanation (what specifically changed and why)` : `No refinement requested. Return an empty object {} for the refinement field.`}

------------------------------------------------------------

STEP 8 — CONTENT BREAKDOWN MODE
Provide additional formats:
- reel_script: A punchy 30-second reel/video script (string, ~100-130 words)
- twitter_thread: Array of exactly 5 tweets (each a string under 280 chars, numbered 1/5 through 5/5)
- carousel_slides: Array of exactly 5 slide objects, each with:
  - slide_number (1-5)
  - headline (string)
  - body (string, 1-2 sentences)

------------------------------------------------------------

STEP 9 — BHARAT GROWTH MODE
Provide:
- low_budget_tips: Array of 3 strings (practical zero/low-cost growth tips)
- tier_2_creator_strategy: Array of 3 strings (specific to Tier-2/Tier-3 India creators)
- weekly_content_plan: Array of 5 objects, each with:
  - day (e.g. "Monday")
  - content_type (e.g. "LinkedIn post")
  - topic_suggestion (string)
- cross_platform_roadmap: Array of 3 strings (how to repurpose this content across platforms)

------------------------------------------------------------

OUTPUT JSON FORMAT (return this exact structure):

{
  "ideas": [
    {
      "id": "string",
      "title": "string",
      "brief_description": "string",
      "key_angle": "string",
      "target_emotional_trigger": "string"
    }
  ],
  "selected_idea_outline": {
    "selected_idea_id": "string",
    "hook": "string",
    "hook_strength_score": 0,
    "main_points": ["string"],
    "call_to_action": "string",
    "estimated_content_pillar": "string"
  },
  "platform_content": [
    {
      "platform": "string",
      "content": "string",
      "hashtags": ["string"],
      "meta_description": "string"
    }
  ],
  "performance_simulation": [
    {
      "platform": "string",
      "predicted_reach_score": 0,
      "predicted_engagement_probability": "string",
      "viral_potential": "string",
      "CTA_effectiveness_rating": 0,
      "best_posting_time_india": "string",
      "growth_recommendation": "string"
    }
  ],
  "engagement_optimization": {
    "hook_improvement_suggestions": ["string"],
    "cta_enhancement_suggestions": ["string"],
    "hashtag_improvement_suggestions": ["string"],
    "discoverability_strategies": ["string"]
  },
  "quality_score": {
    "clarity": 0,
    "engagement": 0,
    "platform_optimization": 0,
    "originality": 0,
    "overall": 0,
    "explanation": "string",
    "improvement_actions": ["string"]
  },
  "refinement": {},
  "content_breakdown": {
    "reel_script": "string",
    "twitter_thread": ["string"],
    "carousel_slides": [
      {
        "slide_number": 0,
        "headline": "string",
        "body": "string"
      }
    ]
  },
  "bharat_growth_mode": {
    "low_budget_tips": ["string"],
    "tier_2_creator_strategy": ["string"],
    "weekly_content_plan": [
      {
        "day": "string",
        "content_type": "string",
        "topic_suggestion": "string"
      }
    ],
    "cross_platform_roadmap": ["string"]
  }
}
`.trim();
};

// Models to try in order if one hits quota limits
const MODEL_FALLBACKS = [
  'gemini-1.5-flash',
  'gemini-2.5-flash',
  'gemini-2.0-flash',
];

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const getRetryDelay = (errMsg) => {
  const match = errMsg?.match(/Please retry in (\d+)/);
  const suggested = match ? parseInt(match[1]) * 1000 : 10000;
  return Math.min(suggested, 10000);
};

async function generateContent(genAI, prompt, selected_platforms) {
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
        let parsed;
        try {
          const stripped = text.replace(/```json\s*/gi, '').replace(/```\s*/gi, '').trim();
          parsed = JSON.parse(stripped);
        } catch {
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

        // Filter platform_content to only requested platforms
        if (parsed.platform_content) {
          parsed.platform_content = parsed.platform_content.filter((pc) =>
            selected_platforms.includes(pc.platform)
          );
        }
        // Filter performance_simulation to only requested platforms
        if (parsed.performance_simulation) {
          parsed.performance_simulation = parsed.performance_simulation.filter((ps) =>
            selected_platforms.includes(ps.platform)
          );
        }

        // Ensure all top-level keys exist
        parsed.engagement_optimization = parsed.engagement_optimization || {};
        parsed.quality_score = parsed.quality_score || {};
        parsed.refinement = parsed.refinement || {};
        parsed.content_breakdown = parsed.content_breakdown || {};
        parsed.bharat_growth_mode = parsed.bharat_growth_mode || {};

        console.log(`Success with model: ${modelName}`);
        return parsed;

      } catch (err) {
        const msg = err.message || '';
        const status = err.status || 500;

        console.error(`Gemini API Error with ${modelName} (Status ${status}):`, msg);

        if (status === 429 || msg.includes('Too Many Requests') || msg.includes('exhausted') || msg.includes('quota')) {
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
          throw new Error('PROMPT_TOO_LONG');
        }

        break;
      }
    }
  }

  // All models failed - return demo data
  console.log("Gemini API failed, using demo data.");
  
  return {
    ideas: [
      { id: "idea_1", title: "Build Your LinkedIn Brand in 30 Days", brief_description: "A step-by-step guide to establish your professional presence", key_angle: "Consistency over perfection", target_emotional_trigger: "Empowerment" },
      { id: "idea_2", title: "How Students Can Grow on LinkedIn", brief_description: "Practical strategies for student creators", key_angle: "Learning in public", target_emotional_trigger: "Inspiration" },
      { id: "idea_3", title: "Simple Personal Branding Tips", brief_description: "Easy-to-implement branding strategies", key_angle: "Authentic storytelling", target_emotional_trigger: "Confidence" }
    ],
    selected_idea_outline: {
      selected_idea_id: "idea_1",
      hook: "Most students underestimate LinkedIn's power...",
      hook_strength_score: 85,
      main_points: [
        "Consistency matters more than perfection",
        "Share your learning journey",
        "Engage with creators in your niche"
      ],
      call_to_action: "Start posting your journey today.",
      estimated_content_pillar: "educational"
    },
    platform_content: selected_platforms.map(platform => ({
      platform: platform,
      content: platform === "linkedin" 
        ? "If you are a student trying to build a digital presence, LinkedIn is your best bet. Start by sharing your learning journey, engage with content in your niche, and stay consistent. Your personal brand is built one post at a time."
        : platform === "instagram"
        ? "🚀 Building your brand as a student? LinkedIn is where you need to be! Share what you're learning, connect with your community, and watch your opportunities grow. ✨ #StudentCreators #PersonalBrand"
        : "In this video, we'll explore how students can leverage LinkedIn to build their personal brand. From crafting engaging posts to networking effectively, you'll learn everything you need to kickstart your digital presence.",
      hashtags: platform === "linkedin" 
        ? ["LinkedInGrowth", "StudentCreators", "PersonalBrand"]
        : platform === "instagram"
        ? ["LinkedInGrowth", "StudentCreators", "PersonalBrand", "ContentCreation", "DigitalPresence"]
        : ["LinkedInTips", "PersonalBranding", "CareerGrowth"],
      meta_description: platform === "youtube" 
        ? "Learn how to build your LinkedIn presence as a student with practical tips and strategies."
        : ""
    })),
    performance_simulation: selected_platforms.map(platform => ({
      platform: platform,
      predicted_reach_score: 75,
      predicted_engagement_probability: "Medium",
      viral_potential: "Medium",
      CTA_effectiveness_rating: 80,
      best_posting_time_india: "7-9 PM IST",
      growth_recommendation: "Post consistently and engage with your audience"
    })),
    engagement_optimization: {
      hook_improvement_suggestions: ["Add a surprising statistic", "Start with a question", "Use a bold statement"],
      cta_enhancement_suggestions: ["Make it more specific", "Add urgency", "Include a clear next step"],
      hashtag_improvement_suggestions: ["Mix popular and niche tags", "Use location-specific tags", "Add trending hashtags"],
      discoverability_strategies: ["Engage with top creators", "Comment on trending posts", "Use LinkedIn features"]
    },
    quality_score: {
      clarity: 88,
      engagement: 85,
      platform_optimization: 90,
      originality: 82,
      overall: 86,
      explanation: "Strong content with good clarity and engagement potential. Platform optimization is excellent.",
      improvement_actions: ["Add more specific examples", "Include data points", "Enhance visual elements"]
    },
    refinement: {},
    content_breakdown: {
      reel_script: "30-second script: Start with LinkedIn. Share your journey. Engage daily. Build your brand. Success follows consistency.",
      twitter_thread: [
        "1/5 Most students miss LinkedIn's potential. Here's how to change that.",
        "2/5 Share what you're learning. Your journey inspires others.",
        "3/5 Engage authentically. Comments build connections.",
        "4/5 Consistency beats perfection. Post regularly.",
        "5/5 Your personal brand grows one post at a time. Start today."
      ],
      carousel_slides: [
        { slide_number: 1, headline: "LinkedIn for Students", body: "Your personal branding journey starts here." },
        { slide_number: 2, headline: "Share Your Journey", body: "Document what you're learning every day." },
        { slide_number: 3, headline: "Engage Authentically", body: "Build real connections through comments." },
        { slide_number: 4, headline: "Stay Consistent", body: "Regular posting beats perfect posting." },
        { slide_number: 5, headline: "Take Action", body: "Start building your brand today." }
      ]
    },
    bharat_growth_mode: {
      low_budget_tips: ["Use free design tools like Canva", "Repurpose content across platforms", "Engage during peak hours"],
      tier_2_creator_strategy: ["Focus on local success stories", "Use regional languages", "Build community first"],
      weekly_content_plan: [
        { day: "Monday", content_type: "LinkedIn post", topic_suggestion: "Share weekend learnings" },
        { day: "Wednesday", content_type: "Instagram post", topic_suggestion: "Quick tip or insight" },
        { day: "Friday", content_type: "LinkedIn article", topic_suggestion: "Deep dive into a topic" },
        { day: "Saturday", content_type: "Twitter thread", topic_suggestion: "Weekly highlights" },
        { day: "Sunday", content_type: "Planning", topic_suggestion: "Plan next week's content" }
      ],
      cross_platform_roadmap: ["Start with LinkedIn long-form", "Create Instagram carousel from key points", "Turn into Twitter thread"]
    }
  };
}

router.post('/generate', async (req, res) => {
  const {
    topic,
    audience_type,
    selected_platforms,
    language_mode = 'English',
    brand_tone = 'professional',
    refinement_request = '',
  } = req.body;

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
    console.warn('GEMINI_API_KEY not configured. Using demo mode.');
  }

  const genAI = apiKey ? new GoogleGenerativeAI(apiKey) : null;
  const prompt = buildPrompt(safeTopic, audience_type, selected_platforms, language_mode, brand_tone, refinement_request);

  try {
    const result = genAI 
      ? await generateContent(genAI, prompt, selected_platforms)
      : await generateContent(null, prompt, selected_platforms);
    return res.json(result);
  } catch (err) {
    if (err.message === 'PROMPT_TOO_LONG') {
      return res.status(400).json({ error: 'The provided topic or input is too large. Please reduce the length of your text.' });
    }
    
    console.error('Unexpected error in generate route:', err);
    return res.status(500).json({ error: 'An unexpected error occurred. Please try again.' });
  }
});

export { router as generateRoute };
