import Gun from "gun";
import "gun/sea";
import { IGunChainReference } from "gun/types/chain";
import { IGunConstructorOptions } from "gun/types/options";

class State {
  public: IGunChainReference;
  local: IGunChainReference;
  constructor(opts: IGunConstructorOptions) {
    this.public = Gun(opts).get("xchattytester1");
    this.local = Gun({ peers: [] }).get("state");
  }
}

const state = new State({ peers: ["http://localhost:8765/gun"] });
export default state;
