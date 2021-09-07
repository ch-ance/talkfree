import State from "../state";

class Auth {
  state: typeof State;
  public: { alias: string; epub: string; pub: string };
  private: { pub: string; epub: string; priv: string; epriv: string };
  constructor(state: typeof State) {
    this.state = state;
    this.public = JSON.parse(localStorage.getItem("user")!)?.is;
    this.private = JSON.parse(localStorage.getItem("user")!)?._;
  }

  createUser(alias: string, password: string): Promise<Boolean> {
    return new Promise((resolve, reject) => {
      this.state.local.user().create(alias, password, async (ack) => {
        const user = this.state.local.user();
        localStorage.setItem(
          "user",
          // @ts-ignore
          JSON.stringify({ is: user.is, _: user._.sea })
        );
        // @ts-ignore
        this.public = user.is;
        // @ts-ignore
        this.private = user._.sea;
        resolve(true);
      });
    });
  }
}

export default Auth;
