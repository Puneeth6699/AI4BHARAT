import { useState } from 'react';
import { motion } from 'framer-motion';
import {
    Sparkles, Loader2, AlertCircle, Linkedin,
    Instagram, Youtube, Users, ChevronDown, Wand2
} from 'lucide-react';

interface Props {
    onSubmit: (data: {
        topic: string;
        audience_type: string;
        selected_platforms: string[];
        language_mode: 'English' | 'Hindi' | 'Hinglish';
        brand_tone: string;
        refinement_request: string;
    }) => void;
    loading: boolean;
    error: string | null;
}

const audiences = [
    { value: 'students', label: '🎓 Students' },
    { value: 'early_professionals', label: '💼 Early Professionals' },
    { value: 'first_gen_creators', label: '✨ First-Gen Creators' },
    { value: 'entrepreneurs', label: '🚀 Entrepreneurs' },
    { value: 'job_seekers', label: '🔍 Job Seekers' },
];

const platforms = [
    { value: 'linkedin', icon: Linkedin, label: 'LinkedIn', color: '#0077b5' },
    { value: 'instagram', icon: Instagram, label: 'Instagram', color: '#e1306c' },
    { value: 'youtube', icon: Youtube, label: 'YouTube', color: '#ff0000' },
];

const languageModes: { value: 'English' | 'Hindi' | 'Hinglish'; label: string; desc: string }[] = [
    { value: 'English', label: 'English', desc: 'Global reach' },
    { value: 'Hindi', label: 'हिंदी', desc: 'Bharat audience' },
    { value: 'Hinglish', label: 'Hinglish', desc: 'Most relatable' },
];

const brandTones = [
    { value: 'professional', label: '👔 Professional', color: '#6366f1' },
    { value: 'casual', label: '😎 Casual', color: '#8b5cf6' },
    { value: 'inspirational', label: '🌟 Inspirational', color: '#f59e0b' },
    { value: 'bold', label: '⚡ Bold', color: '#ef4444' },
    { value: 'storytelling', label: '📖 Storytelling', color: '#22d3ee' },
];

const sampleTopics = [
    'How to build a personal brand on LinkedIn',
    'AI tools every student should know in 2025',
    'My journey from Tier-2 city to top MNC',
    'How to crack your first internship with no connections',
    'Digital marketing skills for small business owners',
];

