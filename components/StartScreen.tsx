import React from 'react';
import { Gamepad2 } from 'lucide-react';

interface StartScreenProps {
  onStart: () => void;
}

const StartScreen: React.FC<StartScreenProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full bg-black text-center space-y-12 relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" 
           style={{ 
             backgroundImage: 'linear-gradient(#2563EB 1px, transparent 1px), linear-gradient(90deg, #2563EB 1px, transparent 1px)', 
             backgroundSize: '40px 40px',
             transform: 'perspective(500px) rotateX(60deg) translateY(-100px) scale(2)'
           }}>
      </div>

      <div className="z-10 animate-bounce">
        <h1 className="font-retro text-4xl md:text-6xl text-yellow-400 drop-shadow-[4px_4px_0_#b45309] mb-4">
          SUPER
          <br />
          NOYAN BROS
        </h1>
        <p className="font-retro text-xs text-blue-300 tracking-widest">THE LEGEND OF THE BIRTHDAY BOY</p>
      </div>

      <div className="z-10">
        <button 
          onClick={onStart}
          className="font-retro text-xl md:text-2xl text-white animate-pulse hover:text-yellow-400 transition-colors flex items-center gap-3"
        >
          <Gamepad2 className="w-8 h-8" />
          PRESS START
        </button>
      </div>
      
      <div className="absolute bottom-4 text-gray-500 text-xs font-mono">
        © 2025 NOYAN GAMES LTD.
      </div>
    </div>
  );
};

export default StartScreen;