import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Linkedin, Instagram, FileText, Copy, Check,
    Clock, TrendingUp, Hash, ArrowLeft, RotateCcw,
    ChevronDown, ChevronUp, Star, Activity, Zap,
    BookOpen, Twitter, Play, Layout, MapPin, Lightbulb,
    Target, BarChart2, Wand2, Youtube
} from 'lucide-react';
import type { GeneratedContent, PlatformContent, PerformanceSimulation } from '../types';
import QualityScorePanel from './QualityScorePanel';

interface Props {
    result: GeneratedContent;
    topic: string;
    onBack: () => void;
    onRestart: () => void;
}

const platformMeta: Record<string, { icon: React.ElementType; color: string; label: string }> = {
    linkedin: { icon: Linkedin, label: 'LinkedIn', color: '#0077b5' },
    instagram: { icon: Instagram, label: 'Instagram', color: '#e1306c' },
    youtube: { icon: Youtube, label: 'YouTube', color: '#ff0000' },
};

// ─── CopyButton ───────────────────────────────────────────────────────────────

function CopyButton({ text }: { text: string }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = async () => {
        await navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (
        <button
            onClick={handleCopy}
            className="btn-ghost"
            style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px', fontSize: 13 }}
        >
            {copied ? <Check size={14} color="#4ade80" /> : <Copy size={14} />}
            {copied ? 'Copied!' : 'Copy'}
        </button>
    );
}

// ─── Collapsible Section ──────────────────────────────────────────────────────

function CollapsibleSection({
    icon: Icon, iconColor, title, badge, defaultOpen = false, children
}: {
    icon: React.ElementType; iconColor: string; title: string; badge?: string;
    defaultOpen?: boolean; children: React.ReactNode;
}) {
    const [open, setOpen] = useState(defaultOpen);
    return (
        <motion.div className="glass" style={{ marginBottom: 16, overflow: 'hidden' }}>
            <button
                onClick={() => setOpen(!open)}
                style={{
                    width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                    padding: '18px 24px', background: 'none', border: 'none', cursor: 'pointer', color: '#f1f5f9',
                }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <Icon size={16} color={iconColor} />
                    <span style={{ fontWeight: 700, fontSize: 14 }}>{title}</span>
                    {badge && (
                        <span style={{
                            fontSize: 10, padding: '2px 8px', borderRadius: 999,
                            background: `${iconColor}20`, color: iconColor, fontWeight: 700,
                        }}>{badge}</span>
                    )}
                </div>
                {open ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
            </button>
            <AnimatePresence>
                {open && (
                    <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: 'auto' }}
                        exit={{ height: 0 }}
                        transition={{ duration: 0.25 }}
                        style={{ overflow: 'hidden' }}
                    >
                        <div style={{ padding: '0 24px 24px' }}>
                            <div className="divider" style={{ marginBottom: 20 }} />
                            {children}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
}

// ─── Item List ────────────────────────────────────────────────────────────────

function ItemList({ items, color = '#818cf8', icon }: { items: string[]; color?: string; icon?: string }) {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {items.map((item, i) => (
                <div key={i} style={{
                    display: 'flex', alignItems: 'flex-start', gap: 10,
                    padding: '10px 14px',
                    background: `${color}0d`, borderRadius: 10, border: `1px solid ${color}20`,
                }}>
                    <span style={{ color, fontSize: 13, flexShrink: 0, marginTop: 1 }}>{icon || <Star size={13} color={color} />}</span>
                    <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{item}</span>
                </div>
            ))}
        </div>
    );
}

// ─── Platform Tab ─────────────────────────────────────────────────────────────

function PlatformTab({ pc, sim }: { pc: PlatformContent; sim?: PerformanceSimulation }) {
    const meta = platformMeta[pc.platform];
    const Icon = meta.icon;

    const probColor = (v: string) => v === 'High' ? '#4ade80' : v === 'Medium' ? '#fbbf24' : '#f87171';

    return (
        <div>
            {/* Content Card */}
            <div className="glass" style={{ padding: '24px 28px', marginBottom: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Icon size={18} color={meta.color} />
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{meta.label} Content</span>
                    </div>
                    <CopyButton text={pc.content + (pc.hashtags.length ? '\n\n' + pc.hashtags.map(h => `#${h}`).join(' ') : '')} />
                </div>

                <div style={{
                    color: '#cbd5e1', fontSize: 14, lineHeight: 1.8, whiteSpace: 'pre-wrap',
                    background: 'rgba(0,0,0,0.2)', borderRadius: 12, padding: '18px 20px',
                    maxHeight: 420, overflowY: 'auto',
                }}>
                    {pc.content}
                </div>

                {/* Hashtags */}
                {pc.hashtags && pc.hashtags.length > 0 && (
                    <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {pc.hashtags.map((tag) => (
                            <span key={tag} className="badge badge-indigo" style={{ fontSize: 12 }}>
                                <Hash size={10} />{tag.startsWith('#') ? tag.slice(1) : tag}
                            </span>
                        ))}
                    </div>
                )}

                {/* YouTube Meta/Chapters for YouTube */}
                {pc.platform === 'youtube' && pc.meta_description && (
                    <div style={{
                        marginTop: 14, padding: '10px 14px',
                        background: 'rgba(255,0,0,0.06)', borderRadius: 8,
                        border: '1px solid rgba(255,0,0,0.15)',
                    }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#ff0000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                            YouTube Meta & Chapters
                        </span>
                        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>
                            {pc.meta_description}
                        </p>
                    </div>
                )}
            </div>

            {/* Performance Simulation */}
            {sim && (
                <CollapsibleSection icon={Activity} iconColor="#a855f7" title="Performance Simulation" badge="AI Estimated" defaultOpen>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 12 }}>
                        {/* Reach Score */}
                        <div style={{ padding: '14px 16px', background: 'rgba(168,85,247,0.06)', borderRadius: 10, border: '1px solid rgba(168,85,247,0.15)' }}>
                            <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Reach Score</span>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                                <span style={{ fontSize: 24, fontWeight: 800, color: '#c084fc' }}>{sim.predicted_reach_score}</span>
                                <span style={{ fontSize: 11, color: '#64748b' }}>/100</span>
                            </div>
                        </div>
                        {/* CTA Effectiveness */}
                        <div style={{ padding: '14px 16px', background: 'rgba(99,102,241,0.06)', borderRadius: 10, border: '1px solid rgba(99,102,241,0.15)' }}>
                            <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>CTA Effectiveness</span>
                            <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, marginTop: 4 }}>
                                <span style={{ fontSize: 24, fontWeight: 800, color: '#818cf8' }}>{sim.CTA_effectiveness_rating}</span>
                                <span style={{ fontSize: 11, color: '#64748b' }}>/100</span>
                            </div>
                        </div>
                        {/* Engagement Probability */}
                        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.15)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
                            <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Engagement</span>
                            <div style={{ marginTop: 6 }}>
                                <span style={{
                                    fontSize: 13, fontWeight: 700, padding: '3px 12px', borderRadius: 999,
                                    background: `${probColor(sim.predicted_engagement_probability)}20`,
                                    color: probColor(sim.predicted_engagement_probability),
                                }}>{sim.predicted_engagement_probability}</span>
                            </div>
                        </div>
                        {/* Viral Potential */}
                        <div style={{ padding: '14px 16px', background: 'rgba(0,0,0,0.15)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.07)' }}>
                            <span style={{ fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Viral Potential</span>
                            <div style={{ marginTop: 6 }}>
                                <span style={{
                                    fontSize: 13, fontWeight: 700, padding: '3px 12px', borderRadius: 999,
                                    background: `${probColor(sim.viral_potential)}20`,
                                    color: probColor(sim.viral_potential),
                                }}>{sim.viral_potential}</span>
                            </div>
                        </div>
                    </div>

                    {/* Best Posting Time */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 14, padding: '12px 16px', background: 'rgba(34,211,238,0.06)', borderRadius: 10, border: '1px solid rgba(34,211,238,0.15)' }}>
                        <Clock size={16} color="#22d3ee" />
                        <div>
                            <span style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Best Posting Time (IST)</span>
                            <p style={{ margin: '2px 0 0', fontSize: 15, fontWeight: 700, color: '#22d3ee' }}>{sim.best_posting_time_india}</p>
                        </div>
                    </div>

                    {/* Growth Recommendation */}
                    {sim.growth_recommendation && (
                        <div style={{ marginTop: 12, padding: '12px 16px', background: 'rgba(74,222,128,0.05)', borderRadius: 10, border: '1px solid rgba(74,222,128,0.12)' }}>
                            <div style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}>
                                <TrendingUp size={14} color="#4ade80" style={{ marginTop: 2, flexShrink: 0 }} />
                                <span style={{ fontSize: 13, color: '#86efac', lineHeight: 1.5 }}>{sim.growth_recommendation}</span>
                            </div>
                        </div>
                    )}
                </CollapsibleSection>
            )}
        </div>
    );
}

// ─── Engagement Optimization Panel ───────────────────────────────────────────

function EngagementOptimizationSection({ data }: { data: GeneratedContent['engagement_optimization'] }) {
    if (!data || !Object.keys(data).length) return null;
    return (
        <CollapsibleSection icon={Zap} iconColor="#f59e0b" title="Engagement Optimization" badge="Step 5">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                {data.hook_improvement_suggestions?.length > 0 && (
                    <div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>⚡ Hook Improvements</span>
                        <div style={{ marginTop: 10 }}><ItemList items={data.hook_improvement_suggestions} color="#f59e0b" /></div>
                    </div>
                )}
                {data.cta_enhancement_suggestions?.length > 0 && (
                    <div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🎯 CTA Enhancements</span>
                        <div style={{ marginTop: 10 }}><ItemList items={data.cta_enhancement_suggestions} color="#4ade80" /></div>
                    </div>
                )}
                {data.hashtag_improvement_suggestions?.length > 0 && (
                    <div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}># Hashtag Strategy</span>
                        <div style={{ marginTop: 10 }}><ItemList items={data.hashtag_improvement_suggestions} color="#818cf8" /></div>
                    </div>
                )}
                {data.discoverability_strategies?.length > 0 && (
                    <div>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#22d3ee', textTransform: 'uppercase', letterSpacing: '0.06em' }}>🔍 Discoverability</span>
                        <div style={{ marginTop: 10 }}><ItemList items={data.discoverability_strategies} color="#22d3ee" /></div>
                    </div>
                )}
            </div>
        </CollapsibleSection>
    );
}

