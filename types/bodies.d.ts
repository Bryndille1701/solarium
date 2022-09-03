export type BodyRes = {
  id: string;
  name: string;
  englishName: string;
  isPlanet: boolean;
  moons?: MoonRel[];
  semimajorAxis: number;
  perihelion: number;
  aphelion: number;
  eccentricity: number;
  inclinaison: number;
  mass: BodyMass;
  vol: BodyVol;
  density: number;
  gravity: number;
  escape: number;
  meanRadius: number;
  equaRadius: number;
  polarRadius: number;
  flattening: number;
  dimension: string;
  sideralOrbit: number;
  sideralRotation: number;
  aroundPlanet?: PlanetRel;
  discoveredBy?: string;
  discoveryDate?: string;
  alternativeName?: string;
  axialTilt: number;
  avgTemp: number;
  mainAnomaly: number;
  argPeriapsis: number;
  longAscNode: number;
  bodyType: 'Planet' | 'Moon';
};

export interface Body extends BodyRes {
  moons?: Body[];
  color?: string;
}

export type MoonRel = {
  moon: string;
  rel: string;
};

export type PlanetRel = {
  planet: string;
  rel: string;
};

export type BodyMass = {
  massValue: number;
  massExponent: number;
};

export type BodyVol = {
  volValue: number;
  volExponent: number;
};

declare module 'bbs-bodies';
