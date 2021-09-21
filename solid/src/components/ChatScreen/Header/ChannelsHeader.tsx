import { useChat } from "../../../store/useChat";

const ChannelsHeader = () => {
  const { activeTeam } = useChat();

  return (
    <div
      class="bg-gray-875 w-72 flex-none flex items-center justify-between px-3 py-2 border-b border-gray-900"
      style="border-top-left-radius: 5px;"
    >
      <h1>{activeTeam.name}</h1>
      <button>
        <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
          <path
            class="heroicon-ui"
            d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
          ></path>
        </svg>
      </button>
    </div>
  );
};

export default ChannelsHeader;