// ─── Refinement Panel ─────────────────────────────────────────────────────────

function RefinementSection({ data }: { data: GeneratedContent['refinement'] }) {
    if (!data || !data.refined_hook) return null;
    return (
        <CollapsibleSection icon={Wand2} iconColor="#ec4899" title="Refinement Engine" badge="Step 7" defaultOpen>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {data.original_version_summary && (
                    <div style={{ padding: '12px 16px', background: 'rgba(255,255,255,0.03)', borderRadius: 10, border: '1px solid rgba(255,255,255,0.08)' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Original Approach</span>
                        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#64748b', lineHeight: 1.5 }}>{data.original_version_summary}</p>
                    </div>
                )}
                {data.refined_hook && (
                    <div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.05em' }}>✨ Refined Hook</span>
                        <p style={{ marginTop: 8, color: '#f1f5f9', fontSize: 15, lineHeight: 1.6, padding: '10px 16px', borderLeft: '3px solid #ec4899', background: 'rgba(236,72,153,0.06)', borderRadius: '0 8px 8px 0' }}>
                            "{data.refined_hook}"
                        </p>
                    </div>
                )}
                {data.refined_content_linkedin && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#0077b5', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Refined LinkedIn</span>
                            <CopyButton text={data.refined_content_linkedin} />
                        </div>
                        <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'rgba(0,119,181,0.06)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(0,119,181,0.15)' }}>
                            {data.refined_content_linkedin}
                        </div>
                    </div>
                )}
                {data.refined_content_instagram && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <span style={{ fontSize: 11, fontWeight: 600, color: '#e1306c', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Refined Instagram</span>
                            <CopyButton text={data.refined_content_instagram} />
                        </div>
                        <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'rgba(225,48,108,0.06)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(225,48,108,0.15)' }}>
                            {data.refined_content_instagram}
                        </div>
                    </div>
                )}
                {data.refined_content_youtube_intro && (
                    <div>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#ff0000', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Refined YouTube Intro</span>
                        <div style={{ marginTop: 8, fontSize: 13, color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'rgba(255,0,0,0.06)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(255,0,0,0.15)' }}>
                            {data.refined_content_youtube_intro}
                        </div>
                    </div>
                )}
                {data.improvement_difference_explanation && (
                    <div style={{ padding: '12px 16px', background: 'rgba(236,72,153,0.06)', borderRadius: 10, border: '1px solid rgba(236,72,153,0.15)' }}>
                        <span style={{ fontSize: 11, fontWeight: 600, color: '#f472b6', textTransform: 'uppercase', letterSpacing: '0.05em' }}>What Changed & Why</span>
                        <p style={{ margin: '6px 0 0', fontSize: 13, color: '#94a3b8', lineHeight: 1.6 }}>{data.improvement_difference_explanation}</p>
                    </div>
                )}
            </div>
        </CollapsibleSection>
    );
}

