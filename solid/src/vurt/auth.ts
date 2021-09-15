import * as nacl from "tweetnacl";
import * as util from "tweetnacl-util";

export interface Identity {
  publicKey: string;
  secretKey: string;
  cid: string;
}

const auth = {
  /**
   * @param alias a string to be stored next to the user's public key so other's can more easily identify them once they are connected. Aliases do not have to be unique because they are simply used as a display name.
   */
  createIdentity: async (alias: string): Promise<Identity> => {
    // create a keypair
    const keypair = nacl.box.keyPair();
    const publicKey = util.encodeBase64(keypair.publicKey);
    const secretKey = util.encodeBase64(keypair.secretKey);

    return new Promise(async (resolve, reject) => {
      try {
        // publish our public key and alias to IPFS
        const cid = await sendToIpfs({ alias, publicKey });
        const identity: Identity = {
          publicKey,
          secretKey,
          cid: "string",
        };
        resolve(identity);
      } catch (err) {
        reject(err);
      }
    });
  },
};

async function sendToIpfs(data: any) {
  return new Promise(async (resolve, reject) => {
    resolve("asdr");
  });
}

export default auth;

/*
 ** You'll need to generate a key pair for your users e.g.
 ** const keypair = nacl.box.keyPair()
 ** const receiverPublicKey = util.encodeBase64(keypair.publicKey)
 ** const receiverSecretKey = util.encodeBase64(keypair.secretKey)
 **
 */

/* encrypted message interface */
interface IEncryptedMsg {
  ciphertext: string;
  ephemPubKey: string;
  nonce: string;
  version: string;
}
/* This function encrypts a message using a base64 encoded
 ** publicKey such that only the corresponding secretKey will
 ** be able to decrypt
 */
function encrypt(receiverPublicKey: string, msgParams: string) {
  const ephemeralKeyPair = nacl.box.keyPair();
  const pubKeyUInt8Array = util.decodeBase64(receiverPublicKey);
  const msgParamsUInt8Array = util.decodeUTF8(msgParams);
  const nonce = nacl.randomBytes(nacl.box.nonceLength);
  const encryptedMessage = nacl.box(
    msgParamsUInt8Array,
    nonce,
    pubKeyUInt8Array,
    ephemeralKeyPair.secretKey
  );
  return {
    ciphertext: util.encodeBase64(encryptedMessage),
    ephemPubKey: util.encodeBase64(ephemeralKeyPair.publicKey),
    nonce: util.encodeBase64(nonce),
    version: "x25519-xsalsa20-poly1305",
  };
}
/* Decrypt a message with a base64 encoded secretKey (privateKey) */
function decrypt(receiverSecretKey: string, encryptedData: IEncryptedMsg) {
  const receiverSecretKeyUint8Array = util.decodeBase64(receiverSecretKey);
  const nonce = util.decodeBase64(encryptedData.nonce);
  const ciphertext = util.decodeBase64(encryptedData.ciphertext);
  const ephemPubKey = util.decodeBase64(encryptedData.ephemPubKey);
  const decryptedMessage = nacl.box.open(
    ciphertext,
    nonce,
    ephemPubKey,
    receiverSecretKeyUint8Array
  );
  return util.encodeUTF8(decryptedMessage);
}
