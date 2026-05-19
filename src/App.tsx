import React, { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Scan, 
  Sparkles, 
  LayoutDashboard, 
  Palette, 
  ChevronRight,
  Zap,
  Globe,
  Bell
} from 'lucide-react';
import { CameraScanner } from './components/CameraScanner.tsx';
import { SkinDashboard } from './components/SkinDashboard.tsx';
import { MoodSelector } from './components/MoodSelector.tsx';
import { ARStudio } from './components/ARStudio.tsx';
import { AIFashionShow } from './components/AIFashionShow.tsx';
import { AestheticMood, SkinAnalysis } from './types.ts';
import { cn } from './lib/utils.ts';

type AppState = 'landing' | 'scan' | 'analysis' | 'mood' | 'studio' | 'transformation';

export default function App() {
  const [state, setState] = useState<AppState>('landing');
  const [userImage, setUserImage] = useState<string | null>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [analysisData, setAnalysisData] = useState<SkinAnalysis | null>(null);
  const [selectedMood, setSelectedMood] = useState<AestheticMood | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'info' } | null>(null);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'info') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  }, []);

  const startAnalysis = async (image: string) => {
    setUserImage(image);
    setIsScanning(true);
    showToast('Initializing Biometric Link...', 'info');
    
    // Simulate API call to Perfect Corp / Backend
    try {
        const res = await fetch('/api/perfect-corp/skin-analysis', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ image })
        });
        const data = await res.json();
        
        setTimeout(() => {
            setAnalysisData(data);
            setIsScanning(false);
            setState('analysis');
            showToast('Dermal Mapping Complete', 'success');
        }, 3000);
    } catch (e) {
        setTimeout(() => {
          setIsScanning(false);
          setState('analysis'); // Fallback to demo data
          showToast('Using Neural Proxy Baseline', 'info');
        }, 2000);
    }
  };

  const navItems = [
    { id: 'analysis', label: 'Analysis', icon: LayoutDashboard, access: !!analysisData },
    { id: 'mood', label: 'Mood', icon: Palette, access: !!analysisData },
    { id: 'studio', label: 'VTO Studio', icon: Scan, access: !!userImage },
    { id: 'transformation', label: 'Persona', icon: Sparkles, access: !!selectedMood },
  ];

  return (
    <div className="min-h-screen bg-luxury-black text-white selection:bg-neon-purple/30 overflow-x-hidden font-sans">
      {/* Background Ambience */}
      <div className="bg-mesh z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-electric-blue rounded-full blur-[120px] opacity-30 animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-neon-purple rounded-full blur-[120px] opacity-30 animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Persistent Navigation */}
      <AnimatePresence>
        {state !== 'landing' && (
          <motion.nav 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="artistic-nav z-50 fixed top-0 w-full"
          >
            <button onClick={() => setState('landing')} className="flex flex-col text-left">
              <span className="text-[10px] tracking-[0.4em] uppercase opacity-60 font-medium mb-1">Future Identity</span>
              <h1 className="text-2xl font-light tracking-tighter uppercase">Mirror<span className="font-black">Mind</span> <span className="text-neon-purple">AI</span></h1>
            </button>

            <div className="hidden md:flex gap-8 items-center text-[10px] tracking-widest uppercase">
                {navItems.map(item => (
                    <button
                        key={item.id}
                        disabled={!item.access}
                        onClick={() => setState(item.id as AppState)}
                        className={cn(
                            "transition-all border-b pb-1",
                            state === item.id 
                                ? "border-white opacity-100" 
                                : item.access ? "border-transparent opacity-40 hover:opacity-100" : "opacity-10 cursor-not-allowed"
                        )}
                    >
                        {item.label}
                    </button>
                ))}
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center bg-white/5 ml-4">
                  <div className="w-2 h-2 bg-neon-green rounded-full shadow-[0_0_8px_#00ff00]"></div>
                </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>

      <main className={cn(
        "relative z-10 mx-auto transition-all duration-700 pt-20",
        state === 'landing' ? "pt-0" : ""
      )}>
        <AnimatePresence mode="wait">
          {state === 'landing' && (
            <motion.div 
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className="min-h-screen flex flex-col items-center justify-center relative px-10 text-center"
            >
              <div className="max-w-5xl space-y-12">
                <div className="space-y-4">
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-[10px] tracking-[0.6em] uppercase opacity-40 font-bold mb-4 block"
                    >
                        Pioneering Neural Aesthetics
                    </motion.div>
                
                    <motion.h1 
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-8xl md:text-[10rem] font-light tracking-tighter leading-none uppercase"
                    >
                        Mirror<span className="font-black">Mind</span>
                    </motion.h1>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-lg md:text-xl text-white/40 tracking-wide max-w-xl mx-auto uppercase"
                    >
                        Transform your identity through AI diagnostics and volumetric AR synthesis.
                    </motion.p>
                </div>

                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-10"
                >
                  <button 
                    onClick={() => setState('scan')}
                    className="group relative px-12 py-5 bg-white text-luxury-black font-black text-xs tracking-[0.3em] uppercase hover:bg-neon-purple hover:text-white transition-all duration-500 rounded-none overflow-hidden"
                  >
                    <span className="relative z-10">Start Protocol</span>
                    <div className="absolute top-0 left-0 w-1 h-full bg-neon-purple" />
                  </button>
                  <button className="text-[10px] tracking-[0.3em] uppercase border-b border-white/20 pb-1 hover:border-white transition-all opacity-60 hover:opacity-100">
                    Neural Archive
                  </button>
                </motion.div>
              </div>
            </motion.div>
          )}

          {state === 'scan' && (
            <motion.div 
              key="scan"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-5xl mx-auto px-10 py-20 space-y-12"
            >
                <div className="flex justify-between items-end border-b border-white/10 pb-8">
                    <div className="space-y-1">
                        <span className="text-[10px] tracking-[0.4em] uppercase opacity-40">Capture Phase</span>
                        <h2 className="text-4xl font-light uppercase tracking-tighter">Biometric <span className="font-bold">Sync</span></h2>
                    </div>
                    <p className="text-[10px] tracking-widest text-white/40 uppercase max-w-xs text-right">
                        Mapping 400+ neural points for precise aesthetic synthesis.
                    </p>
                </div>
                
                <div className="relative">
                    <CameraScanner 
                        onCapture={startAnalysis}
                        isScanning={isScanning}
                    />
                    
                    {/* Corner Brackets from Design */}
                    <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-neon-purple" />
                    <div className="absolute -top-4 -right-4 w-12 h-12 border-t-2 border-r-2 border-neon-purple" />
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 border-b-2 border-l-2 border-neon-purple" />
                    <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-neon-purple" />
                </div>
            </motion.div>
          )}

          {state === 'analysis' && analysisData && (
            <motion.div 
              key="analysis"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-[1440px] mx-auto px-10 pb-20 pt-8"
            >
               <div className="grid grid-cols-1 md:grid-cols-12 gap-8 h-full">
                    {/* Left Sidebar: Analysis */}
                    <div className="md:col-span-3 space-y-6 flex flex-col">
                        <div className="glass-card p-8 flex-1 flex flex-col gap-8">
                            <div>
                                <h3 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6">Skin Analysis</h3>
                                <div className="space-y-4">
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-[10px] tracking-widest uppercase opacity-60">Hydration</span>
                                        <span className="text-xs font-mono">{analysisData.scores.moisture}%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-[10px] tracking-widest uppercase opacity-60">Luminosity</span>
                                        <span className="text-xs font-mono">{analysisData.scores.texture}%</span>
                                    </div>
                                    <div className="flex justify-between border-b border-white/10 pb-2">
                                        <span className="text-[10px] tracking-widest uppercase opacity-60">Elasticity</span>
                                        <span className="text-xs font-mono">{analysisData.scores.wrinkles}%</span>
                                    </div>
                                </div>
                            </div>
                            
                            <div className="mt-8">
                                <p className="text-[11px] leading-relaxed opacity-60 italic tracking-wide font-light">
                                    "Neural profile optimized for {selectedMood || 'minimalist'} finish. Structure suggests potential for high-contrast highlighting."
                                </p>
                            </div>
                            
                            <button 
                                onClick={() => setState('mood')}
                                className="mt-auto w-full py-4 bg-white text-luxury-black font-black text-[10px] tracking-[0.3em] uppercase hover:bg-neon-purple hover:text-white transition-all"
                            >
                                Procedural Mood
                            </button>
                        </div>
                    </div>

                    {/* Center: Hero Image / Scan Preview */}
                    <div className="md:col-span-6 relative aspect-[3/4] md:aspect-auto rounded-[40px] overflow-hidden bg-luxury-charcoal border border-white/10 group">
                         {userImage && <img src={userImage} alt="User Scan" className="w-full h-full object-cover grayscale-[0.3] brightness-125" />}
                         <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-luxury-black/80 to-transparent pointer-events-none" />
                         
                         <div className="absolute top-8 left-8 flex flex-col gap-2 z-10">
                            <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] border border-white/10 uppercase tracking-[0.3em] flex items-center gap-2">
                                <div className="w-1.5 h-1.5 rounded-full bg-neon-green" />
                                Neural Link 100%
                            </span>
                            <span className="bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full text-[9px] border border-white/10 uppercase tracking-[0.3em]">
                                VTO Rendering Active
                            </span>
                         </div>
                         
                         <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="w-12 h-12 rounded-full glass-panel flex items-center justify-center hover:scale-110 transition-transform">
                                <Scan className="w-5 h-5" />
                            </button>
                            <button 
                                onClick={() => setState('studio')}
                                className="px-8 py-3 bg-neon-purple text-white text-[10px] tracking-[0.3em] font-black uppercase rounded-full hover:scale-105 transition-transform"
                            >
                                Open Studio
                            </button>
                         </div>
                         
                         {/* Scan Line Animation */}
                         <div className="absolute inset-x-0 top-1/4 h-px bg-neon-purple/50 shadow-[0_0_20px_#a855f7] animate-scan pointer-events-none" />
                    </div>

                    {/* Right: Insights & Progression */}
                    <div className="md:col-span-3 space-y-6">
                        <div className="glass-card p-8">
                             <span className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 block font-bold">Resonance Score</span>
                             <div className="relative w-32 h-32 mx-auto flex items-center justify-center mb-6">
                                <svg className="absolute w-full h-full -rotate-90">
                                    <circle cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="2" fill="transparent" className="text-white/10" />
                                    <motion.circle 
                                        cx="64" cy="64" r="60" stroke="currentColor" strokeWidth="4" fill="transparent" 
                                        strokeDasharray="377" 
                                        initial={{ strokeDashoffset: 377 }}
                                        animate={{ strokeDashoffset: 377 - (377 * 84) / 100 }}
                                        transition={{ duration: 2 }}
                                        className="text-neon-purple" 
                                    />
                                </svg>
                                <div className="flex flex-col items-center">
                                    <span className="text-5xl font-black tracking-tighter">84</span>
                                    <span className="text-[9px] opacity-40 uppercase tracking-widest mt-1">Mirror Score</span>
                                </div>
                             </div>
                             <p className="text-[10px] text-center opacity-40 tracking-wider">Top 12% in current demographic link.</p>
                        </div>
                        
                        <div className="glass-card p-8 flex-1">
                             <h4 className="text-[10px] tracking-[0.4em] uppercase opacity-40 mb-6 font-bold">Bundle Matches</h4>
                             <div className="space-y-6">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                                        <span>Prism Serum Pro</span>
                                        <span className="opacity-40 font-mono">$124</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-[92%] h-full bg-electric-blue" />
                                    </div>
                                    <span className="text-[9px] opacity-40 uppercase tracking-tighter">92% Match resonance</span>
                                </div>
                                <div className="space-y-2 pt-4">
                                    <div className="flex justify-between text-[11px] font-black uppercase tracking-tighter">
                                        <span>Neural Lip Tint</span>
                                        <span className="opacity-40 font-mono">$48</span>
                                    </div>
                                    <div className="w-full h-1 bg-white/5 rounded-full overflow-hidden">
                                        <div className="w-[85%] h-full bg-neon-purple" />
                                    </div>
                                    <span className="text-[9px] opacity-40 uppercase tracking-tighter">85% Alignment score</span>
                                </div>
                             </div>
                        </div>
                    </div>
               </div>
            </motion.div>
          )}

          {state === 'mood' && (
            <motion.div 
               key="mood"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="max-w-7xl mx-auto px-8 pb-24 space-y-12"
            >
                <div className="text-center space-y-4">
                    <h2 className="text-6xl font-bold font-display">Choose Aesthetic</h2>
                    <p className="text-white/50 text-lg max-w-2xl mx-auto">
                        How do you want the world to see you today? Select a core mood to initialize your identity synthesis.
                    </p>
                </div>
                <MoodSelector 
                    onSelect={(mood) => {
                        setSelectedMood(mood);
                        setState('transformation');
                    }} 
                    selected={selectedMood || undefined}
                />
            </motion.div>
          )}

          {state === 'studio' && userImage && (
            <motion.div 
                key="studio"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                className="max-w-[1440px] mx-auto px-10 pb-24"
            >
                <ARStudio image={userImage} onBack={() => setState('analysis')} onAction={showToast} />
            </motion.div>
          )}

          {state === 'transformation' && selectedMood && (
            <motion.div 
               key="transformation"
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="max-w-[1440px] mx-auto px-10 pb-24"
            >
               <AIFashionShow mood={selectedMood} onAction={showToast} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Toast Notification System */}
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-12 left-1/2 z-[100] px-6 py-3 glass-panel border-white/20 flex items-center gap-3 shadow-2xl"
          >
            <Bell className={cn("w-4 h-4", toast.type === 'success' ? "text-neon-green" : "text-electric-blue")} />
            <span className="text-xs font-bold uppercase tracking-widest">{toast.message}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer / Status Bar */}
      <footer className="fixed bottom-0 inset-x-0 h-10 glass-panel border-x-0 border-b-0 flex items-center px-8 z-50 text-[10px] uppercase tracking-[0.5em] text-white/20">
         <div className="flex gap-8">
            <span>MirrorMind v4.2.0</span>
            <span>Link: Established</span>
            <span className="text-electric-blue animate-pulse">Processing Core: Active</span>
         </div>
      </footer>
    </div>
  );
}
