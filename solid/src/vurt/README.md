# Vurt
goal: help redecentralize the internet.

tools: 
- webrtc 
- browser storage
- ipfs

end goal is to have a massive mesh network of peers that connect through a distributed hash table and share real-time data sync between each other, caching data in the browser and backing it up on ipfs.

first implementation:
- 0.5 - implement the MOST basic crypto auth system with tweetnacl
1. use PeerJS to handle webrtc connections and discovery
    - create a custom peer server that only serves the purpose of brokering connections between peers and maintaining a graph of the network
2. use webrtc data channels to stream data peer-to-peer, not yet worrying about network efficiency or how the graph should be drawn
3. use Dexie to save data to indexedDB in the browser, both so that it can be quickly accessed by the peer and streamed to other peers
4. use ipfs to save data to the distributed ipfs network, which also happens to give us a layer with eventual consistency and conflict resolution


improvements to be made:
- implement much better authentication. try to roll as little of my own crypto as possible
- optimize the network graph so that peers are more closely connected, ie through less hops
- rip out PeerJS in favor of simple-peer, and create a dht to broker connections (todo: research if this is even possible or how much time would be needed before trying to implement the dht)

## auth
A set of tools for decentralized identity management.

### usage
```
import { Auth } from 'vurt';

const { publicKey, secretKey } = await auth.createIdentity("alias");
```