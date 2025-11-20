import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import { RefreshCw, ImageOff } from 'lucide-react';
import { IMAGES } from '../constants';

interface VictoryScreenProps {
  onRestart: () => void;
}

const VictoryScreen: React.FC<VictoryScreenProps> = ({ onRestart }) => {
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    // Initial big burst
    confetti({
      particleCount: 150,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#2563EB', '#16A34A', '#FBBF24', '#FFFFFF']
    });

    // Continuous fireworks
    const duration = 15 * 1000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    const randomInRange = (min: number, max: number) => Math.random() * (max - min) + min;

    const interval: any = setInterval(function() {
      const timeLeft = animationEnd - Date.now();

      if (timeLeft <= 0) {
        return clearInterval(interval);
      }

      const particleCount = 50 * (timeLeft / duration);
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
      confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
    }, 250);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full bg-indigo-900 flex flex-col items-center justify-center text-center relative overflow-hidden p-4 overflow-y-auto">
      <div className="z-10 space-y-8 bg-black/40 p-8 rounded-xl border-4 border-yellow-400 backdrop-blur-sm my-auto">
        
        <h1 className="font-retro text-4xl md:text-6xl text-transparent bg-clip-text bg-gradient-to-b from-yellow-300 to-yellow-600 drop-shadow-[4px_4px_0_#000] leading-tight">
          HAPPY<br/>BIRTHDAY<br/>NOYAN!
        </h1>
        
        <div className="w-48 h-48 mx-auto border-8 border-white shadow-2xl rotate-3 bg-white p-2 bg-gray-800 flex items-center justify-center">
             {!imgError ? (
                <img 
                  src={IMAGES.LEVEL4} 
                  alt="Birthday Boy" 
                  className="w-full h-full object-cover" 
                  onError={() => setImgError(true)}
                />
             ) : (
                <div className="text-gray-400 flex flex-col items-center">
                   <ImageOff size={32} />
                   <span className="text-[10px] font-mono mt-1">NO IMG</span>
                </div>
             )}
        </div>

        <div className="font-mono text-green-400 text-xl animate-bounce">
          LEVEL UP COMPLETE!
        </div>

        <button 
          onClick={onRestart}
          className="mt-8 font-retro text-sm bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded border-b-4 border-blue-800 active:border-b-0 active:translate-y-1 flex items-center gap-2 mx-auto"
        >
          <RefreshCw size={16} /> PLAY AGAIN
        </button>
      </div>
      
      {/* Background Rays */}
      <div className="absolute inset-0 animate-[spin_20s_linear_infinite] opacity-20 pointer-events-none" 
           style={{ 
               background: 'repeating-conic-gradient(from 0deg, #FBBF24 0deg 20deg, transparent 20deg 40deg)' 
           }}>
      </div>
    </div>
  );
};

export default VictoryScreen;