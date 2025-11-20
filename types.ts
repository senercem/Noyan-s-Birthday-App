export enum GameState {
  START = 'START',
  CHARACTER_SELECT = 'CHARACTER_SELECT',
  LEVELS = 'LEVELS',
  BOSS_FIGHT = 'BOSS_FIGHT',
  VICTORY = 'VICTORY'
}

export interface LevelData {
  id: number;
  imageUrl: string;
  title: string;
  caption: string;
  backgroundTheme: string; // Tailwind class for bg color/gradient
}

export interface PlayerStats {
  cuteness: number;
  energy: number;
  age: string;
}