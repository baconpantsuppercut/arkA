# arkA — The Open Video Protocol

arkA is an open, community-driven protocol for publishing, discovering, and viewing video content without centralized control, censorship, or platform lock-in.

arkA is **not a platform**.  
arkA is **not a startup**.  
arkA is an **open protocol** that anyone can build on.

The goals of arkA:

- Free expression without corporate gatekeeping  
- Creator ownership of content, identity, audience, and revenue  
- Open clients (web, mobile, accessible/special-needs-friendly)  
- Decentralized storage support (IPFS, Arweave, S3, R2, local, etc.)  
- A universal, open metadata and indexing schema  
- Optional safety layers, including arkA Kids (guided & neurodiverse-friendly)  
- Exploratory hardware for safe, controlled digital environments for children  
- A protocol no single entity can capture  

arkA begins as documentation and evolves through contributors.

---

## Project Status: Phase 0

arkA is currently defining the foundations:

- The Manifesto  
- The MVP  
- The Video JSON schema  
- The Index format  
- Architecture drafts  
- First reference clients  
- Tooling, validators, and test vectors  

The project is open to contributors at **all skill levels**.

---

## Key Documents

- **Manifesto** — `docs/manifesto.md`  
- **Roadmap** — `docs/roadmap.md`  
- **MVP** — `docs/mvp.md`  
- **Architecture Overview** — *(coming soon)*  
- **Protocol Specification** — `protocol/README.md`  

---

## Repository Structure

```
arkA/
├── docs/             # Vision, roadmap, planning, long-form documentation
├── protocol/         # Schemas, examples, and open formats
│   ├── schema/       # Core JSON schema definitions
│   ├── examples/     # Example metadata files
│   └── extensions/   # HLS, DASH, CMAF, and future extensions
├── frontend/         # Reference clients
│   ├── arka-play/    # General-purpose web client (MVP)
│   └── arka-kids/    # Child-friendly & neurodiverse-friendly client
├── backend/          # Optional future backend services (not required)
├── community/        # Community docs, outreach, and contributor guides
├── governance/       # Decision-making, proposals, contribution standards
└── hardware/         # Exploratory device concepts
```

---

## How to Contribute

1. Read the Manifesto (`docs/manifesto.md`)  
2. Explore open Discussions:  
   https://github.com/baconpantsuppercut/arkA/discussions  
3. Check Issues:  
   https://github.com/baconpantsuppercut/arkA/issues  
4. Propose ideas, refine schemas, write docs, or build example clients  
5. Join architecture discussions and help shape the protocol  

Technical and non-technical contributions are welcome:

- Developers  
- Designers  
- Writers  
- Educators  
- Parents  
- Researchers  

Everyone can help shape the early stages.

---

## Development

arkA uses a minimal TypeScript setup at this stage.

### Install

```bash
npm install
```

### Build

```bash
npm run build
```

---

## Status & Project Badges

[![Build Reference Client](https://github.com/baconpantsuppercut/arkA/actions/workflows/build.yml/badge.svg)](https://github.com/baconpantsuppercut/arkA/actions)
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)
![Status: Phase 0](https://img.shields.io/badge/Status-Phase%200-yellow.svg)
![Discussions: Open](https://img.shields.io/badge/Discussions-Open-green.svg)

---

## License

See `LICENSE`.

arkA is fully open-source and may be forked, remixed, or extended under the license terms.

---

## Vision Statement

arkA exists to restore digital sovereignty to creators and to build a healthier future for video — from open creators to children on both sides of the neurological spectrum.  