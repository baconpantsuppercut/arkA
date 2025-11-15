export type ArkASourceType =
  | "file"
  | "hls"
  | "dash"
  | "cmaf"
  | "ipfs"
  | "arweave"
  | "torrent";

export interface ArkACreator {
  id?: string;
  name: string;
  channel_url?: string;
  avatar_url?: string;
}

export interface ArkAThumbnail {
  url: string;
  width?: number;
  height?: number;
}

export interface ArkADrmInfo {
  type?: string;
  license_url?: string;
}

export interface ArkASource {
  type: ArkASourceType;
  label?: string;
  url?: string;
  manifest?: string;
  format?: string;
  codecs?: string[];
  bitrate_kbps?: number;
  resolution?: string;
  drm?: ArkADrmInfo;
  // room for extension fields
  [key: string]: unknown;
}

export interface ArkAFamilySafety {
  is_safe?: boolean;
  age_rating?: string;
  notes?: string;
}

export interface ArkAAccessibility {
  has_captions?: boolean;
  has_audio_description?: boolean;
}

export interface ArkAStats {
  view_count?: number;
  like_count?: number;
}

export interface ArkALicense {
  type?: string;
  url?: string;
}

export interface ArkAVideo {
  schema_version: string;
  id?: string;
  slug?: string;
  title: string;
  description?: string;
  creator: ArkACreator;
  duration_seconds: number;
  published_at?: string;
  updated_at?: string;
  tags?: string[];
  categories?: string[];
  languages?: {
    audio?: string[];
    subtitles?: string[];
  };
  thumbnails?: ArkAThumbnail[];
  sources: ArkASource[];
  family_safety?: ArkAFamilySafety;
  accessibility?: ArkAAccessibility;
  stats?: ArkAStats;
  license?: ArkALicense;
  extensions?: Record<string, unknown>;
}