import { motion } from 'framer-motion';
import {
    Sparkles, Zap, Target, BarChart3, ArrowRight,
    Linkedin, Instagram, Youtube, Stars
} from 'lucide-react';

interface Props {
    onGetStarted: () => void;
}

const features = [
    {
        icon: Sparkles,
        title: 'AI Idea Generation',
        desc: 'Get 3 unique, audience-tailored content angles powered by Gemini AI.',
        color: '#6366f1',
    },
    {
        icon: Target,
        title: 'Platform Optimization',
        desc: 'Content crafted specifically for LinkedIn, Instagram, and YouTube formats.',
        color: '#8b5cf6',
    },
    {
        icon: BarChart3,
        title: 'Quality Scoring',
        desc: 'Weighted scores on clarity, engagement, originality & platform fit.',
        color: '#22d3ee',
    },
    {
        icon: Zap,
        title: 'Engagement Insights',
        desc: 'Optimal posting times, hashtag strategy, and CTA enhancements.',
        color: '#ec4899',
    },
];

const platforms = [
    { icon: Linkedin, label: 'LinkedIn', color: '#0077b5' },
    { icon: Instagram, label: 'Instagram', color: '#e1306c' },
    { icon: Youtube, label: 'YouTube', color: '#ff0000' },
];

const audiences = [
    '🎓 Students', '💼 Early Professionals', '✨ First-Gen Creators',
    '🚀 Entrepreneurs', '🔍 Job Seekers'
];

