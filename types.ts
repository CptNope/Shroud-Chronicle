
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
  paperRefs?: number[]; // References to STURP_PAPERS by id
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
  paperRefs?: number[]; // References to STURP_PAPERS by id
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
  paperRefs?: number[]; // References to STURP_PAPERS by id
}

export interface ArtifactHotspot {
  id: string;
  x: number; // Percentage from left
  y: number; // Percentage from top
  label: string;
  description: string;
  lens: LensMode | 'NEUTRAL';
}

export interface STURPPaper {
  id: number;
  authors: string;
  title: string;
  publication: string;
  year: number;
  pdfUrl?: string;
  abstractUrl?: string;
  category: 'REFEREED' | 'OTHER' | 'FOLLOW_UP' | 'UNPUBLISHED' | 'PROCEEDINGS';
  notes?: string;
}

export interface STURPConclusion {
  id: string;
  finding: string;
  category: 'NEGATIVE' | 'POSITIVE' | 'MYSTERY';
  details?: string;
}

export interface STURPOfficialSummary {
  releaseDate: string;
  author: string;
  url: string;
  fullText: string;
  keyFindings: STURPConclusion[];
}

export interface STURPMember {
  name: string;
  affiliation: string;
  role?: string;
  inTurin1978: boolean;
  wikiUrl?: string;
}

export interface STURPHistory {
  foundingYear: number;
  firstMeetingDate: string;
  firstMeetingLocation: string;
  examinationDate: string;
  examinationDuration: string;
  equipmentValue: string;
  finalReportYear: number;
  totalVisitors: string;
  wikiUrl: string;
}
