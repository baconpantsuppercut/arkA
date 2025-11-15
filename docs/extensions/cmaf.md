# arkA Extension: CMAF Unified Segments (Draft)

## Purpose

CMAF (Common Media Application Format) allows HLS and DASH to share the **same underlying media segments**.  
This extension describes those segments at the metadata level so clients and tooling can reason about them.

Goal:

- allow a single encode pipeline to feed both HLS and DASH
- reduce storage duplication
- make future streaming extensions easier

This is a metadata hint only. It does not replace HLS or DASH manifests.

---

## How It Fits With HLS and DASH

- HLS and DASH manifests still exist and are referenced via `sources[]`.
- CMAF metadata describes the common segment set that both refer to.
- Tools can inspect CMAF metadata to:
  - validate manifest consistency
  - understand available resolutions/bitrates
  - reason about cache/storage planning

---

## CMAF Segment Descriptor

Embedded under a `cmaf` field at the video level:

```json
"cmaf": {
  "container": "fmp4",
  "segment_duration": 4,
  "tracks": [
    {
      "id": "v1",
      "type": "video",
      "codecs": "avc1.640028",
      "resolution": "1920x1080",
      "bitrate": 4000000
    },
    {
      "id": "a1",
      "type": "audio",
      "codecs": "mp4a.40.2",
      "language": "en",
      "bitrate": 128000
    }
  ]
}
```

### Fields

| Field                | Type    | Required | Description                      |
|----------------------|---------|----------|----------------------------------|
| `container`          | string  | yes      | Typically `"fmp4"`               |
| `segment_duration`   | number  | no       | Target segment length (seconds)  |
| `tracks[]`           | array   | yes      | List of audio/video tracks       |
| `tracks[].id`        | string  | yes      | Track identifier                 |
| `tracks[].type`      | string  | yes      | `"video"` or `"audio"`           |
| `tracks[].codecs`    | string  | yes      | Codec string                     |
| `tracks[].resolution`| string  | no       | `"widthxheight"` for video       |
| `tracks[].bitrate`   | number  | no       | Approximate bitrate (bps)        |
| `tracks[].language`  | string  | no       | ISO language code for audio      |

---

## Example arkA Video Object with CMAF + HLS + DASH

```json
{
  "title": "CMAF Unified Stream",
  "description": "HLS and DASH share the same CMAF segments.",
  "duration": 600,
  "sources": [
    {
      "type": "hls",
      "manifest": "https://cdn.example.com/media/cmaf/playlist.m3u8"
    },
    {
      "type": "dash",
      "manifest": "https://cdn.example.com/media/cmaf/manifest.mpd"
    }
  ],
  "cmaf": {
    "container": "fmp4",
    "segment_duration": 4,
    "tracks": [
      {
        "id": "v1",
        "type": "video",
        "codecs": "avc1.640028",
        "resolution": "1920x1080",
        "bitrate": 4000000
      },
      {
        "id": "a1",
        "type": "audio",
        "codecs": "mp4a.40.2",
        "language": "en",
        "bitrate": 128000
      }
    ]
  }
}
```

---

## Uses

- offline validators and tools
- CDN planning
- debugging mismatched manifests
- advanced clients that want to choose tracks more intelligently

---

**Status:** Draft  
**Version:** 0.1