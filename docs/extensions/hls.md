# arkA Extension: HLS Streaming Support (Draft)

## Purpose
This extension defines how creators can publish **HLS (HTTP Live Streaming)** versions of their videos inside an arkA index.  
It is optional — clients may choose whether or not to support it.

The goal is to support:
- adaptive bitrate  
- faster startup  
- better performance on unstable networks  
- CDN-friendly streaming  

…without forcing every creator to transcode or segment their videos.

---

## How It Works

arkA’s base video metadata allows multiple `sources`.  
This extension adds a new source type:

```json
{
  "type": "hls",
  "manifest": "https://example.com/video/playlist.m3u8",
  "bitrates": ["1080p", "720p", "480p"],
  "codecs": ["h264", "aac"]
}
```

Clients that support HLS:
- detect `"type": "hls"`  
- load the `.m3u8` manifest  
- ignore direct MP4/WebM streams if HLS is available

Clients that *do not* support HLS:
- fall back to the next available source  
  (example: MP4/WebM direct file)

---

## Example arkA Video Object (with HLS)

```json
{
  "title": "Example Video",
  "description": "A sample showing HLS support.",
  "duration": 125,
  "sources": [
    {
      "type": "hls",
      "manifest": "https://cdn.example.com/video/playlist.m3u8",
      "bitrates": ["1080p", "720p", "480p"],
      "codecs": ["h264", "aac"]
    },
    {
      "type": "file",
      "url": "https://cdn.example.com/video/video-1080p.mp4",
      "format": "mp4"
    }
  ]
}
```

---

## Publishing Requirements

To publish an HLS-enabled video, creators need:

- a transcoder capable of generating segmented `.ts` files  
- a `.m3u8` manifest referencing those segments  
- publicly accessible URLs (or IPFS gateways)

No blockchain, no crypto — just file paths.

---

## Client Requirements

A client claiming HLS support SHOULD:
- parse `.m3u8`  
- handle multiple variant playlists  
- support adaptive bitrate switching  
- gracefully fall back if a manifest fails  

Web clients often rely on:
- *hls.js* for browsers without native support  
- native HLS support in Safari / iOS

---

## Why It's an Extension and Not Core

Making HLS optional keeps the protocol:
- simple  
- transparent  
- creator-friendly  
- compatible with any storage (IPFS, Arweave, S3, static)  

But still allows anyone to build:
- high-performance streaming  
- pro-grade video players  
- robust CDN applications  

---

## Future Extensions

Possible follow-ups:

- **DASH extension**  
- **LL-HLS (low-latency HLS)**  
- **Encrypted HLS for parental-control modes**  
- **Auto-indexing manifest segments**  

---

**Status:** Draft for discussion  
**Version:** 0.1  