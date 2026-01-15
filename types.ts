
export type LensMode = 'SKEPTIC' | 'BELIEVER';

export type ConsensusLevel = 'SKEPTIC_FAVORED' | 'AUTHENTIC_FAVORED' | 'NEUTRAL' | 'CONTESTED' | 'UNVERIFIED';

export type VerdictType = 'VERIFIED' | 'PLAUSIBLE' | 'DEBUNKED' | 'UNVERIFIED' | 'CONTESTED';

export interface TimelineEvent {
  id: string;
  year: number;
  displayDate: string;
  title: string;
  description: string;
  category: 'HISTORY' | 'SCIENCE' | 'THEOLOGY';
  consensus: ConsensusLevel;
  imageUrl?: string;
  details?: string;
  labId?: string;
  url?: string;
}

export interface LabModule {
  id: string;
  name: string;
  year: number;
  researcher: string;
  methodology: string;
  findings: string;
  lens: LensMode; // Which lens does this support primarily?
  url?: string;
}

export interface ViralClaim {
  id: string;
  title: string;
  origin: string;
  description: string;
  verdict: VerdictType;
  verdictText: string;
  url?: string;
  lens: LensMode; // The perspective that typically circulates this claim
}

export interface ArtifactHotspot {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  label: string;
  description: string;
  lens: LensMode | 'NEUTRAL';
}
