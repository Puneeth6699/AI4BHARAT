export interface Idea {
    id: string;
    title: string;
    brief_description: string;
    key_angle: string;
}

export interface SelectedIdeaOutline {
    hook: string;
    main_points: string[];
    call_to_action: string;
}

export interface QualityScore {
    clarity: number;
    engagement: number;
    platform_optimization: number;
    originality: number;
    overall: number;
    explanation: string;
    improvements: string[];
}

export interface PlatformContent {
    platform: 'linkedin' | 'instagram' | 'blog';
    content: string;
    hashtags: string[];
    optimal_posting_time_india: string;
    engagement_suggestions: string[];
    quality_score: QualityScore;
}

export interface GeneratedContent {
    ideas: Idea[];
    selected_idea_outline: SelectedIdeaOutline;
    platform_content: PlatformContent[];
}

export interface GenerateRequest {
    topic: string;
    audience_type: string;
    selected_platforms: string[];
}

export type AudienceType =
    | 'students'
    | 'early_professionals'
    | 'first_gen_creators'
    | 'entrepreneurs'
    | 'job_seekers';

export type Platform = 'linkedin' | 'instagram' | 'blog';
