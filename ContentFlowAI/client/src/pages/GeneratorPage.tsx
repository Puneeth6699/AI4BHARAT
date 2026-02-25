import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowLeft, Stars } from 'lucide-react';
import type { GeneratedContent } from '../types';
import { generateContent } from '../services/api';

import InputStep from '../components/InputStep';
import IdeaSelectionStep from '../components/IdeaSelectionStep';
import ContentWorkspace from '../components/ContentWorkspace';

interface Props {
    onBack: () => void;
}

type Step = 'input' | 'ideas' | 'workspace';

export default function GeneratorPage({ onBack }: Props) {
    const [step, setStep] = useState<Step>('input');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState<GeneratedContent | null>(null);
    const [formData, setFormData] = useState<{
        topic: string;
        audience_type: string;
        selected_platforms: string[];
    } | null>(null);

    const stepLabels: { key: Step; label: string }[] = [
        { key: 'input', label: 'Configure' },
        { key: 'ideas', label: 'Select Idea' },
        { key: 'workspace', label: 'Content' },
    ];

    const currentStepIndex = stepLabels.findIndex((s) => s.key === step);

    const handleGenerate = async (data: {
        topic: string;
        audience_type: string;
        selected_platforms: string[];
    }) => {
        setFormData(data);
        setLoading(true);
        setError(null);
        try {
            const res = await generateContent(data);
            setResult(res);
            setStep('ideas');
        } catch (err: unknown) {
            const msg =
                (err as { response?: { data?: { error?: string }; }; message?: string })
                    ?.response?.data?.error ||
                (err as { message?: string })?.message ||
                'Something went wrong. Please try again.';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh' }}>
            {/* Header */}
            <header style={{
                display: 'flex', alignItems: 'center', gap: 16,
                padding: '20px 48px',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                background: 'rgba(10,15,30,0.9)', backdropFilter: 'blur(20px)',
                position: 'sticky', top: 0, zIndex: 50,
            }}>
                <button
                    className="btn-ghost"
                    onClick={onBack}
                    style={{ display: 'flex', alignItems: 'center', gap: 6, padding: '8px 14px' }}
                >
                    <ArrowLeft size={16} /> Back
                </button>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginRight: 'auto' }}>
                    <div style={{
                        width: 32, height: 32, borderRadius: 9,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Stars size={16} color="white" />
                    </div>
                    <span style={{ fontWeight: 700, fontSize: 16, color: '#f1f5f9' }}>
                        ContentFlow <span style={{ color: '#6366f1' }}>AI</span>
                    </span>
                </div>

                {/* Step indicator */}
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    {stepLabels.map((s, i) => (
                        <div key={s.key} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                                <div
                                    className={`step-dot ${i < currentStepIndex ? 'done' : i === currentStepIndex ? 'active' : ''}`}
                                />
                                <span style={{
                                    fontSize: 12, fontWeight: 500,
                                    color: i === currentStepIndex ? '#a5b4fc' : i < currentStepIndex ? '#4ade80' : '#475569',
                                }}>
                                    {s.label}
                                </span>
                            </div>
                            {i < stepLabels.length - 1 && (
                                <div style={{
                                    width: 24, height: 1,
                                    background: i < currentStepIndex ? 'rgba(74,222,128,0.4)' : 'rgba(255,255,255,0.08)',
                                }} />
                            )}
                        </div>
                    ))}
                </div>
            </header>

            {/* Content */}
            <main style={{ padding: '48px 24px', maxWidth: 960, margin: '0 auto' }}>
                <AnimatePresence mode="wait">
                    {step === 'input' && (
                        <motion.div
                            key="input"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.35 }}
                        >
                            <InputStep
                                onSubmit={handleGenerate}
                                loading={loading}
                                error={error}
                            />
                        </motion.div>
                    )}

                    {step === 'ideas' && result && (
                        <motion.div
                            key="ideas"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.35 }}
                        >
                            <IdeaSelectionStep
                                ideas={result.ideas}
                                outline={result.selected_idea_outline}
                                onContinue={() => setStep('workspace')}
                                onBack={() => setStep('input')}
                            />
                        </motion.div>
                    )}

                    {step === 'workspace' && result && (
                        <motion.div
                            key="workspace"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            transition={{ duration: 0.35 }}
                        >
                            <ContentWorkspace
                                result={result}
                                topic={formData?.topic || ''}
                                onBack={() => setStep('ideas')}
                                onRestart={() => {
                                    setStep('input');
                                    setResult(null);
                                    setFormData(null);
                                }}
                            />
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>
        </div>
    );
}
