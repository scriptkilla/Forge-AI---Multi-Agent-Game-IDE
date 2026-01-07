
export type AgentRole = 
  | 'ceo' 
  | 'design' 
  | 'art' 
  | 'dev' 
  | 'qa' 
  | 'narrative' 
  | 'level' 
  | 'character' 
  | 'economy'
  | 'asset_gen'
  | 'animator'
  | 'ui_ux'
  | 'composer'
  | 'particle'
  | 'technical'
  | 'code_gen'
  | 'debugger'
  | 'optimizer'
  | 'shader'
  | 'ai_behavior'
  | 'tester'
  | 'security'
  | 'network'
  | 'database';

export type GameTheme = 'sci-fi' | 'fantasy' | 'horror' | 'retro' | 'cyberpunk' | 'vaporwave' | 'minimalist' | 'default';

export type GamePerspective = '2d-side' | '2d-top' | '3d-open';

export interface Agent {
  id: AgentRole;
  name: string;
  color: string;
  icon: any; // Lucide component
  description: string;
}

export interface Message {
  id: string;
  agentId: AgentRole;
  text: string;
  timestamp: number;
  status?: 'typing' | 'complete';
}

export interface Asset {
  id: string;
  name: string;
  category: 'sprite' | 'sound' | 'music' | 'ui';
  type: string;
  author: string;
  thumbnail: string;
  data?: string; // base64 payload for custom assets
}

export interface ReferenceImage {
  data: string; // base64
  mimeType: string;
}

export interface GameProject {
  prompt: string;
  status: 'idle' | 'discussing' | 'developing' | 'testing' | 'ready';
  code: string;
  designDocs: string;
  theme: GameTheme;
  perspective: GamePerspective;
  assets: Asset[];
  referenceImage?: ReferenceImage;
}
