import React from 'react';

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
  GALAXY_MAP = 'GALAXY_MAP',
  SETTINGS = 'SETTINGS',
  ARCHIVES = 'ARCHIVES',
  PROFILE = 'PROFILE',
  SIMULATION = 'SIMULATION',
  HANGAR = 'HANGAR'
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
  trend?: 'up' | 'down' | 'stable';
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

export interface LogEntry {
  id: string;
  timestamp: Date;
  level: 'info' | 'warning' | 'error' | 'success';
  message: string;
}

export interface ArchiveRecord {
  id: string;
  title: string;
  category: 'SPECIES' | 'TECH' | 'HISTORY' | 'ANOMALY';
  clearanceLevel: 1 | 2 | 3 | 4 | 5;
  content: string;
  date: string;
}

export interface AppSettings {
  soundEnabled: boolean;
  highPerformance: boolean; // Toggle animations
  notifications: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'warning' | 'error' | 'success';
}