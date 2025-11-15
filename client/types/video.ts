export interface VideoSource {
  storageType: "s3" | "r2" | "ipfs" | "arweave" | "http" | "local";
  uri: string;
}

export interface StreamingInfo {
  hls?: string;
  dash?: string;
  cmaf?: string;
}

export interface CreatorInfo {
  name?: string;
  avatar?: string;
  contact?: string;
}

export interface SafetyMetadata {
  rating?: "G" | "PG" | "13+" | "18+";
  overstimulation?: "low" | "medium" | "high";
  sensoryNotes?: string;
}

export interface VideoMetadata {
  id: string;
  title: string;
  description?: string;
  thumbnail?: string;
  durationSeconds?: number;
  createdAt?: string;

  sources: VideoSource[];
  streaming?: StreamingInfo;
  creator?: CreatorInfo;
  safety?: SafetyMetadata;
}