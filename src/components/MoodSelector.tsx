import React, { useState } from 'react';
import { motion } from 'motion/react';
import { MOODS } from '@/src/constants';
import { AestheticMood } from '@/src/types';
import { cn } from '@/src/lib/utils';
import { ArrowRight } from 'lucide-react';

interface MoodSelectorProps {
  onSelect: (mood: AestheticMood) => void;
  selected?: AestheticMood;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ onSelect, selected }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
      {MOODS.map((mood) => (
        <motion.button
          key={mood.id}
          whileHover={{ y: -5 }}
          onClick={() => onSelect(mood.id)}
          className={cn(
            "relative group overflow-hidden h-[500px] transition-all duration-700 bg-luxury-charcoal",
            selected === mood.id ? "ring-1 ring-white/50" : "hover:ring-1 hover:ring-white/20"
          )}
        >
          <img 
            src={mood.image} 
            alt={mood.title} 
            className="absolute inset-0 w-full h-full object-cover transition-all duration-1000 grayscale group-hover:grayscale-0 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-black via-transparent to-transparent opacity-80" />
          
          <div className="absolute bottom-0 left-0 right-0 p-10 space-y-4">
            <span className="text-[9px] uppercase tracking-[0.4em] opacity-40 font-bold">Concept Module</span>
            <h3 className="text-4xl font-light tracking-tighter uppercase">{mood.title}</h3>
            <p className="text-[10px] tracking-widest text-white/40 uppercase leading-relaxed max-w-[200px]">{mood.description}</p>
            
            <div className="pt-8 border-t border-white/10 flex items-center justify-between opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0">
                <span className="text-[9px] uppercase tracking-[0.3em] font-black">Sync Aesthetics</span>
                <ArrowRight className="w-4 h-4" />
            </div>
          </div>
          
          {selected === mood.id && (
            <motion.div 
               layoutId="active-mood"
               className="absolute top-6 right-6 bg-white text-luxury-black p-3 rounded-full"
            >
               <ArrowRight className="w-4 h-4" />
            </motion.div>
          )}
        </motion.button>
      ))}
    </div>
  );
};
