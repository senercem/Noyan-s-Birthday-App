import React, { useState } from 'react';
import { BOSS_MAX_HP, DAMAGE_PER_CLICK } from '../constants';
import { Sparkles, Zap, Flame } from 'lucide-react';

interface BossFightProps {
  onVictory: () => void;
}

const BossFight: React.FC<BossFightProps> = ({ onVictory }) => {
  const [hp, setHp] = useState(BOSS_MAX_HP);
  const [isHit, setIsHit] = useState(false);
  const [floatingTexts, setFloatingTexts] = useState<{id: number, x: number, y: number, val: number}[]>([]);

  const handleHit = (e: React.MouseEvent | React.TouchEvent) => {
    let clientX, clientY;
    if ('touches' in e) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
    } else {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
    }

    const newHp = Math.max(0, hp - DAMAGE_PER_CLICK);
    setHp(newHp);
    setIsHit(true);
    
    const id = Date.now();
    const randomOffset = (Math.random() - 0.5) * 40;
    setFloatingTexts(prev => [...prev, { id, x: clientX + randomOffset, y: clientY - 20, val: DAMAGE_PER_CLICK }]);
    setTimeout(() => setFloatingTexts(prev => prev.filter(t => t.id !== id)), 800);
    setTimeout(() => setIsHit(false), 100);

    if (newHp <= 0) {
      setTimeout(onVictory, 500);
    }
  };

  return (
    <div className="h-full w-full bg-purple-950 flex flex-col items-center relative overflow-hidden select-none">
      
      {/* Boss Header */}
      <div className="w-full max-w-md p-4 z-20 mt-2 shrink-0">
        <div className="flex justify-between text-red-400 font-retro text-[10px] md:text-base mb-1 drop-shadow-md">
          <span>WARNING: BOSS BATTLE</span>
          <span>THE MEGA CAKE</span>
        </div>
        <div className="w-full h-6 bg-black border-4 border-white relative rounded-none shadow-[4px_4px_0_rgba(0,0,0,0.5)]">
          <div 
            className="h-full bg-gradient-to-r from-red-600 to-red-400 transition-all duration-200"
            style={{ width: `${(hp / BOSS_MAX_HP) * 100}%` }}
          ></div>
        </div>
        <div className="text-right font-mono text-[10px] text-red-300 mt-1">{hp}/{BOSS_MAX_HP} HP</div>
      </div>

      {/* Main Arena - Flex Grow */}
      <div className="flex-1 flex items-center justify-center w-full relative z-10 cursor-crosshair" onMouseDown={handleHit} onTouchStart={handleHit}>
        
        {/* The Boss (Cake) */}
        <div className={`transform transition-all duration-100 ${isHit ? 'scale-90 brightness-150 rotate-3' : 'scale-100 animate-bounce'}`}>
          <div className="text-[8rem] md:text-[12rem] filter drop-shadow-[0_0_20px_rgba(255,0,0,0.4)] leading-none select-none">
            🎂
          </div>
        </div>

        {/* Hit Effects */}
        {floatingTexts.map(txt => (
          <div 
            key={txt.id}
            className="absolute font-retro text-2xl text-yellow-300 font-bold pointer-events-none animate-[fadeOut_0.8s_forwards]"
            style={{ 
                left: txt.x, 
                top: txt.y, 
                textShadow: '2px 2px 0 #000',
                transform: 'translate(-50%, -50%)'
            }}
          >
            -{txt.val}
          </div>
        ))}
      </div>

      {/* Action Button Area - Sticky Bottom */}
      <div className="w-full bg-black/50 p-4 md:p-6 border-t-4 border-white/20 z-20 flex justify-center shrink-0">
        <button 
            onMouseDown={handleHit}
            onTouchStart={handleHit}
            className="w-full max-w-xs bg-red-600 hover:bg-red-500 text-white font-retro text-lg py-3 px-6 rounded border-4 border-white shadow-[0_6px_0_#7f1d1d] active:shadow-none active:translate-y-[6px] active:border-gray-300 transition-all flex items-center justify-center gap-2 animate-pulse"
        >
           <Flame className="w-6 h-6 text-yellow-300" />
           BLOW CANDLES!
           <Flame className="w-6 h-6 text-yellow-300" />
        </button>
      </div>

      {/* BG Particles */}
      <div className="absolute inset-0 z-0 opacity-40 pointer-events-none">
        {[...Array(15)].map((_, i) => (
             <Sparkles 
                key={i} 
                className="absolute text-yellow-500 animate-pulse"
                style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                    opacity: Math.random()
                }}
             />
        ))}
      </div>
    </div>
  );
};

export default BossFight;