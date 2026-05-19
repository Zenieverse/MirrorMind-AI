import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sliders, X, Check, Camera, Layers, Wand2, ArrowLeft } from 'lucide-react';
import { cn } from '@/src/lib/utils';

const AR_TYPES = [
  { id: 'lips', label: 'Lipstick', icon: '👄' },
  { id: 'blush', label: 'Blush', icon: '🌸' },
  { id: 'hair', label: 'Hair Color', icon: '💇‍♀️' },
  { id: 'glasses', label: 'Eyewear', icon: '👓' },
  { id: 'earrings', label: 'Jewelry', icon: '💎' },
];

const COLORS = [
  { name: 'Velvet Red', hex: '#991b1b' },
  { name: 'Electric Blue', hex: '#3b82f6' },
  { name: 'Neon Purple', hex: '#a855f7' },
  { name: 'Soft Pink', hex: '#f472b6' },
  { name: 'Champagne Gold', hex: '#eab308' },
  { name: 'Emerald', hex: '#059669' },
];

export const ARStudio: React.FC<{ image: string; onBack: () => void }> = ({ image, onBack }) => {
  const [selectedType, setSelectedType] = useState('lips');
  const [activeEffects, setActiveEffects] = useState<Record<string, string>>({});
  const [intensity, setIntensity] = useState(70);

  const toggleEffect = (type: string, color: string) => {
    setActiveEffects(prev => ({
      ...prev,
      [type]: color
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 h-[calc(100vh-160px)]">
      {/* Simulation Preview Area */}
      <div className="lg:w-2/3 relative rounded-[40px] overflow-hidden bg-luxury-charcoal border border-white/10 group">
        <div className="relative w-full h-full flex items-center justify-center max-w-lg aspect-square mx-auto">
            <img src={image} alt="User" className="w-full h-full object-cover grayscale-[0.2]" />
            
            {/* AR Overlays Simulation (Simplified for visual demo) */}
            <AnimatePresence>
                {activeEffects['lips'] && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: (intensity / 100) * 0.4 }}
                        className="absolute inset-x-[35%] top-[70%] h-8 bg-red-800 rounded-full blur-md"
                        style={{ backgroundColor: activeEffects['lips'], boxShadow: `0 0 20px ${activeEffects['lips']}` }}
                    />
                )}
                
                {activeEffects['glasses'] && (
                    <motion.div 
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="absolute inset-x-[20%] top-[40%] h-20 border-4 border-white/30 rounded-2xl flex items-center justify-between px-6 bg-white/5 backdrop-blur-sm"
                        style={{ borderColor: activeEffects['glasses'] }}
                    >
                        <div className="w-12 h-12 rounded-full border border-white/20" />
                        <div className="w-12 h-12 rounded-full border border-white/20" />
                    </motion.div>
                )}
                
                {activeEffects['hair'] && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.2 }}
                        className="absolute inset-0 bg-gradient-to-t from-transparent via-transparent to-purple-500/30 mix-blend-color"
                        style={{ background: `linear-gradient(to bottom, ${activeEffects['hair']}33, transparent)` }}
                    />
                )}
            </AnimatePresence>

            <div className="absolute inset-0 border-[20px] border-luxury-charcoal/50 pointer-events-none" />
            
            {/* Corner Brackets */}
            <div className="absolute top-8 left-8 w-12 h-12 border-t-2 border-l-2 border-neon-purple/50" />
            <div className="absolute top-8 right-8 w-12 h-12 border-t-2 border-r-2 border-neon-purple/50" />
            
            <div className="absolute top-1/2 left-0 right-0 h-px bg-neon-purple/30 animate-scan pointer-events-none" />
        </div>
      </div>

      {/* Control Panel */}
      <div className="lg:w-1/3 flex flex-col gap-8 overflow-y-auto pr-2">
        <div className="glass-card p-10 space-y-8 border-white/10">
            <div className="flex items-center justify-between">
                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 font-bold">VTO Render Studio</h3>
                <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-colors">
                    <ArrowLeft className="w-5 h-5 opacity-40" />
                </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
                {AR_TYPES.map(type => (
                    <button
                        key={type.id}
                        onClick={() => setSelectedType(type.id)}
                        className={cn(
                            "px-4 py-4 rounded-xl border transition-all flex flex-col items-center gap-3",
                            selectedType === type.id 
                                ? "bg-white text-luxury-black border-white" 
                                : "bg-white/5 border-white/10 hover:bg-white/10"
                        )}
                    >
                        <span className="text-xl">{type.icon}</span>
                        <span className="text-[8px] uppercase tracking-widest font-black">{type.label}</span>
                    </button>
                ))}
            </div>

            <div className="space-y-4">
                <div className="flex items-center justify-between text-[9px] uppercase tracking-[0.2em] text-white/40">
                    <span>Alpha Intensity</span>
                    <span>{intensity}%</span>
                </div>
                <input 
                    type="range" 
                    value={intensity} 
                    onChange={(e) => setIntensity(parseInt(e.target.value))}
                    className="w-full accent-neon-purple bg-white/10 rounded-lg h-1" 
                />
            </div>

            <div className="space-y-4 pt-4 border-t border-white/5">
                <p className="text-[9px] uppercase tracking-[0.2em] text-white/40">Neural Palette</p>
                <div className="grid grid-cols-3 gap-3">
                    {COLORS.map(color => (
                        <button
                            key={color.hex}
                            onClick={() => toggleEffect(selectedType, color.hex)}
                            className={cn(
                                "h-14 rounded-xl border transition-all relative overflow-hidden",
                                activeEffects[selectedType] === color.hex ? "border-white" : "border-transparent"
                            )}
                        >
                            <div className="absolute inset-0" style={{ backgroundColor: color.hex }} />
                            {activeEffects[selectedType] === color.hex && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                                    <Check className="w-4 h-4 text-white" />
                                </div>
                            )}
                        </button>
                    ))}
                </div>
            </div>

            <button className="w-full py-5 bg-white text-luxury-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-neon-purple hover:text-white transition-all">
                Registry Changes
            </button>
        </div>

        <div className="glass-card p-6">
            <h4 className="text-sm font-bold font-display mb-4">Stack Summary</h4>
            <div className="flex flex-wrap gap-2">
                {Object.entries(activeEffects).map(([type, color]) => (
                    <div key={type} className="px-3 py-2 rounded-full bg-white/5 border border-white/10 flex items-center gap-2 text-[10px] uppercase tracking-wider">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: color }} />
                        {type}
                        <button onClick={() => {
                            const newEffects = { ...activeEffects };
                            delete newEffects[type];
                            setActiveEffects(newEffects);
                        }}>
                            <X className="w-3 h-3 hover:text-red-400" />
                        </button>
                    </div>
                ))}
                {Object.keys(activeEffects).length === 0 && (
                    <p className="text-xs text-white/40 italic">No effects active</p>
                )}
            </div>
        </div>
      </div>
    </div>
  );
};
