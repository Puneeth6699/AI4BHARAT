// ─── Input / Request ──────────────────────────────────────────────────────────

export interface GenerateRequest {
    topic: string;
    audience_type: string;
    selected_platforms: string[];
    language_mode?: 'English' | 'Hindi' | 'Hinglish';
    brand_tone?: string;
    refinement_request?: string;
}

// ─── Step 1: Ideas ────────────────────────────────────────────────────────────

export interface Idea {
    id: string;
    title: string;
    brief_description: string;
    key_angle: string;
    target_emotional_trigger: string;
}

// ─── Step 2: Selected Idea Outline ────────────────────────────────────────────

export interface SelectedIdeaOutline {
    selected_idea_id: string;
    hook: string;
    hook_strength_score: number;
    main_points: string[];
    call_to_action: string;
    estimated_content_pillar: 'educational' | 'motivational' | 'storytelling' | 'authority-building' | string;
}

// ─── Step 3: Platform Content ─────────────────────────────────────────────────

export interface PlatformContent {
    platform: 'linkedin' | 'instagram' | 'youtube';
    content: string;
    hashtags: string[];
    meta_description: string;
}

// ─── Step 4: Performance Simulation ──────────────────────────────────────────

export interface PerformanceSimulation {
    platform: 'linkedin' | 'instagram' | 'youtube';
    predicted_reach_score: number;
    predicted_engagement_probability: 'Low' | 'Medium' | 'High';
    viral_potential: 'Low' | 'Medium' | 'High';
    CTA_effectiveness_rating: number;
    best_posting_time_india: string;
    growth_recommendation: string;
}

// ─── Step 5: Engagement Optimization ─────────────────────────────────────────

export interface EngagementOptimization {
    hook_improvement_suggestions: string[];
    cta_enhancement_suggestions: string[];
    hashtag_improvement_suggestions: string[];
    discoverability_strategies: string[];
}

// ─── Step 6: Quality Score ────────────────────────────────────────────────────

export interface QualityScore {
    clarity: number;
    engagement: number;
    platform_optimization: number;
    originality: number;
    overall: number;
    explanation: string;
    improvement_actions: string[];
}

// ─── Step 7: Refinement ───────────────────────────────────────────────────────

export interface Refinement {
    original_version_summary?: string;
    refined_hook?: string;
    refined_content_linkedin?: string;
    refined_content_instagram?: string;
    refined_content_youtube_intro?: string;
    improvement_difference_explanation?: string;
}

// ─── Step 8: Content Breakdown ────────────────────────────────────────────────

export interface CarouselSlide {
    slide_number: number;
    headline: string;
    body: string;
}

export interface ContentBreakdown {
    reel_script: string;
    twitter_thread: string[];
    carousel_slides: CarouselSlide[];
}

// ─── Step 9: Bharat Growth Mode ───────────────────────────────────────────────

export interface WeeklyContentDay {
    day: string;
    content_type: string;
    topic_suggestion: string;
}

export interface BharatGrowthMode {
    low_budget_tips: string[];
    tier_2_creator_strategy: string[];
    weekly_content_plan: WeeklyContentDay[];
    cross_platform_roadmap: string[];
}

// ─── Full Response ────────────────────────────────────────────────────────────

export interface GeneratedContent {
    ideas: Idea[];
    selected_idea_outline: SelectedIdeaOutline;
    platform_content: PlatformContent[];
    performance_simulation: PerformanceSimulation[];
    engagement_optimization: EngagementOptimization;
    quality_score: QualityScore;
    refinement: Refinement;
    content_breakdown: ContentBreakdown;
    bharat_growth_mode: BharatGrowthMode;
}

// ─── Misc ─────────────────────────────────────────────────────────────────────

export type AudienceType =
    | 'students'
    | 'early_professionals'
    | 'first_gen_creators'
    | 'entrepreneurs'
    | 'job_seekers';

export type Platform = 'linkedin' | 'instagram' | 'youtube';
