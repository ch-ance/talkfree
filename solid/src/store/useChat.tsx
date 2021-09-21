import {
  createSignal,
  createContext,
  useContext,
  Accessor,
  Context,
} from "solid-js";
import { Channel, Team, User } from "../types";

// is this interface necessary? Maybe the types propogate well enough that we don't
// need to define it here, since we're basically defining the type of a single object,
// which already has type definitions
interface Store {
  activeChannel: Accessor<Channel>;
  setActiveChannel: any;
  activeTeam: Accessor<Team>;
  setActiveTeam: any;
  activeUsers: Accessor<User[]>;
}

const ChatContext: Context<Store> = createContext();

export function ChatProvider(props) {
  const [activeChannel, setActiveChannel] = createSignal(
    JSON.parse(localStorage.getItem("activeChannel"))
  );

  const [activeTeam, setActiveTeam] = createSignal(
    JSON.parse(localStorage.getItem("activeTeam"))
  );

  const [activeUsers, setActiveUsers] = createSignal([]);

  const store: Store = {
    activeChannel,
    setActiveChannel,
    activeTeam,
    setActiveTeam,
    activeUsers,
  };

  return (
    <ChatContext.Provider value={store}>{props.children}</ChatContext.Provider>
  );
}

export function useChat(): Store {
  return useContext<Store>(ChatContext);
}
