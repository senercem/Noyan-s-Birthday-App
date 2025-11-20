import React, { useState } from 'react';
import { IMAGES, PLAYER_STATS } from '../constants';
import { ArrowRight, Shield, Zap, Heart } from 'lucide-react';

interface CharacterSelectProps {
  onSelect: (avatarUrl: string) => void;
}

const CharacterSelect: React.FC<CharacterSelectProps> = ({ onSelect }) => {
  const avatarUrl = IMAGES.LEVEL2;
  const [imgError, setImgError] = useState(false);

  return (
    <div className="h-full w-full bg-indigo-900 flex flex-col items-center relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" 
           style={{ backgroundImage: 'radial-gradient(#ffffff 2px, transparent 2px)', backgroundSize: '30px 30px' }}>
      </div>

      {/* Scrollable Content Area */}
      <div className="flex-1 w-full overflow-y-auto overflow-x-hidden flex flex-col items-center justify-center p-4 min-h-0">
        
        <h2 className="font-retro text-lg md:text-3xl text-yellow-400 mb-2 text-center drop-shadow-[2px_2px_0_rgba(0,0,0,0.5)] animate-pulse shrink-0">
          PLAYER PROFILE
        </h2>

        <div className="bg-slate-800 p-3 md:p-6 rounded-xl border-4 border-white shadow-[6px_6px_0_rgba(0,0,0,0.5)] max-w-xs md:max-w-md w-full relative z-10 flex flex-col items-center shrink-0">
          
          {/* Avatar Section - Made smaller for mobile */}
          <div className="flex flex-col items-center mb-2 md:mb-4">
            <div className="w-24 h-24 md:w-40 md:h-40 border-4 border-white shadow-lg bg-black overflow-hidden mb-2 relative group">
               {!imgError ? (
                 <img 
                   src={avatarUrl} 
                   alt="Noyan" 
                   className="w-full h-full object-cover" 
                   onError={() => setImgError(true)}
                 />
               ) : (
                 <div className="w-full h-full flex flex-col items-center justify-center bg-gray-900 text-gray-600 p-1">
                   <div className="w-8 h-8 bg-gray-800 rounded-full mb-1 animate-pulse"></div>
                   <span className="font-retro text-[8px] text-center leading-tight">IMG NOT<br/>FOUND</span>
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent pointer-events-none"></div>
            </div>
            <h3 className="font-retro text-base md:text-xl text-white text-center tracking-wider">NOYAN</h3>
            <div className="font-mono text-green-400 text-[10px] md:text-sm uppercase">Class: Birthday Boy</div>
          </div>
          
          {/* Stats Section - Compacted */}
          <div className="w-full space-y-2 font-mono text-xs md:text-sm bg-black/40 p-2 md:p-3 rounded border-2 border-slate-600">
            <div className="flex items-center justify-between text-blue-300">
              <span className="flex items-center gap-1"><Zap size={12} className="text-yellow-400" /> COOLNESS</span>
              <span className="text-yellow-400 font-bold">100</span>
            </div>
            <div className="w-full bg-gray-700 h-1 rounded-full">
              <div className="bg-yellow-400 h-full rounded-full w-full"></div>
            </div>

            <div className="flex items-center justify-between text-blue-300">
              <span className="flex items-center gap-1"><Heart size={12} className="text-red-500" /> KINDNESS</span>
              <span className="text-red-500 font-bold">100</span>
            </div>
            <div className="w-full bg-gray-700 h-1 rounded-full">
              <div className="bg-red-500 h-full rounded-full w-full"></div>
            </div>

            <div className="flex items-center justify-between text-green-300 pt-1 border-t border-gray-600 mt-1">
              <span className="flex items-center gap-1"><Shield size={12} /> LEVEL</span>
              <span className="text-green-400 font-bold">{PLAYER_STATS.age}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Footer / Button Area - Sticky or Fixed at bottom of flex container */}
      <div className="w-full p-4 pb-8 bg-indigo-900/90 backdrop-blur-sm z-20 shrink-0 flex justify-center border-t-2 border-indigo-800">
        <button 
          onClick={() => onSelect(avatarUrl)}
          className="w-full max-w-xs font-retro text-sm md:text-lg py-3 px-6 border-4 border-white bg-green-600 text-white hover:bg-green-500 flex items-center justify-center gap-2 shadow-[4px_4px_0_#000] active:translate-y-1 active:shadow-none transition-transform animate-[pulse_3s_infinite]"
        >
          START ADVENTURE <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
};

export default CharacterSelect;