export default function LandingPage({ onGetStarted }: Props) {
    return (
        <div style={{ minHeight: '100vh', overflowX: 'hidden' }}>
            {/* Navbar */}
            <nav style={{
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                padding: '20px 48px', borderBottom: '1px solid rgba(255,255,255,0.05)',
                position: 'sticky', top: 0, zIndex: 50,
                background: 'rgba(10,15,30,0.8)', backdropFilter: 'blur(20px)',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{
                        width: 36, height: 36, borderRadius: 10,
                        background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                    }}>
                        <Stars size={18} color="white" />
                    </div>
                    <span style={{ fontSize: 18, fontWeight: 800, color: '#f1f5f9' }}>
                        ContentFlow <span style={{ color: '#6366f1' }}>AI</span>
                    </span>
                </div>

            </nav>

            {/* Hero */}
            <section style={{
                position: 'relative', padding: '100px 48px 80px',
                textAlign: 'center', overflow: 'hidden',
            }}>
                {/* Background glow blobs */}
                <div style={{
                    position: 'absolute', top: '10%', left: '20%',
                    width: 500, height: 500, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />
                <div style={{
                    position: 'absolute', top: '20%', right: '15%',
                    width: 400, height: 400, borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(139,92,246,0.12) 0%, transparent 70%)',
                    pointerEvents: 'none',
                }} />

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <div style={{ marginBottom: 24 }}>
                        <span className="badge badge-indigo" style={{ fontSize: 13 }}>
                            <Sparkles size={12} /> Powered by Google Gemini AI
                        </span>
                    </div>

                    <h1 style={{
                        fontSize: 'clamp(36px, 6vw, 72px)',
                        fontWeight: 900,
                        lineHeight: 1.1,
                        color: '#f1f5f9',
                        marginBottom: 24,
                        letterSpacing: '-0.03em',
                    }}>
                        Turn any topic into{' '}
                        <span className="gradient-text">
                            platform-ready content
                        </span>
                        <br />in seconds.
                    </h1>

                    <p style={{
                        fontSize: 'clamp(16px, 2vw, 20px)',
                        color: '#94a3b8',
                        maxWidth: 600,
                        margin: '0 auto 40px',
                        lineHeight: 1.7,
                    }}>
                        ContentFlow AI is your end-to-end content lifecycle assistant — built for students,
                        early professionals, and first-generation creators from Tier-2 and Tier-3 India.
                    </p>

                    <div style={{ display: 'flex', gap: 16, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <button className="btn-primary" onClick={onGetStarted} style={{ fontSize: 16, padding: '14px 32px' }}>
                            Start Creating <ArrowRight size={18} />
                        </button>
                    </div>

                    {/* Platform pills */}
                    <div style={{
                        display: 'flex', gap: 12, justifyContent: 'center',
                        marginTop: 40, flexWrap: 'wrap',
                    }}>
                        {platforms.map(({ icon: Icon, label, color }) => (
                            <div key={label} className="glass" style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                padding: '8px 18px', borderRadius: 999,
                            }}>
                                <Icon size={16} color={color} />
                                <span style={{ fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>{label}</span>
                            </div>
                        ))}
                    </div>
                </motion.div>
            </section>

            {/* Audience Band */}
            <section style={{ padding: '20px 48px', marginBottom: 20, overflow: 'hidden' }}>
                <div style={{
                    display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap',
                }}>
                    <span style={{ color: '#475569', fontSize: 14, display: 'flex', alignItems: 'center' }}>
                        Built for:
                    </span>
                    {audiences.map((a) => (
                        <span key={a} className="badge badge-purple" style={{ fontSize: 13 }}>{a}</span>
                    ))}
                </div>
            </section>

            {/* Features Grid */}
            <section style={{ padding: '60px 48px 80px', maxWidth: 1100, margin: '0 auto' }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    style={{ textAlign: 'center', marginBottom: 56 }}
                >
                    <h2 style={{ fontSize: 40, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>
                        Everything you need to <span className="gradient-text">create better content</span>
                    </h2>
                    <p style={{ color: '#64748b', fontSize: 17, maxWidth: 500, margin: '0 auto' }}>
                        A complete AI-powered pipeline from idea to publication-ready content.
                    </p>
                </motion.div>

                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
                    gap: 24,
                }}>
                    {features.map((f, i) => {
                        const Icon = f.icon;
                        return (
                            <motion.div
                                key={f.title}
                                className="glass"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: i * 0.1 }}
                                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                                style={{ padding: '32px 28px', cursor: 'default' }}
                            >
                                <div style={{
                                    width: 52, height: 52, borderRadius: 14,
                                    background: `${f.color}20`,
                                    border: `1px solid ${f.color}30`,
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    marginBottom: 20,
                                }}>
                                    <Icon size={24} color={f.color} />
                                </div>
                                <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f1f5f9', marginBottom: 10 }}>
                                    {f.title}
                                </h3>
                                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>
                                    {f.desc}
                                </p>
                            </motion.div>
                        );
                    })}
                </div>
            </section>

            {/* CTA Banner */}
            <section style={{ padding: '0 48px 80px' }}>
                <motion.div
                    initial={{ opacity: 0, scale: 0.97 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    style={{
                        maxWidth: 780,
                        margin: '0 auto',
                        background: 'linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.15))',
                        border: '1px solid rgba(99,102,241,0.25)',
                        borderRadius: 24,
                        padding: '56px 48px',
                        textAlign: 'center',
                    }}
                >
                    <h2 style={{ fontSize: 36, fontWeight: 800, color: '#f1f5f9', marginBottom: 12 }}>
                        Ready to grow your voice?
                    </h2>
                    <p style={{ color: '#94a3b8', fontSize: 16, marginBottom: 32 }}>
                        Join thousands of creators from Tier-2 &amp; Tier-3 India building their digital presence.
                    </p>
                    <button className="btn-primary" onClick={onGetStarted} style={{ fontSize: 16, padding: '14px 36px' }}>
                        Start for Free <ArrowRight size={18} />
                    </button>
                </motion.div>
            </section>

            {/* Footer */}
            <footer style={{
                borderTop: '1px solid rgba(255,255,255,0.05)',
                padding: '24px 48px',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <Stars size={16} color="#6366f1" />
                    <span style={{ color: '#475569', fontSize: 13 }}>ContentFlow AI · Made for Bharat 🇮🇳</span>
                </div>
                <span style={{ color: '#475569', fontSize: 13 }}>Powered by Google Gemini</span>
            </footer>
        </div>
    );
}
