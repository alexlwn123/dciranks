export interface Corps {
  id: string;
  name: string;
  location: string;
  division: 'World Class' | 'Open Class' | 'All Age';
  logo?: string;
  founded?: number;
  website?: string;
}

export interface Event {
  id: string;
  name: string;
  date: string;
  location: string;
  city: string;
  state: string;
  type: 'Regional' | 'Premier' | 'Championship' | 'Finals';
  isLive: boolean;
  competingCorps: string[];
}

export interface CaptionScore {
  music: number;
  visual: number;
  generalEffect: number;
}

export interface SubCaptionScore {
  musicBrass: number;
  musicAnalysis: number;
  visualPerformance: number;
  visualAnalysis: number;
  generalEffectMusic: number;
  generalEffectVisual: number;
}

export interface Performance {
  id: string;
  corpsId: string;
  eventId: string;
  date: string;
  overallScore: number;
  placement: number;
  captionScores: CaptionScore;
  subCaptionScores: SubCaptionScore;
  penalties: number;
  timestamp: string;
}

export interface ScoreFilter {
  corps?: string;
  event?: string;
  dateRange?: {
    start: string;
    end: string;
  };
  division?: string;
  location?: string;
}

export interface SeasonStats {
  corpsId: string;
  averageScore: number;
  highestScore: number;
  lowestScore: number;
  improvementRate: number;
  competitionsAttended: number;
  bestPlacement: number;
  currentRanking: number;
}