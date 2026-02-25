import { motion } from 'framer-motion';
import { RadialBarChart, RadialBar, ResponsiveContainer } from 'recharts';
import type { QualityScore } from '../types';

interface Props {
    score: QualityScore;
    platform: string;
    color: string;
}

function ScoreBar({ label, value, color }: { label: string; value: number; color: string }) {
    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                <span style={{ fontSize: 13, color: '#94a3b8' }}>{label}</span>
                <span style={{ fontSize: 13, fontWeight: 700, color }}>
                    {value}
                    <span style={{ fontSize: 10, fontWeight: 400, color: '#475569' }}>/100</span>
                </span>
            </div>
            <div style={{ height: 6, background: 'rgba(255,255,255,0.06)', borderRadius: 3, overflow: 'hidden' }}>
                <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${value}%` }}
                    transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
                    style={{ height: '100%', background: color, borderRadius: 3 }}
                />
            </div>
        </div>
    );
}

export default function QualityScorePanel({ score, platform: _platform, color }: Props) {
    const overallColor =
        score.overall >= 80 ? '#4ade80' : score.overall >= 60 ? '#fbbf24' : '#f87171';

    const chartData = [{ value: score.overall, fill: overallColor }];

    return (
        <div className="glass" style={{ padding: '24px 28px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
                <span style={{
                    fontSize: 11, fontWeight: 700, color: '#475569',
                    textTransform: 'uppercase', letterSpacing: '0.07em',
                }}>
                    Quality Score
                </span>
                <span className="badge badge-green" style={{ marginLeft: 'auto', fontSize: 12 }}>
                    Overall: {score.overall}
                </span>
            </div>

            <div style={{ display: 'flex', gap: 28, alignItems: 'center', flexWrap: 'wrap' }}>
                {/* Radial Gauge */}
                <div style={{ width: 120, height: 120, flexShrink: 0 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <RadialBarChart
                            cx="50%"
                            cy="50%"
                            innerRadius="60%"
                            outerRadius="100%"
                            data={chartData}
                            startAngle={90}
                            endAngle={-270}
                            barSize={10}
                        >
                            <RadialBar
                                dataKey="value"
                                cornerRadius={5}
                                background={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                        </RadialBarChart>
                    </ResponsiveContainer>
                    <div style={{ textAlign: 'center', marginTop: -64, position: 'relative' }}>
                        <span style={{ fontSize: 22, fontWeight: 800, color: overallColor }}>
                            {score.overall}
                        </span>
                    </div>
                </div>

                {/* Score Bars */}
                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 14, minWidth: 180 }}>
                    <ScoreBar label="Clarity (25%)" value={score.clarity} color={color} />
                    <ScoreBar label="Engagement (30%)" value={score.engagement} color="#8b5cf6" />
                    <ScoreBar label="Platform Fit (25%)" value={score.platform_optimization} color="#22d3ee" />
                    <ScoreBar label="Originality (20%)" value={score.originality} color="#ec4899" />
                </div>
            </div>

            {/* Explanation */}
            <div style={{
                marginTop: 20, padding: '12px 16px',
                background: 'rgba(255,255,255,0.04)', borderRadius: 10,
                border: '1px solid rgba(255,255,255,0.07)',
            }}>
                <p style={{ color: '#64748b', fontSize: 13, lineHeight: 1.6, margin: 0 }}>
                    {score.explanation}
                </p>
            </div>

            {/* Improvements */}
            {score.improvements && score.improvements.length > 0 && (
                <div style={{ marginTop: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 600, color: '#475569', textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                        Suggested Improvements
                    </span>
                    <div style={{ marginTop: 10, display: 'flex', flexDirection: 'column', gap: 6 }}>
                        {score.improvements.map((imp, i) => (
                            <div key={i} style={{
                                display: 'flex', alignItems: 'flex-start', gap: 8,
                                padding: '8px 12px',
                                background: 'rgba(251,191,36,0.06)',
                                borderRadius: 8, border: '1px solid rgba(251,191,36,0.15)',
                            }}>
                                <span style={{ color: '#fbbf24', fontSize: 13, flexShrink: 0, marginTop: 1 }}>→</span>
                                <span style={{ color: '#94a3b8', fontSize: 13, lineHeight: 1.5 }}>{imp}</span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
