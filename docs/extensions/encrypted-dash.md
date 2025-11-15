# arkA Extension: Encrypted MPEG-DASH (Draft)

## Purpose

This extension defines how arkA can reference **encrypted MPEG-DASH** (`.mpd`) streams.

Use cases:

- paywalled educational libraries
- region-locked lessons
- restricted professional content
- enterprise or institutional deployments

As with encrypted HLS, arkA only describes the metadata. It does not define how DRM vendors or license servers work.

---

## Relationship to the DASH Extension

- The base DASH extension uses `type: "dash"` with a `manifest` URL.
- This extension introduces `type: "dash_encrypted"` and a `drm` object.
- Clients that cannot handle encryption fall back to other sources.

---

## Encrypted DASH Source Format

```json
{
  "type": "dash_encrypted",
  "manifest": "https://cdn.example.com/video/manifest.mpd",
  "drm": {
    "system": "widevine",        // or "playready", "custom"
    "license_url": "https://license.example.com/wv",
    "key_rotation": true,
    "policy": "institution-only"
  }
}
```

### Fields

| Field              | Type    | Required | Description                                  |
|--------------------|---------|----------|----------------------------------------------|
| `type`             | string  | yes      | `"dash_encrypted"`                           |
| `manifest`         | string  | yes      | URL to `.mpd`                                |
| `drm.system`       | string  | yes      | `"widevine"`, `"playready"`, `"custom"`      |
| `drm.license_url`  | string  | yes      | License server URL                           |
| `drm.key_rotation` | bool    | no       | Whether keys rotate                          |
| `drm.policy`       | string  | no       | Free-form policy label                       |

---

## Example arkA Video Object with Encrypted DASH

```json
{
  "title": "Clinical Training Module",
  "description": "Restricted to verified institutions.",
  "duration": 1200,
  "sources": [
    {
      "type": "dash_encrypted",
      "manifest": "https://cdn.example.com/clinical/module1/manifest.mpd",
      "drm": {
        "system": "widevine",
        "license_url": "https://license.example.com/wv/clinical",
        "key_rotation": true,
        "policy": "institution-only"
      }
    },
    {
      "type": "file",
      "url": "https://cdn.example.com/clinical/module1/backup.mp4",
      "format": "mp4"
    }
  ]
}
```

---

## Client Behaviour

Clients that support `dash_encrypted` should:

- parse the `.mpd` manifest
- recognize the `drm.system`
- attempt key acquisition via `license_url`
- respect local access-control rules and policies

Clients that do not support it must:

- fall back to another playable source, or
- clearly indicate that the content is protected

---

## Scope

Out of scope:

- DRM integration details
- entitlement and account systems
- offline license storage
- multi-DRM negotiation

Those concerns live outside arkA and integrate at the client or service level.

---

**Status:** Draft  
**Version:** 0.1