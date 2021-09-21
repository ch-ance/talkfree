import { For } from "solid-js";
import ChannelItem from "./ChannelItem";
import { Channel } from "../../../types";

interface TeamChannelsProps {
  teamName: string;
  channelGroups: Channel[];
}

const TeamChannels = (props: TeamChannelsProps) => {
  return (
    <div class="overflow-y-auto text-sm">
      <ul class="px-2 py-3">
        <button class="flex items-center text-gray-500 hover:text-gray-200">
          <svg fill="currentColor" viewBox="0 0 24 24" width="24" height="24">
            <path
              class="heroicon-ui"
              d="M15.3 9.3a1 1 0 0 1 1.4 1.4l-4 4a1 1 0 0 1-1.4 0l-4-4a1 1 0 0 1 1.4-1.4l3.3 3.29 3.3-3.3z"
            ></path>
          </svg>
          <h3 class="uppercase tracking-wide font-semibold text-xs">
            {props.teamName}
          </h3>
        </button>
        <For
          each={props.channelGroups}
          fallback={<h1>loading channel group...</h1>}
        >
          {(channel) => <ChannelItem channelName={channel.name} />}
        </For>
      </ul>
    </div>
  );
};

export default TeamChannels;
