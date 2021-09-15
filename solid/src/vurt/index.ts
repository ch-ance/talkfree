import auth, { Identity } from "./auth";
import { create, IPFS } from "ipfs";
class Vurt {
  ipfs: IPFS;
  constructor() {
    ipfs: create();
  }

  async createIdentity(alias: string): Promise<Identity> {
    const identity = await auth.createIdentity(alias);
    console.log(this.ipfs);
    return identity;
  }
}

const vurt = new Vurt();
export default vurt;
