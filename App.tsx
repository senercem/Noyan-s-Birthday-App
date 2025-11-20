import React, { useState } from 'react';
import { GameState, LevelData } from './types';
import { GAME_LEVELS } from './constants';
import StartScreen from './components/StartScreen';
import CharacterSelect from './components/CharacterSelect';
import GameLevel from './components/GameLevel';
import BossFight from './components/BossFight';
import VictoryScreen from './components/VictoryScreen';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentLevelIndex, setCurrentLevelIndex] = useState(0);
  const [, setSelectedAvatar] = useState<string>('');

  const handleStart = () => {
    setGameState(GameState.CHARACTER_SELECT);
  };

  const handleCharacterSelect = (avatarUrl: string) => {
    setSelectedAvatar(avatarUrl);
    setGameState(GameState.LEVELS);
    setCurrentLevelIndex(0);
  };

  const handleNextLevel = () => {
    if (currentLevelIndex < GAME_LEVELS.length - 1) {
      setCurrentLevelIndex(prev => prev + 1);
    } else {
      setGameState(GameState.BOSS_FIGHT);
    }
  };

  const handleVictory = () => {
    setGameState(GameState.VICTORY);
  };

  const handleRestart = () => {
    setGameState(GameState.START);
    setCurrentLevelIndex(0);
    setSelectedAvatar('');
  };

  return (
    <div className="min-h-screen w-full bg-neutral-900 flex items-center justify-center p-0 md:p-8">
      {/* Device Container - Full screen on mobile, Aspect Ratio on Desktop */}
      <div className="relative w-full h-[100dvh] md:h-auto md:aspect-[16/9] md:max-w-5xl bg-black md:rounded-xl shadow-2xl overflow-hidden md:border-8 md:border-neutral-800 md:ring-4 md:ring-neutral-900 flex flex-col">
        
        {/* Screen Content */}
        <div className="absolute inset-0 scanlines z-50 pointer-events-none"></div>
        
        <div className="w-full h-full relative bg-gray-800 flex-1 overflow-hidden">
          {gameState === GameState.START && (
            <StartScreen onStart={handleStart} />
          )}
          
          {gameState === GameState.CHARACTER_SELECT && (
            <CharacterSelect onSelect={handleCharacterSelect} />
          )}
          
          {gameState === GameState.LEVELS && (
            <GameLevel 
              levelIndex={currentLevelIndex} 
              totalLevels={GAME_LEVELS.length} 
              onNext={handleNextLevel} 
            />
          )}
          
          {gameState === GameState.BOSS_FIGHT && (
            <BossFight onVictory={handleVictory} />
          )}
          
          {gameState === GameState.VICTORY && (
            <VictoryScreen onRestart={handleRestart} />
          )}
        </div>

        {/* Decorative UI elements mimicking a handheld console (Hidden on mobile to save space) */}
        <div className="absolute top-4 left-4 text-[10px] text-white/30 font-mono z-50 hidden md:block">BATTERY: 100%</div>
        <div className="absolute bottom-4 right-4 text-[10px] text-white/30 font-mono z-50 hidden md:block">SOUND: ON</div>
      </div>
    </div>
  );
};

export default App;