import * as nacl from "tweetnacl";
import * as util from "tweetnacl-util";

export interface Identity {
  public: {
    alias: string;
    encPublicKey: string;
    verifyKey: string;
  };
  secret: {
    encSecretKey: string;
    signerKey: string;
  };
}

import * as IPFS from "ipfs";
import Peer from "peerjs";
class Vurt {
  ipfs: IPFS.IPFS;
  identity: Identity;
  peer: Peer;
  init() {
    const ipfsPromise = new Promise((resolve, reject) => {
      IPFS.create({
        repo: String(Math.random() + Date.now()),
        init: { algorithm: "Ed25519" },
      })
        .then((ipfs) => {
          this.ipfs = ipfs;
          resolve(ipfs);
        })
        .catch((err) => {
          console.error("error!");
          reject(err);
        });
    });
    const peerPromise = new Promise((resolve, reject) => {
      const peer = new Peer();
      peer.on("open", (_id) => {
        this.peer = peer;
        resolve(peer);
      });
      peer.on("error", (err) => {
        reject(err);
      });
    });

    return Promise.all([ipfsPromise, peerPromise]);
  }

  setIdentity(identity: Identity) {
    this.identity = identity;
  }

  createIdentity(alias: string) {
    console.log("got  here");
    const encryptionKeyPair = nacl.box.keyPair();
    const encPublicKey = util.encodeBase64(encryptionKeyPair.publicKey);
    const encSecretKey = util.encodeBase64(encryptionKeyPair.secretKey);
    const signKeyPair = nacl.sign.keyPair();
    const verifyKey = util.encodeBase64(signKeyPair.publicKey);
    const signerKey = util.encodeBase64(signKeyPair.secretKey);
    // publish our public key and alias to IPFS
    const identity: Identity = {
      public: {
        alias,
        encPublicKey,
        verifyKey,
      },
      secret: {
        encSecretKey,
        signerKey,
      },
    };
    this.identity = identity;
    console.log("this.identity", this.identity);
    return identity;
  }

  /**
   * Prove ownership of a private key and attach it to any data.
   *
   * @param data what you want to sign
   * @returns an object with the data you want signed along with a signature of the data
   */
  sign(data: any) {
    console.log(this.identity);
    const msg = util.decodeUTF8(String(data));
    const key = util.decodeBase64(this.identity.secret.signerKey);
    const signature = nacl.sign(msg, key);
    return signature;
  }

  verify(unsignedData: any, signedData: string, publicSigningKey: string) {
    const unsigned = util.decodeBase64(unsignedData);
    const signed = util.decodeBase64(signedData);
    const pub = util.decodeBase64(publicSigningKey);
    return nacl.sign.detached.verify(unsigned, signed, pub);
  }
}

const vurt = new Vurt();
export default vurt;
