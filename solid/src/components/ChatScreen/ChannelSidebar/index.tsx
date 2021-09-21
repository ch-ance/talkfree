import { useChat } from "../../../store/useChat";
import TeamsList from "./TeamsList";
import UserControls from "./UserControls";

const ChannelSidebar = () => {
  return (
    <div class="bg-gray-875 w-72 flex-none flex flex-col justify-between">
      <TeamsList />
      <UserControls />
    </div>
  );
};

export default ChannelSidebar;
