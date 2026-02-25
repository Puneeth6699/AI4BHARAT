import { useState } from 'react';
import { motion } from 'framer-motion';
import { CheckCircle2, ArrowRight, ArrowLeft, Lightbulb, BookOpen, Target } from 'lucide-react';
import type { Idea, SelectedIdeaOutline } from '../types';

interface Props {
    ideas: Idea[];
    outline: SelectedIdeaOutline;
    onContinue: () => void;
    onBack: () => void;
}

export default function IdeaSelectionStep({ ideas, outline, onContinue, onBack }: Props) {
    const [selectedId, setSelectedId] = useState<string>(ideas[0]?.id || '');

    return (
        <div style={{ maxWidth: 800, margin: '0 auto' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: 40 }}
            >
                <span className="badge badge-indigo" style={{ marginBottom: 12 }}>
                    <Lightbulb size={12} /> Step 1 Complete
                </span>
                <h2 style={{ fontSize: 32, fontWeight: 800, color: '#f1f5f9', marginBottom: 8 }}>
                    AI generated 3 content ideas
                </h2>
                <p style={{ color: '#64748b', fontSize: 15 }}>
                    Review the angles below. The AI has already selected the strongest one for your outline.
                </p>
            </motion.div>

            {/* Ideas */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 36 }}>
                {ideas.map((idea, i) => {
                    const isSelected = idea.id === selectedId;
                    return (
                        <motion.div
                            key={idea.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: i * 0.1 }}
                            onClick={() => setSelectedId(idea.id)}
                            style={{
                                padding: '24px 28px',
                                borderRadius: 16,
                                border: isSelected
                                    ? '1.5px solid rgba(99,102,241,0.5)'
                                    : '1.5px solid rgba(255,255,255,0.07)',
                                background: isSelected
                                    ? 'rgba(99,102,241,0.08)'
                                    : 'rgba(255,255,255,0.03)',
                                cursor: 'pointer',
                                transition: 'all 0.25s',
                                position: 'relative',
                            }}
                        >
                            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>
                                <div style={{ flex: 1 }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
                                        <span style={{
                                            width: 24, height: 24, borderRadius: 6,
                                            background: isSelected ? 'rgba(99,102,241,0.3)' : 'rgba(255,255,255,0.06)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontSize: 12, fontWeight: 700, color: isSelected ? '#818cf8' : '#475569',
                                        }}>
                                            {i + 1}
                                        </span>
                                        <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                                            {idea.title}
                                        </h3>
                                    </div>
                                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6, marginBottom: 10 }}>
                                        {idea.brief_description}
                                    </p>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                        <Target size={12} color="#6366f1" />
                                        <span style={{ fontSize: 12, color: '#6366f1', fontWeight: 500 }}>
                                            {idea.key_angle}
                                        </span>
                                    </div>
                                </div>
                                {isSelected && (
                                    <CheckCircle2 size={22} color="#6366f1" style={{ flexShrink: 0, marginTop: 2 }} />
                                )}
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Outline */}
            <motion.div
                className="glass-strong"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                style={{ padding: '28px 32px', marginBottom: 36 }}
            >
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                    <BookOpen size={18} color="#22d3ee" />
                    <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f1f5f9', margin: 0 }}>
                        AI-Selected Outline
                    </h3>
                    <span className="badge badge-cyan" style={{ marginLeft: 'auto', fontSize: 11 }}>
                        AI Pick
                    </span>
                </div>

                {/* Hook */}
                <div style={{ marginBottom: 18 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Hook
                    </span>
                    <p style={{
                        marginTop: 6, color: '#e2e8f0', fontSize: 15, lineHeight: 1.6,
                        padding: '10px 16px', borderLeft: '3px solid #6366f1',
                        background: 'rgba(99,102,241,0.06)', borderRadius: '0 8px 8px 0',
                    }}>
                        "{outline.hook}"
                    </p>
                </div>

                {/* Main Points */}
                <div style={{ marginBottom: 18 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Key Points
                    </span>
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 8 }}>
                        {outline.main_points.map((point, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: 10,
                                padding: '8px 0',
                                borderBottom: i < outline.main_points.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                            }}>
                                <span style={{
                                    minWidth: 22, height: 22, borderRadius: 6,
                                    background: 'rgba(99,102,241,0.15)',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: 11, fontWeight: 700, color: '#818cf8',
                                    marginTop: 1,
                                }}>
                                    {i + 1}
                                </span>
                                <span style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.5 }}>{point}</span>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Call to Action
                    </span>
                    <p style={{
                        marginTop: 6, color: '#4ade80', fontSize: 14,
                        background: 'rgba(74,222,128,0.06)', borderRadius: 8,
                        padding: '10px 14px', border: '1px solid rgba(74,222,128,0.15)',
                    }}>
                        {outline.call_to_action}
                    </p>
                </div>
            </motion.div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end' }}>
                <button className="btn-ghost" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <ArrowLeft size={16} /> Back
                </button>
                <button className="btn-primary" onClick={onContinue} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    View Platform Content <ArrowRight size={18} />
                </button>
            </div>
        </div>
    );
}
