import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, Share2, RefreshCcw, Star, Zap, ShoppingBag } from 'lucide-react';
import { AestheticMood } from '@/src/types';
import { PRODUCTS } from '@/src/constants';

interface AIFashionShowProps {
  mood: AestheticMood;
  userName?: string;
}

export const AIFashionShow: React.FC<AIFashionShowProps> = ({ mood }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [previews, setPreviews] = useState<string[]>([]);

  useEffect(() => {
    // Simulation of AI generation
    const timer = setTimeout(() => {
      setIsGenerating(false);
      setPreviews([
        'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
        'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
      ]);
    }, 3000);
    return () => clearTimeout(timer);
  }, [mood]);

  return (
    <div className="space-y-16 pb-20 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/10 pb-12">
        <div className="space-y-4">
             <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">
                Synthesis Process 04 // Gallery
             </div>
             <h2 className="text-7xl font-light tracking-tighter uppercase whitespace-pre-line">
                Progenitor Status: <br/> <span className="font-black text-neon-purple">{mood}</span>
             </h2>
        </div>
        <div className="flex gap-4">
            <button className="px-8 py-4 glass-panel border-white/20 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all">
                Registry
            </button>
            <button className="px-8 py-4 bg-white text-luxury-black font-black text-[10px] tracking-widest uppercase hover:bg-electric-blue hover:text-white transition-all">
                Export Data
            </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Main Exhibit */}
        <div className="lg:col-span-8 relative aspect-[4/5] rounded-[40px] overflow-hidden group border border-white/5 bg-luxury-charcoal">
            <AnimatePresence mode="wait">
                {isGenerating ? (
                    <motion.div 
                        key="loading"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center"
                    >
                        <div className="relative w-40 h-40 mb-10">
                             <motion.div 
                                animate={{ rotate: 360 }}
                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 border-[1px] border-dashed border-white/20 rounded-full"
                             />
                             <motion.div 
                                animate={{ y: [-10, 10, -10] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                                className="absolute inset-0 flex items-center justify-center"
                             >
                                <Zap className="w-10 h-10 text-neon-purple animate-pulse" />
                             </motion.div>
                        </div>
                        <h3 className="text-[10px] tracking-[0.5em] uppercase font-bold opacity-60">Rendering Personality...</h3>
                    </motion.div>
                ) : (
                    <motion.div 
                        key="content"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1.5 }}
                        className="w-full h-full relative"
                    >
                        <img 
                            src={previews[0]} 
                            alt="Fashion Result" 
                            className="w-full h-full object-cover grayscale-[0.2] transition-all duration-2000 group-hover:scale-105 group-hover:grayscale-0" 
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
                             <div className="space-y-4">
                                <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 font-bold">Sequence-001</span>
                                <h4 className="text-5xl font-light tracking-tighter uppercase leading-none">Volumetric <br/><span className="font-black italic">Refinement</span></h4>
                             </div>
                        </div>
                        
                        {/* Brackets */}
                        <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-white/20" />
                        <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-white/20" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>

        {/* Sidebar Data */}
        <div className="lg:col-span-4 space-y-10">
            <div className="glass-card p-10 space-y-10 border-white/10">
                <div className="flex items-center justify-between">
                    <h4 className="text-[9px] tracking-[0.4em] uppercase opacity-40 font-bold">Parameters</h4>
                    <Zap className="w-4 h-4 text-electric-blue" />
                </div>
                <div className="space-y-6">
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-[10px] tracking-widest uppercase opacity-40">Texture</span>
                        <span className="text-xs font-mono uppercase tracking-tighter">Iridium Silk</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-white/5 pb-4">
                        <span className="text-[10px] tracking-widest uppercase opacity-40">Lighting</span>
                        <span className="text-xs font-mono uppercase tracking-tighter">Atmospheric</span>
                    </div>
                </div>
                <button className="w-full py-5 border border-white/10 text-[9px] tracking-[0.3em] uppercase font-black hover:bg-white/5 transition-all">
                    Re-Synthesize Logic
                </button>
            </div>

            <div className="glass-card p-10 bg-gradient-to-br from-indigo-500/5 to-transparent border-white/10">
                <h4 className="text-[9px] tracking-[0.4em] uppercase opacity-40 mb-10 font-bold">Mirror Resonance</h4>
                <div className="text-8xl font-black tracking-tighter text-white mb-4">9.8</div>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
                    Exceptional alignment with core structural profile.
                </p>
                <div className="mt-12 pt-10 border-t border-white/10">
                    <button className="w-full py-5 bg-white text-luxury-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-neon-purple hover:text-white transition-all">
                        Acquire Bundle
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Smart Recommendations */}
      <div className="space-y-8">
        <div className="flex items-center justify-between">
            <h3 className="text-2xl font-bold font-display">Curated Essentials</h3>
            <button className="text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">View All</button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PRODUCTS.map(product => (
                <motion.div 
                    key={product.id}
                    whileHover={{ y: -5 }}
                    className="glass-card p-4 space-y-4 group"
                >
                    <div className="aspect-square rounded-2xl overflow-hidden relative">
                        <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                        <div className="absolute top-2 right-2 px-2 py-1 bg-white/20 backdrop-blur-md rounded-lg text-[10px] font-bold">
                            {product.matchScore}% Match
                        </div>
                    </div>
                    <div className="space-y-1">
                        <p className="text-[10px] uppercase tracking-widest text-white/40">{product.brand}</p>
                        <h5 className="font-bold">{product.name}</h5>
                    </div>
                    <button className="w-full p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest">
                        Purchase
                    </button>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
