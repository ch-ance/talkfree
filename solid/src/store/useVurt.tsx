import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Context,
} from "solid-js";
import vurt, { Identity } from "../vurt";

interface Store {
  identity: Accessor<Identity>;
  setIdentity: any;
}

const VurtContext: Context<Store> = createContext();

export function VurtProvider(props) {
  const [identity, setIdentity] = createSignal({
    public: JSON.parse(localStorage.getItem("PUBLIC_KEYS")),
    secret: JSON.parse(localStorage.getItem("SECRET_KEYS")),
  });

  vurt.setIdentity(identity());

  const store: Store = {
    identity,
    setIdentity,
  };

  return (
    <VurtContext.Provider value={store}>{props.children}</VurtContext.Provider>
  );
}

export function useVurt(): Store {
  return useContext<Store>(VurtContext);
}
