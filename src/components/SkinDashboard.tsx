import React from 'react';
import { motion } from 'motion/react';
import { SkinAnalysis } from '@/src/types';
import { Droplets, Sparkles, Activity, Shield, Zap, Eye } from 'lucide-react';
import { cn } from '@/src/lib/utils';

interface SkinDashboardProps {
  data: SkinAnalysis;
}

export const SkinDashboard: React.FC<SkinDashboardProps> = ({ data }) => {
  const [showFuture, setShowFuture] = React.useState(false);

  const metrics = [
    { label: 'Hydration', value: showFuture ? Math.min(100, data.scores.moisture + 15) : data.scores.moisture, icon: Droplets, color: '#3b82f6' },
    { label: 'Texture', value: showFuture ? Math.min(100, data.scores.texture + 10) : data.scores.texture, icon: Sparkles, color: '#a855f7' },
    { label: 'Brightness', value: showFuture ? Math.min(100, data.scores.spots + 12) : data.scores.spots, icon: Zap, color: '#f59e0b' },
    { label: 'Firmness', value: showFuture ? Math.min(100, data.scores.wrinkles + 8) : data.scores.wrinkles, icon: Activity, color: '#10b981' },
    { label: 'Redness', value: showFuture ? Math.max(0, data.scores.redness - 20) : data.scores.redness, icon: Shield, color: '#ef4444' },
    { label: 'Dark Circles', value: showFuture ? Math.max(0, data.scores.dark_circles - 15) : data.scores.dark_circles, icon: Eye, color: '#6366f1' },
  ];

  const overallScore = showFuture ? Math.min(100, data.overall_score + 10) : data.overall_score;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center bg-white/5 p-4 rounded-2xl border border-white/10">
        <div className="space-y-1">
          <h4 className="text-sm font-bold uppercase tracking-widest">Future Self Simulation</h4>
          <p className="text-[10px] text-white/40 uppercase tracking-wider">Projected results after 4-week personalized regimen</p>
        </div>
        <button 
          onClick={() => setShowFuture(!showFuture)}
          className={cn(
            "px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest transition-all",
            showFuture ? "bg-neon-purple text-white" : "bg-white/10 text-white/60 hover:bg-white/20"
          )}
        >
          {showFuture ? "Simulation Active" : "Preview Future"}
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {metrics.map((metric, idx) => (
        <motion.div
          key={metric.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: idx * 0.1 }}
          className="glass-card p-6 flex flex-col gap-4 items-center text-center relative overflow-hidden group"
        >
          <div 
            className="absolute inset-0 bg-gradient-to-br transition-opacity opacity-0 group-hover:opacity-10"
            style={{ backgroundImage: `linear-gradient(to bottom right, ${metric.color}, transparent)` }}
          />
          
          <div className="p-3 rounded-full bg-white/5 text-white/80">
            <metric.icon className="w-6 h-6" style={{ color: metric.color }} />
          </div>
          
          <div className="space-y-1">
            <p className="text-xs uppercase tracking-widest text-white/50">{metric.label}</p>
            <h3 className="text-2xl font-bold font-display">{metric.value}%</h3>
          </div>
          
          <div className="w-full bg-white/5 h-1 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: `${metric.value}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full"
              style={{ backgroundColor: metric.color }}
            />
          </div>
        </motion.div>
      ))}
      
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.8 }}
        className="col-span-2 md:col-span-3 glass-card p-8 bg-gradient-to-r from-neon-purple/20 to-electric-blue/20 flex flex-col md:flex-row items-center justify-around gap-8"
      >
        <div className="relative w-40 h-40">
            <svg className="w-full h-full transform -rotate-90">
                <circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="transparent"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="8"
                />
                <motion.circle
                    cx="80"
                    cy="80"
                    r="70"
                    fill="transparent"
                    stroke="url(#gradient)"
                    strokeWidth="8"
                    strokeDasharray={440}
                    initial={{ strokeDashoffset: 440 }}
                    animate={{ strokeDashoffset: 440 - (440 * overallScore) / 100 }}
                    transition={{ duration: 2, ease: "easeOut" }}
                    strokeLinecap="round"
                />
                <defs>
                    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#a855f7" />
                        <stop offset="100%" stopColor="#3b82f6" />
                    </linearGradient>
                </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-4xl font-bold font-display">{overallScore}</span>
                <span className="text-[10px] uppercase tracking-tighter text-white/50">Overall Score</span>
            </div>
        </div>
        
        <div className="flex-1 space-y-4">
            <h4 className="text-xl font-medium font-display">AI Skin Insight</h4>
            <p className="text-white/70 leading-relaxed italic">
                "Your dermal profile suggests exceptional texture quality. Focus on moisture retention in the eye contour area to boost your overall luminosity score by 12 points."
            </p>
            <div className="flex gap-4">
                <div className="flex items-center gap-2 text-xs text-white/40">
                    <div className="w-2 h-2 rounded-full bg-neon-purple animate-pulse" />
                    Confidence: 99.4%
                </div>
                <div className="flex items-center gap-2 text-xs text-white/40">
                    <div className="w-2 h-2 rounded-full bg-electric-blue animate-pulse" />
                    Model: MirrorMind-v4
                </div>
            </div>
        </div>
      </motion.div>
      </div>
    </div>
  );
};
