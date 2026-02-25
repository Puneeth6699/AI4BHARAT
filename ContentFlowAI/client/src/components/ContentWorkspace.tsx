import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Linkedin, Instagram, FileText, Copy, Check,
    Clock, TrendingUp, Hash, ArrowLeft, RotateCcw,
    ChevronDown, ChevronUp, Star
} from 'lucide-react';
import type { GeneratedContent, PlatformContent } from '../types';
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
    blog: { icon: FileText, label: 'Blog', color: '#22d3ee' },
};

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

function PlatformTab({ pc }: { pc: PlatformContent }) {
    const [showEngagement, setShowEngagement] = useState(false);
    const meta = platformMeta[pc.platform];
    const Icon = meta.icon;

    return (
        <div>
            {/* Content Card */}
            <div className="glass" style={{ padding: '24px 28px', marginBottom: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 18 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <Icon size={18} color={meta.color} />
                        <span style={{ fontSize: 15, fontWeight: 700, color: '#f1f5f9' }}>{meta.label} Content</span>
                    </div>
                    <CopyButton text={pc.content + '\n\n' + pc.hashtags.join(' ')} />
                </div>

                <div className={pc.platform === 'blog' ? 'prose-dark' : ''} style={{
                    color: '#cbd5e1',
                    fontSize: 14,
                    lineHeight: 1.8,
                    whiteSpace: 'pre-wrap',
                    background: 'rgba(0,0,0,0.2)',
                    borderRadius: 12,
                    padding: '18px 20px',
                    maxHeight: 400,
                    overflowY: 'auto',
                }}>
                    {pc.content}
                </div>

                {/* Hashtags */}
                {pc.hashtags && pc.hashtags.length > 0 && (
                    <div style={{ marginTop: 16, display: 'flex', flexWrap: 'wrap', gap: 8 }}>
                        {pc.hashtags.map((tag) => (
                            <span key={tag} className="badge badge-indigo" style={{ fontSize: 12 }}>
                                <Hash size={10} />
                                {tag.startsWith('#') ? tag.slice(1) : tag}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Quality Score */}
            <QualityScorePanel score={pc.quality_score} platform={pc.platform} color={meta.color} />

            {/* Engagement Panel Toggle */}
            <motion.div className="glass" style={{ marginTop: 16, overflow: 'hidden' }}>
                <button
                    onClick={() => setShowEngagement(!showEngagement)}
                    style={{
                        width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                        padding: '18px 24px', background: 'none', border: 'none',
                        cursor: 'pointer', color: '#f1f5f9',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                        <TrendingUp size={16} color="#22d3ee" />
                        <span style={{ fontWeight: 600, fontSize: 14 }}>Engagement Optimization</span>
                    </div>
                    {showEngagement ? <ChevronUp size={16} color="#94a3b8" /> : <ChevronDown size={16} color="#94a3b8" />}
                </button>

                <AnimatePresence>
                    {showEngagement && (
                        <motion.div
                            initial={{ height: 0 }}
                            animate={{ height: 'auto' }}
                            exit={{ height: 0 }}
                            transition={{ duration: 0.25 }}
                            style={{ overflow: 'hidden' }}
                        >
                            <div style={{ padding: '0 24px 24px' }}>
                                <div className="divider" style={{ marginBottom: 20 }} />

                                {/* Posting Time */}
                                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 18 }}>
                                    <div style={{
                                        width: 36, height: 36, borderRadius: 10,
                                        background: 'rgba(34,211,238,0.1)',
                                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    }}>
                                        <Clock size={16} color="#22d3ee" />
                                    </div>
                                    <div>
                                        <span style={{ fontSize: 11, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                            Best posting time (IST)
                                        </span>
                                        <p style={{ margin: 0, fontSize: 15, fontWeight: 600, color: '#22d3ee' }}>
                                            {pc.optimal_posting_time_india}
                                        </p>
                                    </div>
                                </div>

                                {/* Engagement Suggestions */}
                                <div style={{ marginBottom: 16 }}>
                                    <span style={{ fontSize: 12, fontWeight: 600, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        Engagement Tips
                                    </span>
                                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                                        {pc.engagement_suggestions.map((tip, i) => (
                                            <div key={i} style={{
                                                display: 'flex', alignItems: 'flex-start', gap: 10,
                                                padding: '10px 14px',
                                                background: 'rgba(99,102,241,0.06)',
                                                borderRadius: 10, border: '1px solid rgba(99,102,241,0.12)',
                                            }}>
                                                <Star size={13} color="#818cf8" style={{ marginTop: 1, flexShrink: 0 }} />
                                                <span style={{ fontSize: 13, color: '#94a3b8', lineHeight: 1.5 }}>{tip}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>
        </div>
    );
}

export default function ContentWorkspace({ result, topic, onBack, onRestart }: Props) {
    const platforms = result.platform_content;
    const [activeTab, setActiveTab] = useState(platforms[0]?.platform || '');

    const activeContent = platforms.find((p) => p.platform === activeTab);

    return (
        <div style={{ maxWidth: 860, margin: '0 auto' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ marginBottom: 32 }}
            >
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
                display: 'flex', gap: 8, marginBottom: 28,
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
                                border: isActive ? `1px solid rgba(255,255,255,0.12)` : '1px solid transparent',
                                cursor: 'pointer', fontWeight: 600, fontSize: 14,
                                color: isActive ? '#f1f5f9' : '#475569',
                                transition: 'all 0.2s',
                            }}
                        >
                            <Icon size={16} color={isActive ? meta.color : '#475569'} />
                            {meta.label}
                            <span style={{
                                fontSize: 11, padding: '2px 8px', borderRadius: 999,
                                background: isActive ? `${meta.color}20` : 'transparent',
                                color: isActive ? meta.color : '#475569',
                                fontWeight: 700,
                            }}>
                                {pc.quality_score.overall}
                            </span>
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
                        <PlatformTab pc={activeContent} />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
