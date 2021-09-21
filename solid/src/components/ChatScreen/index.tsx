import Header from "./Header/HeaderContainer";
import ChannelSidebar from "./ChannelSidebar";
import Chat from "./Chat/ChatContainer";
import TextInput from "./Chat/TextInput";
import ActivitySidebar from "./ActivitySidebar";

const Home = () => {
  return (
    <div class="flex bg-gray-950">
      <div class="flex flex-1 flex-col min-h-screen h-screen">
        <Header />
        <div class="flex-1 flex overflow-y-hidden">
          <ChannelSidebar />
          <div class="bg-gray-775 flex-1 flex justify-between">
            <div class="flex-1 flex flex-col justify-between">
              <Chat />
              <TextInput />
            </div>
            <ActivitySidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
