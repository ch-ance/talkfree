import ChannelsHeader from "./ChannelsHeader";
import ChatHeader from "./ChatHeader";

const Header = () => {
  return (
    <header class="flex text-white h-12">
      <ChannelsHeader />
      <ChatHeader />
    </header>
  );
};
export default Header;
