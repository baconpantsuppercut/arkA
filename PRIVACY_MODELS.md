# Privacy Models in arkA

arkA is designed to be flexible — from fully open content to gated or encrypted access.

## 1. Public/Open Access
- JSON and media are public
- Anyone can fetch and view
- Best for decentralized ecosystems

---

## 2. Token-Based Access (Recommended Optional Extension)
Media URLs can use:
- Pre-signed URLs (AWS-style)
- Expiring tokens (JWT or similar)
- Capability URLs (long unguessable URLs)

The index JSON may remain public while actual media requires a token.

---

## 3. Encrypted References
For privacy-first implementations:
- Media encrypted at rest  
- Decryption keys exchanged out-of-band  
- JSON contains encrypted metadata  

This model aligns with decentralized or privacy community needs.

---

## 4. Hybrid Models
- Public index  
- Private playlists  
- Private unlisted videos  
- Selective expiration windows  

arkA intentionally avoids prescribing one model — the protocol defines *how clients understand the data*, not how access is controlled.