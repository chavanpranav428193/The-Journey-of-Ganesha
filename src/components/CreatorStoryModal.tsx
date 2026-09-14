import React from 'react';
import { X, Heart, Sparkles, BookOpen, ShieldCheck, Award, Compass, Globe } from 'lucide-react';
import { Character } from './Character';
import { soundService } from '../services/audioService';

interface CreatorStoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExploreChapters?: () => void;
}

export const CreatorStoryModal: React.FC<CreatorStoryModalProps> = ({
  isOpen,
  onClose,
  onExploreChapters
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fade-in overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-stone-900 via-[#180e07] to-[#120703] border-2 border-amber-500/50 rounded-3xl p-6 sm:p-8 shadow-2xl text-stone-100 max-h-[92vh] overflow-y-auto">
        {/* Close Button */}
        <button
          id="close-creator-story-modal-btn"
          onClick={() => {
            soundService.playClick();
            onClose();
          }}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-stone-800/80 hover:bg-stone-700 transition-colors"
          aria-label="Close Note"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Top Sacred Touch */}
        <div className="flex flex-col items-center text-center mb-6">
          <div className="p-2 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-300 mb-2">
            <Heart className="w-5 h-5 text-amber-400 fill-amber-400/30" />
          </div>
          <span className="text-[11px] uppercase tracking-widest font-bold text-amber-400 font-cinzel">
            A Creator's Dedication • Ganesh Chaturthi
          </span>
          <h3 className="text-2xl sm:text-3xl font-black font-cinzel text-amber-100 mt-1">
            Behind the Journey
          </h3>
          <p className="text-xs text-amber-200/80 italic font-serif mt-1">
            "Every pixel, melody, and question in this game was crafted with devotion and human care."
          </p>
        </div>

        {/* Handcrafted Story Body */}
        <div className="space-y-4 text-xs sm:text-sm text-stone-200 leading-relaxed font-sans">
          <div className="p-4 rounded-2xl bg-stone-950/70 border border-amber-500/25 space-y-2.5">
            <h4 className="font-bold text-amber-200 font-cinzel flex items-center gap-2 text-sm">
              <Compass className="w-4 h-4 text-amber-400" />
              <span>Why This Game Was Built</span>
            </h4>
            <p>
              Growing up with Ganesh Chaturthi, the festival was never just about celebration—it was about the smell of wet red clay, the rhythm of brass bells, families gathering to mould fresh modaks, and grandparents passing down stories under the warm glow of evening oil lamps.
            </p>
            <p>
              We built <em>The Journey of Ganesha</em> to preserve that warmth in a digital world. Rather than a cold arcade or generic quiz, we wanted every chapter to feel like walking through a lovingly curated living temple where mythology, virtue, and art come together.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block">
                ✦ Thoughtful Research
              </span>
              <p className="text-xs text-stone-300">
                Researched across Shiva Purana and regional Marathi traditions, carefully distinguishing centuries-old puranic lore from Lokmanya Tilak’s 1893 public movement.
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-amber-950/30 border border-amber-500/20 space-y-1.5">
              <span className="text-[10px] uppercase font-bold tracking-wider text-amber-400 font-cinzel block">
                ✦ Dedicated to Living Values
              </span>
              <p className="text-xs text-stone-300">
                Every mechanic—from placing clay modaks to choosing clay idols—reinforces practical character values: active listening, parent appreciation, and eco-conservation.
              </p>
            </div>
          </div>

          {/* Cultural Note */}
          <div className="p-4 rounded-2xl bg-emerald-950/25 border border-emerald-500/30 flex items-start gap-3">
            <Globe className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="text-xs text-stone-300 leading-relaxed">
              <strong className="text-emerald-300 font-cinzel">Open to All Traditions: </strong>
              Stories of Lord Ganesha vary richly across regions, languages, and families across India and the globe. This work represents one respectful, reverent retelling designed to inspire joy and curiosity in players of all ages.
            </div>
          </div>
        </div>

        {/* Footer Signature */}
        <div className="mt-6 pt-5 border-t border-amber-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-lg">
              🪔
            </div>
            <div className="text-left">
              <span className="text-xs font-bold text-amber-100 block font-cinzel">
                Crafted with Reverence
              </span>
              <span className="text-[11px] text-stone-400">
                Ganesh Chaturthi Learning Game Initiative
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => {
                soundService.playClick();
                onClose();
              }}
              className="flex-1 sm:flex-initial px-4 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-300 text-xs font-semibold transition-colors"
            >
              Close
            </button>
            {onExploreChapters && (
              <button
                id="creator-modal-explore-btn"
                onClick={() => {
                  soundService.playClick();
                  onClose();
                  onExploreChapters();
                }}
                className="flex-1 sm:flex-initial px-5 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md active:scale-95 transition-all"
              >
                Explore Chapters
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
