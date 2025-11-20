# arkA MVP Client

This is the minimal reference client for the arkA protocol.  
It demonstrates how a client can read a CID and fetch a video from *any* IPFS gateway.

### Live Client
https://baconpantsuppercut.github.io/arkA/

### How it works
- User enters a CID or gateway URL
- Client constructs a normalized IPFS URL
- Video is streamed via IPFS gateway
- No backend, no authentication, no account needed

### Example CID (Phase-2 Announcement Video)

CID: `bafybeigxoxlscrc73aatxasygtxrjsjcwzlvts62gyr76ir5edk5fedq3q`