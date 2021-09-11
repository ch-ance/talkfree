import { IGunChainReference } from "gun/types/chain";
import { v4 as uuidv4 } from "uuid";
import { IChannel, IMessage } from "../types";
import state from "../state";
import Dexie from "dexie";

interface IDexie extends Dexie {
  indexes?: Dexie.Table;
}

class Messenger {
  db: IDexie;
  msgKeys: string[];
  constructor() {
    this.db = new Dexie("talkfree");
    this.db.version(1).stores({ indexes: "key" });
    this.msgKeys = [];
  }

  async send(msgText: string, channel: IChannel) {
    if (!msgText || !channel) return;
    const timestamp = Date.now();
    const message: IMessage = {
      from: state.pub,
      id: uuidv4(),
      text: msgText,
      timestamp,
      to: channel.id,
    };
    const messageKey = uuidv4();
    return new Promise((resolve, reject) => {
      state.user
        .get("chats")
        .get(channel.id)
        .get(messageKey)
        .put(message, (ack) => {
          console.log("ack from send", ack);
          try {
            if (ack.err) {
              reject(ack.err);
            }
            this.db.indexes
              ?.put({ user: state.pub, key: messageKey }, timestamp)
              .then((key) => {
                console.log("key", key);
                resolve(key);
              })
              .catch((err) => {
                reject(err);
              });
          } catch (err) {
            reject(err);
          }
        });
    });
  }

  /**
   *
   * @param channel the channel to get the messages from.
   * @param cb the callback to invoke on each message
   */
  async getAllMessages(channel: IChannel, cb: (msg: IMessage) => void) {
    let all = await this.db.indexes?.toCollection().toArray();
    console.log("all", all);
    console.log("all!.length", all!.length);
    all = all?.reverse();
    const receivedMessages: Promise<IMessage>[] = all!.map(
      async ({ user, key }, index) => {
        return new Promise((resolve, reject) => {
          state.public
            .user(user)
            .get("chats")
            .get(channel.id)
            .get(key)
            // @ts-ignore
            .once((msg: IMessage) => {
              if (!msg) reject("undefined message");
              if (this.msgKeys.includes(key)) {
                reject("key already included: " + key);
              }
              if (msg) {
                cb(msg);
                this.msgKeys.push(key);
                resolve(msg);
              }
            });
        });
      }
    );
    let promiseArray = receivedMessages;
    // why is there not a `Promise.some()` function in Javascript? Guess I'll implement my own...
    const someFinished = async (arr: Promise<any>[], count: number) => {
      let index = 0;
      return new Promise((resolve, reject) => {
        arr[index].then(() => {
          index++;
        });
        if (index === count - 1) {
          resolve(true);
        }
      });
    };
    return someFinished(promiseArray, 10);
  }

  /**
   * Subscribes to messages for each participant in a channel.
   *
   * @param channel the channel to get the messages from.
   * @param cb the callback to invoke on each message
   */

  subscribeToEachParticipant(channel: IChannel, cb: (msg: IMessage) => void) {
    return;
    state.user
      .get("chats")
      .get(channel.id)
      .map()
      .on((msg, key) => {
        if (!this.msgKeys.includes(key)) {
          console.log("subscribeToEachMsg", msg);
          cb(msg);
          this.msgKeys.push(key);
        }
      });
  }
}

export default new Messenger();
