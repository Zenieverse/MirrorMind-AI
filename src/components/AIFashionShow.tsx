import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Download, Share2, RefreshCcw, Star, Zap, ShoppingBag } from 'lucide-react';
import { AestheticMood, SkinAnalysis } from '@/src/types';
import { PRODUCTS, MOODS } from '@/src/constants';
import { cn } from '@/src/lib/utils';

interface AIFashionShowProps {
  mood: AestheticMood;
  analysisData?: SkinAnalysis | null;
  userName?: string;
  onAction?: (message: string, type: 'success' | 'info') => void;
}

export const AIFashionShow: React.FC<AIFashionShowProps> = ({ mood, analysisData, onAction }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [previews, setPreviews] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [aiPrompt, setAiPrompt] = useState<string>('');

  const LOOK_TITLES = [
    'Volumetric Refinement',
    'Neural Synthesis',
    'Aetheric Projection',
  ];

  useEffect(() => {
    const generateAiPrompt = async () => {
      setIsGenerating(true);
      try {
        const features = analysisData?.insights?.summary || 'Standard profile';
        const res = await fetch('/api/generate-fashion-prompt', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ mood, features })
        });
        const data = await res.json();
        setAiPrompt(data.prompt);
        
        // Simulation of image retrieval (in a real app, you'd use the prompt to generate images)
        setTimeout(() => {
          setIsGenerating(false);
          setPreviews([
            'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&q=80&w=800',
            'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=800',
          ]);
        }, 1500);
      } catch (e) {
        setIsGenerating(false);
      }
    };
    
    generateAiPrompt();
  }, [mood, analysisData]);

  const handlePurchase = (name: string) => {
    onAction?.(`${name} Added to Registry`, 'success');
  };

  const handleBundle = () => {
    onAction?.(`Bundle ${mood} Initialized for Delivery`, 'success');
  };

  const handleExport = () => {
    onAction?.('Exporting Neural Lookbook...', 'info');
  };

  const handleRegenerate = () => {
    setIsGenerating(true);
    setTimeout(() => setIsGenerating(false), 2000);
    onAction?.('Recalibrating Synthesis Engine', 'info');
  };

  return (
    <div className="space-y-16 pb-20 pt-16">
      <div className="flex flex-col md:flex-row justify-between items-end gap-10 border-b border-white/10 pb-12">
        <div className="space-y-4">
             <div className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">
                Synthesis Process 04 // Gallery
             </div>
             <h2 className="text-7xl font-light tracking-tighter uppercase whitespace-pre-line">
                Progenitor Status: <br/> <span className="font-black text-neon-purple">{MOODS.find(m => m.id === mood)?.title || mood}</span>
             </h2>
        </div>
        <div className="flex gap-4">
            <button 
              onClick={() => onAction?.('Lookbook Shared to Neural Network', 'success')}
              className="w-12 h-14 glass-panel border-white/20 flex items-center justify-center hover:bg-white/10 transition-all"
            >
                <Share2 className="w-4 h-4 opacity-70" />
            </button>
            <button 
              onClick={() => onAction?.('Registry Accessed', 'info')}
              className="px-8 py-4 glass-panel border-white/20 text-[10px] tracking-widest uppercase hover:bg-white/10 transition-all"
            >
                Registry
            </button>
            <button 
              onClick={handleExport}
              className="px-8 py-4 bg-white text-luxury-black font-black text-[10px] tracking-widest uppercase hover:bg-electric-blue hover:text-white transition-all"
            >
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
                        <AnimatePresence mode="wait">
                          <motion.img 
                              key={currentIndex}
                              initial={{ opacity: 0, scale: 1.05 }}
                              animate={{ opacity: 1, scale: 1 }}
                              exit={{ opacity: 0, scale: 0.95 }}
                              transition={{ duration: 0.8 }}
                              src={previews[currentIndex]} 
                              alt="Fashion Result" 
                              className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-grayscale duration-1000" 
                          />
                        </AnimatePresence>
                        
                        <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
                        
                        <div className="absolute bottom-16 left-16 right-16 flex justify-between items-end">
                             <div className="space-y-4">
                                <span className="text-[10px] tracking-[0.6em] uppercase text-white/30 font-bold">Sequence-00{currentIndex + 1}</span>
                                <h4 className="text-5xl font-light tracking-tighter uppercase leading-none">{LOOK_TITLES[currentIndex].split(' ')[0]} <br/><span className="font-black italic">{LOOK_TITLES[currentIndex].split(' ')[1]}</span></h4>
                             </div>
                             
                             <div className="flex gap-4 mb-2">
                                {previews.map((_, i) => (
                                  <button 
                                    key={i} 
                                    onClick={() => setCurrentIndex(i)}
                                    className={cn(
                                      "w-12 h-1 transition-all relative overflow-hidden",
                                      i === currentIndex ? "bg-neon-purple w-20" : "bg-white/20 hover:bg-white/40"
                                    )}
                                  >
                                    {i === currentIndex && (
                                      <motion.div 
                                        layoutId="progress-indicator"
                                        className="absolute inset-0 bg-white/20"
                                      />
                                    )}
                                  </button>
                                ))}
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
                    {aiPrompt && (
                      <div className="space-y-2 pt-2">
                        <span className="text-[9px] tracking-widest uppercase opacity-20">Neural Logic</span>
                        <p className="text-[9px] leading-relaxed opacity-60 line-clamp-4 italic">
                          {aiPrompt}
                        </p>
                      </div>
                    )}
                </div>
                <button 
                  onClick={handleRegenerate}
                  className="w-full py-5 border border-white/10 text-[9px] tracking-[0.3em] uppercase font-black hover:bg-white/5 transition-all"
                >
                    Re-Synthesize Logic
                </button>
            </div>

            <div className="glass-card p-10 bg-gradient-to-br from-indigo-500/5 to-transparent border-white/10">
                <h4 className="text-[9px] tracking-[0.4em] uppercase opacity-40 mb-10 font-bold">Mirror Resonance</h4>
                <div className="text-8xl font-black tracking-tighter text-white mb-4">
                  {((analysisData?.overall_score || 84) / 10).toFixed(1)}
                </div>
                <p className="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">
                    {(analysisData?.overall_score || 84) > 90 ? 'Exceptional' : 'High'} alignment with core structural profile.
                </p>
                <div className="mt-12 pt-10 border-t border-white/10">
                    <button 
                      onClick={handleBundle}
                      className="w-full py-5 bg-white text-luxury-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-neon-purple hover:text-white transition-all"
                    >
                        Acquire Bundle
                    </button>
                </div>
            </div>
        </div>
      </div>
      
      {/* Smart Recommendations */}
      <div className="space-y-10 pt-20 border-t border-white/10">
        <div className="flex flex-col gap-2">
            <span className="text-[10px] tracking-[0.5em] uppercase opacity-40 font-black">Augmented Commerce</span>
            <div className="flex items-center justify-between">
                <h3 className="text-4xl font-light uppercase">Curated <span className="font-bold">Essentials</span></h3>
                <button 
                  onClick={() => onAction?.('Redirecting to Global Neural Registry', 'info')}
                  className="text-[10px] uppercase tracking-[0.3em] text-white/40 border-b border-white/10 hover:border-white transition-all pb-1 h-fit"
                >
                    View All Registry
                </button>
            </div>
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
                    <button 
                      onClick={() => handlePurchase(product.name)}
                      className="w-full p-2 bg-white/5 border border-white/5 rounded-xl hover:bg-white/10 transition-colors text-xs font-bold uppercase tracking-widest"
                    >
                        Purchase
                    </button>
                </motion.div>
            ))}
        </div>
      </div>
    </div>
  );
};
