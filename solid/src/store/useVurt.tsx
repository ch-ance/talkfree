import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Context,
} from "solid-js";
import { Identity, IdentityWithoutAlias } from "../vurt/auth";

interface Store {
  identity: Accessor<Identity | IdentityWithoutAlias>;
  setIdentity: any;
}

const VurtContext: Context<Store> = createContext();

export function VurtProvider(props) {
  const [identity, setIdentity] = createSignal({
    persona: JSON.parse(localStorage.getItem("TALK_FREE_PERSONA")),
    secretKey: localStorage.getItem("TALK_FREE_SECRET_KEY"),
  });
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
