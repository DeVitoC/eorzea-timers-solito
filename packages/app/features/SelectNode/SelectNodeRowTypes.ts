export interface Node {
  // General Props
  description: string;
  x: number;
  y: number;
  lvl: number;
  img: string;
  expac: number;
  location: string;
  stars: number;
  type: string;
  name: string;
  time?: number;
  // Fishing props
  duration?: number;
  source?: string;
  gathering?: number;
  desynthLvl?: number;
  desynthJob?: string;
  mooch?: boolean;
  moochFrom?: string[];
  isWeatherChain?: boolean;
  weatherChain?: string[];
  weather?: string[];
  waterType?: string;
}
