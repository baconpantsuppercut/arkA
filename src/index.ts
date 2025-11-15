/**
 * Core arkA types and minimal helpers.
 *
 * This is intentionally tiny for now.
 * The goal is to give contributors a clear extension point
 * and a real TypeScript build target.
 */

export type ArkaSourceType =
  | "file"
  | "hls"
  | "dash"
  | "hls_encrypted"
  | "dash_encrypted";

export interface ArkaSource {
  type: ArkaSourceType;
  url?: string; // for "file" sources
  manifest?: string; // for HLS/DASH sources
  format?: string; // e.g. mp4, webm, etc.
  // extension-specific metadata can live under ext.*
  ext?: Record<string, unknown>;
}

export interface ArkaVideoEntry {
  title: string;
  description?: string;
  duration?: number; // seconds
  sources: ArkaSource[];
  tags?: string[];
  family_safety?: {
    is_safe: boolean;
    notes?: string;
  };
  // room for future structured metadata (educational, kids, etc.)
  ext?: Record<string, unknown>;
}

/**
 * Basic validator stub – this will evolve over time.
 * For now, it's here so contributors see how to extend the model.
 */
export function validateArkaVideo(entry: ArkaVideoEntry): string[] {
  const errors: string[] = [];

  if (!entry.title || entry.title.trim().length === 0) {
    errors.push("title is required");
  }

  if (!entry.sources || entry.sources.length === 0) {
    errors.push("at least one source is required");
  }

  for (const [index, source] of entry.sources.entries()) {
    if (!source.type) {
      errors.push(`sources[${index}].type is required`);
    }
  }

  return errors;
}

/**
 * Simple factory to help examples and tests.
 */
export function createExampleVideo(): ArkaVideoEntry {
  return {
    title: "Example arkA Video",
    duration: 60,
    sources: [
      {
        type: "file",
        url: "https://example.com/video.mp4",
        format: "mp4"
      }
    ]
  };
}