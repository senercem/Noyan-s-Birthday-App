import React, { useEffect, useState } from 'react';
import { GAME_LEVELS } from '../constants';
import { ArrowRight, Star, ImageOff } from 'lucide-react';

interface GameLevelProps {
  levelIndex: number;
  totalLevels: number;
  onNext: () => void;
}

const GameLevel: React.FC<GameLevelProps> = ({ levelIndex, totalLevels, onNext }) => {
  const level = GAME_LEVELS[levelIndex];
  const [showText, setShowText] = useState(false);
  const [levelUpFlash, setLevelUpFlash] = useState(false);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    setShowText(false);
    setImgError(false);
    setLevelUpFlash(true);
    const timer = setTimeout(() => setShowText(true), 300);
    const flashTimer = setTimeout(() => setLevelUpFlash(false), 600);
    return () => {
      clearTimeout(timer);
      clearTimeout(flashTimer);
    };
  }, [levelIndex]);

  const progress = ((levelIndex + 1) / totalLevels) * 100;

  return (
    <div className={`h-full w-full ${level.backgroundTheme} relative flex flex-col overflow-hidden`}>
      
      {/* Background FX */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ backgroundImage: 'linear-gradient(45deg, #000 25%, transparent 25%, transparent 75%, #000 75%, #000)', backgroundSize: '20px 20px' }}>
      </div>

      {/* Header / HUD */}
      <div className="shrink-0 w-full flex justify-between items-center p-3 z-20 bg-black/40 border-b-4 border-white/20 backdrop-blur-sm">
        <div className="bg-blue-600 border-2 border-white px-2 py-1 rounded text-white font-retro text-[10px] md:text-sm shadow-[2px_2px_0_#000]">
           W 1-{levelIndex + 1}
        </div>
        
        <div className="flex-1 mx-4 max-w-xs">
          <div className="w-full h-3 md:h-4 bg-gray-900 border-2 border-white relative rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-green-500 to-green-300 transition-all duration-1000 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>

        <div className="flex gap-0.5">
           {[...Array(3)].map((_, i) => (
             <Star 
               key={i} 
               size={16}
               fill={i < 3 ? "#FBBF24" : "none"}
               className={`text-yellow-400 ${i < (levelIndex % 3) + 1 ? 'animate-spin-slow' : 'opacity-30'}`} 
             />
           ))}
        </div>
      </div>

      {/* Main Content - Flexible height */}
      <div className="flex-1 flex flex-col items-center justify-center p-4 w-full overflow-y-auto min-h-0">
        
        {/* Image Container - Flex shrink allowed to fit text */}
        <div className={`w-full max-w-lg transition-all duration-500 flex flex-col items-center shrink ${showText ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="bg-white p-1 md:p-2 shadow-[6px_6px_0_rgba(0,0,0,0.6)] border-4 border-white w-full">
            <div className="aspect-[4/3] md:aspect-video bg-black overflow-hidden border-2 border-gray-900 relative group flex items-center justify-center w-full">
               {!imgError ? (
                 <img 
                   src={level.imageUrl} 
                   alt={level.title} 
                   className="w-full h-full object-contain md:object-cover"
                   onError={() => setImgError(true)}
                 />
               ) : (
                 <div className="flex flex-col items-center text-gray-600 p-4 text-center">
                   <ImageOff size={32} className="mb-1 opacity-50" />
                   <span className="font-retro text-[10px]">IMG NOT FOUND:<br/>{level.imageUrl}</span>
                 </div>
               )}
               <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
            </div>
          </div>
          
          <div className="mt-2 md:mt-4 text-center">
            <span className="bg-black/80 text-yellow-400 font-retro text-xs md:text-base px-3 py-1 border-2 border-white inline-block shadow-[3px_3px_0_rgba(0,0,0,0.5)]">
              {level.title}
            </span>
          </div>
        </div>

        {/* Text Box - Fixed at bottom or below image */}
        <div className="w-full max-w-2xl mt-4 z-20 shrink-0">
          <div className="bg-blue-800 border-4 border-white p-3 md:p-5 shadow-[0_5px_10px_rgba(0,0,0,0.5)] rounded-xl flex flex-col md:flex-row items-center gap-3">
            <div className="flex-1 text-center md:text-left">
              <p className="font-mono text-white text-sm md:text-xl leading-relaxed">
                {showText ? level.caption : ''}
                {showText && <span className="animate-pulse inline-block w-2 h-4 bg-white ml-1 align-middle"></span>}
              </p>
            </div>
            
            <div className="shrink-0 w-full md:w-auto">
              <button 
                onClick={onNext}
                className="w-full md:w-auto flex items-center justify-center gap-2 font-retro text-xs md:text-sm bg-yellow-400 text-black px-4 py-3 md:py-2 hover:bg-white transition-colors border-b-4 border-yellow-700 active:border-b-0 active:translate-y-1 rounded"
              >
                NEXT LEVEL <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Flash Overlay */}
      {levelUpFlash && (
        <div className="absolute inset-0 bg-white z-50 animate-[fadeOut_0.5s_forwards] pointer-events-none mix-blend-overlay"></div>
      )}
    </div>
  );
};

export default GameLevel;