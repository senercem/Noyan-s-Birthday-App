import { LevelData, PlayerStats } from './types';

// Mapping based on the order of uploaded images
// These paths assume the images are in the same directory as the index.html
export const IMAGES = {
  LEVEL1: 'level1.jpg', // The Training Ground
  LEVEL2: 'level2.jpg', // The Blue Jacket Quest (Avatar)
  LEVEL3: 'level3.jpg', // Stadium Showdown
  LEVEL4: 'level4.jpg', // Hero's Smile
  LEVEL5: 'level5.jpg', // The Guardian Grandma
  LEVEL6: 'level6.jpg', // Fuel Station Mission
};

export const PLAYER_STATS: PlayerStats = {
  cuteness: 100, // "Coolness" in UI, reusing type
  energy: 100,   // "Kindness" in UI, reusing type
  age: "BIRTHDAY",
};

export const GAME_LEVELS: LevelData[] = [
  {
    id: 1,
    imageUrl: IMAGES.LEVEL1,
    title: 'Stage 1',
    caption: 'The Training Ground',
    backgroundTheme: 'bg-slate-900',
  },
  {
    id: 2,
    imageUrl: IMAGES.LEVEL2,
    title: 'Stage 2',
    caption: 'The Blue Jacket Quest',
    backgroundTheme: 'bg-blue-950',
  },
  {
    id: 3,
    imageUrl: IMAGES.LEVEL3,
    title: 'Stage 3',
    caption: 'Stadium Showdown',
    backgroundTheme: 'bg-yellow-900',
  },
  {
    id: 4,
    imageUrl: IMAGES.LEVEL4,
    title: 'Stage 4',
    caption: "Hero's Smile",
    backgroundTheme: 'bg-indigo-950',
  },
  {
    id: 5,
    imageUrl: IMAGES.LEVEL5,
    title: 'Stage 5',
    caption: 'The Guardian Grandma',
    backgroundTheme: 'bg-emerald-900',
  },
  {
    id: 6,
    imageUrl: IMAGES.LEVEL6,
    title: 'Stage 6',
    caption: 'Fuel Station Mission',
    backgroundTheme: 'bg-red-950',
  },
];

export const BOSS_MAX_HP = 100;
export const DAMAGE_PER_CLICK = 4;