export default function InputStep({ onSubmit, loading, error }: Props) {
    const [topic, setTopic] = useState('');
    const [audienceType, setAudienceType] = useState('students');
    const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['linkedin', 'instagram']);
    const [languageMode, setLanguageMode] = useState<'English' | 'Hindi' | 'Hinglish'>('English');
    const [brandTone, setBrandTone] = useState('professional');
    const [refinementRequest, setRefinementRequest] = useState('');
    const [showRefinement, setShowRefinement] = useState(false);

    const togglePlatform = (p: string) => {
        setSelectedPlatforms((prev) =>
            prev.includes(p) ? prev.filter((x) => x !== p) : [...prev, p]
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!topic.trim() || selectedPlatforms.length === 0) return;
        onSubmit({
            topic: topic.trim(),
            audience_type: audienceType,
            selected_platforms: selectedPlatforms,
            language_mode: languageMode,
            brand_tone: brandTone,
            refinement_request: refinementRequest.trim(),
        });
    };

    return (
        <div style={{ maxWidth: 680, margin: '0 auto' }}>
            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                style={{ textAlign: 'center', marginBottom: 48 }}
            >
                <h1 style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', marginBottom: 10 }}>
                    What do you want to create?
                </h1>
                <p style={{ color: '#64748b', fontSize: 16 }}>
                    Configure your content strategy across 9 AI-powered steps.
                </p>
            </motion.div>

            <form onSubmit={handleSubmit}>
                {/* Topic Input */}
                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    style={{ padding: 28, marginBottom: 20 }}
                >
                    <label style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 13, fontWeight: 600, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14,
                    }}>
                        <Sparkles size={14} color="#6366f1" /> Content Topic
                    </label>
                    <textarea
                        className="input-base"
                        rows={3}
                        placeholder="e.g. How to build a personal brand without a huge following..."
                        value={topic}
                        onChange={(e) => setTopic(e.target.value)}
                        required
                        style={{ resize: 'none', fontFamily: 'Inter, sans-serif' }}
                    />

                    {/* Sample topics */}
                    <div style={{ marginTop: 14 }}>
                        <span style={{ fontSize: 12, color: '#475569', marginRight: 8 }}>Try:</span>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 8 }}>
                            {sampleTopics.map((t) => (
                                <button
                                    key={t}
                                    type="button"
                                    onClick={() => setTopic(t)}
                                    style={{
                                        background: 'rgba(255,255,255,0.04)',
                                        border: '1px solid rgba(255,255,255,0.08)',
                                        borderRadius: 8, padding: '5px 12px',
                                        fontSize: 12, color: '#64748b', cursor: 'pointer', transition: 'all 0.15s',
                                    }}
                                    onMouseEnter={e => {
                                        (e.target as HTMLButtonElement).style.color = '#a5b4fc';
                                        (e.target as HTMLButtonElement).style.borderColor = 'rgba(99,102,241,0.3)';
                                    }}
                                    onMouseLeave={e => {
                                        (e.target as HTMLButtonElement).style.color = '#64748b';
                                        (e.target as HTMLButtonElement).style.borderColor = 'rgba(255,255,255,0.08)';
                                    }}
                                >
                                    {t.length > 42 ? t.slice(0, 42) + '…' : t}
                                </button>
                            ))}
                        </div>
                    </div>
                </motion.div>

                {/* Audience */}
                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    style={{ padding: 28, marginBottom: 20 }}
                >
                    <label style={{
                        display: 'flex', alignItems: 'center', gap: 8,
                        fontSize: 13, fontWeight: 600, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 14,
                    }}>
                        <Users size={14} color="#8b5cf6" /> Target Audience
                    </label>
                    <div style={{ position: 'relative' }}>
                        <select
                            className="input-base"
                            value={audienceType}
                            onChange={(e) => setAudienceType(e.target.value)}
                            style={{ appearance: 'none', cursor: 'pointer' }}
                        >
                            {audiences.map((a) => (
                                <option key={a.value} value={a.value} style={{ background: '#0f172a' }}>
                                    {a.label}
                                </option>
                            ))}
                        </select>
                        <ChevronDown
                            size={16}
                            color="#475569"
                            style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                        />
                    </div>
                </motion.div>

                {/* Language Mode */}
                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    style={{ padding: 28, marginBottom: 20 }}
                >
                    <label style={{
                        fontSize: 13, fontWeight: 600, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        display: 'block', marginBottom: 16,
                    }}>
                        🌐 Language Mode
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {languageModes.map(({ value, label, desc }) => {
                            const isActive = languageMode === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setLanguageMode(value)}
                                    style={{
                                        padding: '14px 12px',
                                        borderRadius: 12,
                                        border: isActive ? '1.5px solid rgba(99,102,241,0.5)' : '1.5px solid rgba(255,255,255,0.08)',
                                        background: isActive ? 'rgba(99,102,241,0.1)' : 'rgba(255,255,255,0.03)',
                                        cursor: 'pointer', textAlign: 'center', transition: 'all 0.2s',
                                    }}
                                >
                                    <div style={{ fontSize: 15, fontWeight: 700, color: isActive ? '#a5b4fc' : '#64748b', marginBottom: 4 }}>
                                        {label}
                                    </div>
                                    <div style={{ fontSize: 11, color: isActive ? '#818cf8' : '#475569' }}>{desc}</div>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Brand Tone */}
                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.25 }}
                    style={{ padding: 28, marginBottom: 20 }}
                >
                    <label style={{
                        fontSize: 13, fontWeight: 600, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        display: 'block', marginBottom: 16,
                    }}>
                        🎨 Brand Tone
                    </label>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                        {brandTones.map(({ value, label, color }) => {
                            const isActive = brandTone === value;
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => setBrandTone(value)}
                                    style={{
                                        padding: '10px 18px',
                                        borderRadius: 999,
                                        border: isActive ? `1.5px solid ${color}60` : '1.5px solid rgba(255,255,255,0.08)',
                                        background: isActive ? `${color}18` : 'rgba(255,255,255,0.03)',
                                        cursor: 'pointer', fontSize: 13, fontWeight: 600,
                                        color: isActive ? '#f1f5f9' : '#64748b',
                                        transition: 'all 0.2s',
                                    }}
                                >
                                    {label}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Platforms */}
                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    style={{ padding: 28, marginBottom: 20 }}
                >
                    <label style={{
                        fontSize: 13, fontWeight: 600, color: '#94a3b8',
                        textTransform: 'uppercase', letterSpacing: '0.06em',
                        display: 'block', marginBottom: 16,
                    }}>
                        Platforms (select at least one)
                    </label>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12 }}>
                        {platforms.map(({ value, icon: Icon, label, color }) => {
                            const selected = selectedPlatforms.includes(value);
                            return (
                                <button
                                    key={value}
                                    type="button"
                                    onClick={() => togglePlatform(value)}
                                    style={{
                                        padding: '18px 12px', borderRadius: 14,
                                        border: selected ? `1.5px solid ${color}50` : '1.5px solid rgba(255,255,255,0.08)',
                                        background: selected ? `${color}12` : 'rgba(255,255,255,0.03)',
                                        cursor: 'pointer', display: 'flex', flexDirection: 'column',
                                        alignItems: 'center', gap: 10, transition: 'all 0.2s',
                                        transform: selected ? 'scale(1.03)' : 'scale(1)',
                                    }}
                                >
                                    <Icon size={24} color={selected ? color : '#475569'} />
                                    <span style={{ fontSize: 13, fontWeight: 600, color: selected ? '#f1f5f9' : '#475569' }}>
                                        {label}
                                    </span>
                                    {selected && (
                                        <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
                                    )}
                                </button>
                            );
                        })}
                    </div>
                </motion.div>

                {/* Refinement Request (Optional) */}
                <motion.div
                    className="glass"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.35 }}
                    style={{ padding: 28, marginBottom: 32 }}
                >
                    <button
                        type="button"
                        onClick={() => setShowRefinement(!showRefinement)}
                        style={{
                            width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                            background: 'none', border: 'none', cursor: 'pointer', padding: 0,
                        }}
                    >
                        <label style={{
                            display: 'flex', alignItems: 'center', gap: 8,
                            fontSize: 13, fontWeight: 600, color: '#94a3b8',
                            textTransform: 'uppercase', letterSpacing: '0.06em', cursor: 'pointer',
                        }}>
                            <Wand2 size={14} color="#ec4899" /> Refinement Request
                            <span style={{
                                fontSize: 10, padding: '2px 8px', borderRadius: 999,
                                background: 'rgba(236,72,153,0.1)', color: '#f472b6',
                                fontWeight: 700, textTransform: 'none', letterSpacing: 0,
                            }}>Optional</span>
                        </label>
                        <span style={{ fontSize: 11, color: '#475569' }}>{showRefinement ? '▲ Hide' : '▼ Show'}</span>
                    </button>

                    {showRefinement && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            style={{ marginTop: 16 }}
                        >
                            <p style={{ fontSize: 12, color: '#475569', marginBottom: 10 }}>
                                Tell the AI how to improve the generated content (e.g. "make more engaging", "add storytelling", "simplify for students").
                            </p>
                            <textarea
                                className="input-base"
                                rows={2}
                                placeholder='e.g. "Make more engaging with personal stories and emotional hooks"'
                                value={refinementRequest}
                                onChange={(e) => setRefinementRequest(e.target.value)}
                                style={{ resize: 'none', fontFamily: 'Inter, sans-serif' }}
                            />
                        </motion.div>
                    )}
                </motion.div>

                {/* Error */}
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -8 }}
                        animate={{ opacity: 1, y: 0 }}
                        style={{
                            display: 'flex', alignItems: 'center', gap: 10,
                            background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)',
                            borderRadius: 12, padding: '14px 18px', marginBottom: 20,
                        }}
                    >
                        <AlertCircle size={18} color="#f87171" />
                        <span style={{ color: '#fca5a5', fontSize: 14 }}>{error}</span>
                    </motion.div>
                )}

                {/* Submit */}
                <button
                    className="btn-primary"
                    type="submit"
                    disabled={loading || !topic.trim() || selectedPlatforms.length === 0}
                    style={{ width: '100%', justifyContent: 'center', padding: '16px', fontSize: 16 }}
                >
                    {loading ? (
                        <>
                            <Loader2 size={20} style={{ animation: 'spin 1s linear infinite' }} />
                            AI is generating your content…
                        </>
                    ) : (
                        <>
                            <Sparkles size={20} />
                            Generate 9-Step Content Package
                        </>
                    )}
                </button>

                {loading && (
                    <p style={{ textAlign: 'center', color: '#475569', fontSize: 13, marginTop: 12 }}>
                        Running 9-step AI pipeline — this may take 20–40 seconds ✨
                    </p>
                )}
            </form>

            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
    );
}
