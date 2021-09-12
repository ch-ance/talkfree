import { IGunChainReference } from "gun/types/chain";
import { v4 as uuidv4 } from "uuid";
import { IChannel, IMessage } from "../types";
import state from "../state";
import Dexie from "dexie";

interface IDexie extends Dexie {
  indexes?: Dexie.Table;
}

export type GetAllMessagesOpts = {
  initialMsgCount?: number;
};

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

  /** Get all messages in a channel, performing a callback on each message.
   *
   * @param channel the channel to get the messages from
   * @param initialMsgCount number of messages to fetch before resolving
   * @param cb the callback to invoke on each message
   *
   * @returns an array containing the first `initialMsgCount` messages, and a promise to fetch the remaining messages from the given channel
   */
  async onEveryMessage(
    channel: IChannel,
    cb: (msg: IMessage) => void,
    { initialMsgCount }: GetAllMessagesOpts
  ): Promise<any> {
    let all = await this.db.indexes?.toCollection().toArray();
    console.log("all", all);
    console.log("all!.length", all!.length);
    all = all?.reverse();
    const receivedMsgPromises: Promise<any>[] = all!.map(
      async ({ user, key }, index) => {
        return new Promise((resolve, reject) => {
          state.public
            .user(user)
            .get("chats")
            .get(channel.id)
            .get(key)
            // @ts-ignore
            .on((msg: IMessage) => {
              if (!msg) reject("undefined message");
              if (this.msgKeys.includes(key)) {
                reject("key already included: " + key);
              }
              if (msg) console.log("msg received");
              cb(msg);
              this.msgKeys.push(key);
              resolve(true);
            });
        });
      }
    );
    initialMsgCount = initialMsgCount || receivedMsgPromises.length;
    // let initialMsgPromiseArr = receivedMsgPromises.slice(
    // 0,
    // initialMsgCount - 1
    // );
    // return Promise.all(initialMsgPromiseArr);
    return Promise.all([]);
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