// ─── Content Breakdown Panel ──────────────────────────────────────────────────

function ContentBreakdownSection({ data }: { data: GeneratedContent['content_breakdown'] }) {
    if (!data) return null;
    return (
        <CollapsibleSection icon={Layout} iconColor="#22d3ee" title="Content Breakdown" badge="Step 8">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {/* Reel Script */}
                {data.reel_script && (
                    <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 10 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                <Play size={14} color="#ec4899" />
                                <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>30-Second Reel Script</span>
                            </div>
                            <CopyButton text={data.reel_script} />
                        </div>
                        <div style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.7, whiteSpace: 'pre-wrap', background: 'rgba(236,72,153,0.05)', borderRadius: 10, padding: '14px 16px', border: '1px solid rgba(236,72,153,0.12)' }}>
                            {data.reel_script}
                        </div>
                    </div>
                )}

                {/* Twitter Thread */}
                {data.twitter_thread && data.twitter_thread.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <Twitter size={14} color="#1d9bf0" />
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>Twitter/X Thread (5 tweets)</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {data.twitter_thread.map((tweet, i) => (
                                <div key={i} style={{ display: 'flex', gap: 10, padding: '10px 14px', background: 'rgba(29,155,240,0.05)', borderRadius: 10, border: '1px solid rgba(29,155,240,0.12)' }}>
                                    <span style={{ fontSize: 12, fontWeight: 700, color: '#1d9bf0', flexShrink: 0, marginTop: 2 }}>{i + 1}</span>
                                    <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{tweet}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Carousel Slides */}
                {data.carousel_slides && data.carousel_slides.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                            <BookOpen size={14} color="#8b5cf6" />
                            <span style={{ fontSize: 13, fontWeight: 700, color: '#f1f5f9' }}>Instagram Carousel (5 slides)</span>
                        </div>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: 10 }}>
                            {data.carousel_slides.map((slide) => (
                                <div key={slide.slide_number} style={{ padding: '16px', background: 'rgba(139,92,246,0.06)', borderRadius: 12, border: '1px solid rgba(139,92,246,0.15)' }}>
                                    <div style={{ fontSize: 11, fontWeight: 700, color: '#8b5cf6', marginBottom: 8 }}>
                                        SLIDE {slide.slide_number}
                                    </div>
                                    <p style={{ fontSize: 14, fontWeight: 700, color: '#f1f5f9', marginBottom: 8, lineHeight: 1.4 }}>{slide.headline}</p>
                                    <p style={{ fontSize: 12, color: '#64748b', lineHeight: 1.5, margin: 0 }}>{slide.body}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </CollapsibleSection>
    );
}

// ─── Bharat Growth Panel ──────────────────────────────────────────────────────

function BharatGrowthSection({ data }: { data: GeneratedContent['bharat_growth_mode'] }) {
    if (!data) return null;
    return (
        <CollapsibleSection icon={MapPin} iconColor="#f59e0b" title="Bharat Growth Mode 🇮🇳" badge="Step 9">
            <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {data.low_budget_tips?.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                            <Lightbulb size={13} color="#f59e0b" />
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Low-Budget Growth Tips</span>
                        </div>
                        <ItemList items={data.low_budget_tips} color="#f59e0b" />
                    </div>
                )}
                {data.tier_2_creator_strategy?.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                            <Target size={13} color="#ec4899" />
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#ec4899', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tier-2 Creator Strategy</span>
                        </div>
                        <ItemList items={data.tier_2_creator_strategy} color="#ec4899" />
                    </div>
                )}
                {data.weekly_content_plan?.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 12 }}>
                            <BarChart2 size={13} color="#4ade80" />
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', textTransform: 'uppercase', letterSpacing: '0.06em' }}>5-Day Content Plan</span>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {data.weekly_content_plan.map((day, i) => (
                                <div key={i} style={{ display: 'flex', gap: 14, padding: '12px 16px', background: 'rgba(74,222,128,0.05)', borderRadius: 10, border: '1px solid rgba(74,222,128,0.12)' }}>
                                    <div style={{ minWidth: 80 }}>
                                        <span style={{ fontSize: 12, fontWeight: 700, color: '#4ade80' }}>{day.day}</span>
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 11, color: '#475569' }}>{day.content_type}</span>
                                        <p style={{ margin: '4px 0 0', fontSize: 13, color: '#94a3b8', lineHeight: 1.4 }}>{day.topic_suggestion}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                {data.cross_platform_roadmap?.length > 0 && (
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 10 }}>
                            <Activity size={13} color="#818cf8" />
                            <span style={{ fontSize: 12, fontWeight: 700, color: '#818cf8', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Cross-Platform Roadmap</span>
                        </div>
                        <ItemList items={data.cross_platform_roadmap} color="#818cf8" />
                    </div>
                )}
            </div>
        </CollapsibleSection>
    );
}

