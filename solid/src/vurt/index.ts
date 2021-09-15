import auth, { Identity } from "./auth";
import IPFS from "ipfs-core";
class Vurt {
  ipfs: IPFS.IPFS;
  constructor() {
    ipfs: IPFS.create();
  }

  async createIdentity(alias: string): Promise<Identity> {
    const identity = await auth.createIdentity(alias);
    console.log(this.ipfs);
    return identity;
  }
}

const vurt = new Vurt();
export default vurt;
