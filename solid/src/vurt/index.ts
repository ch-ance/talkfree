import auth, { Identity } from "./auth";
import * as IPFS from "ipfs";
class Vurt {
  ipfs: IPFS.IPFS;

  initIPFS() {
    return new Promise((resolve, reject) => {
      IPFS.create({
        repo: String(Math.random() + Date.now()),
        init: { algorithm: "Ed25519" },
      })
        .then((ipfs) => {
          this.ipfs = ipfs;
          resolve(ipfs);
        })
        .catch((err) => {
          reject(err);
        });
    });
  }

  createIdentity() {
    return auth.createIdentity();
  }

  //     this.ipfs
  //       .add(key)
  //       .then((addResult) => {
  //         resolve(addResult.path);
}

const vurt = new Vurt();
export default vurt;
