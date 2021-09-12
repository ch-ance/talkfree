import Gun from "gun";
import "gun/sea";
import { IGunChainReference } from "gun/types/chain";
import { IGunConstructorOptions } from "gun/types/options";

class State {
  public: IGunChainReference;
  local: IGunChainReference;
  pub: string;
  user: IGunChainReference<Record<string, any>, any, false>;
  constructor(opts: IGunConstructorOptions) {
    this.public = Gun(opts).get("331112r12f12f12f12f");
    this.local = Gun({ peers: [] }).get("state");
    this.pub = localStorage.getItem("talkfreePubKey") || "";
    this.user = this.public.user().recall({ sessionStorage: true });
  }
}

const state = new State({
  peers: ["https://stark-badlands-20144.herokuapp.com/gun"],
  localStorage: false,
});
// @ts-ignore
window.state = state;
export default state;