// ─── Main ContentWorkspace ────────────────────────────────────────────────────

export default function ContentWorkspace({ result, topic, onBack, onRestart }: Props) {
    const platforms = result.platform_content;
    const [activeTab, setActiveTab] = useState(platforms[0]?.platform || '');
    const activeContent = platforms.find((p) => p.platform === activeTab);
    const activeSim = result.performance_simulation?.find((s) => s.platform === activeTab);

    return (
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
            {/* Header */}
            <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} style={{ marginBottom: 32 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
                    <div>
                        <h2 style={{ fontSize: 28, fontWeight: 800, color: '#f1f5f9', marginBottom: 6 }}>
                            Your Content Package
                        </h2>
                        <p style={{ color: '#64748b', fontSize: 14 }}>
                            Topic: <span style={{ color: '#a5b4fc' }}>"{topic}"</span>
                        </p>
                    </div>
                    <div style={{ display: 'flex', gap: 10 }}>
                        <button className="btn-ghost" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                            <ArrowLeft size={14} /> Back
                        </button>
                        <button className="btn-ghost" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13 }}>
                            <RotateCcw size={14} /> New Topic
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Platform Tabs */}
            <div style={{
                display: 'flex', gap: 8, marginBottom: 20,
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.07)',
                borderRadius: 14, padding: 6,
            }}>
                {platforms.map((pc) => {
                    const meta = platformMeta[pc.platform];
                    const Icon = meta.icon;
                    const isActive = activeTab === pc.platform;
                    return (
                        <button
                            key={pc.platform}
                            onClick={() => setActiveTab(pc.platform)}
                            style={{
                                flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center',
                                gap: 8, padding: '12px 16px', borderRadius: 10,
                                background: isActive ? 'rgba(255,255,255,0.07)' : 'none',
                                border: isActive ? '1px solid rgba(255,255,255,0.12)' : '1px solid transparent',
                                cursor: 'pointer', fontWeight: 600, fontSize: 14,
                                color: isActive ? '#f1f5f9' : '#475569', transition: 'all 0.2s',
                            }}
                        >
                            <Icon size={16} color={isActive ? meta.color : '#475569'} />
                            {meta.label}
                        </button>
                    );
                })}
            </div>

            {/* Active Tab Content */}
            <AnimatePresence mode="wait">
                {activeContent && (
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25 }}
                    >
                        <PlatformTab pc={activeContent} sim={activeSim} />
                    </motion.div>
                )}
            </AnimatePresence>

            {/* ───── Global Sections ───── */}
            <div style={{ marginTop: 12 }}>
                {/* Quality Score (Global) */}
                {result.quality_score && result.quality_score.overall != null && (
                    <div style={{ marginBottom: 16 }}>
                        <QualityScorePanel
                            score={result.quality_score}
                            platform=""
                            color="#6366f1"
                        />
                    </div>
                )}

                {/* Engagement Optimization */}
                <EngagementOptimizationSection data={result.engagement_optimization} />

                {/* Refinement */}
                <RefinementSection data={result.refinement} />

                {/* Content Breakdown */}
                <ContentBreakdownSection data={result.content_breakdown} />

                {/* Bharat Growth Mode */}
                <BharatGrowthSection data={result.bharat_growth_mode} />
            </div>
        </div>
    );
}
