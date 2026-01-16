export interface Message {
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export enum PageView {
  HOME = 'HOME',
  CHAT = 'CHAT',
  EXPLORE = 'EXPLORE',
  DASHBOARD = 'DASHBOARD',
  GALAXY_MAP = 'GALAXY_MAP'
}

export type Language = 'en' | 'vi';

export interface GalaxyFeature {
  id: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}

export interface SystemStat {
  label: string;
  value: number;
  color: string;
}

export interface Planet {
  id: string;
  name: string;
  type: string;
  distance: string;
  color: string;
  size: number;
  orbitSpeed: number;
  description: string;
}