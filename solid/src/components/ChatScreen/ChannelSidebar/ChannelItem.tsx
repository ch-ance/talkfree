interface ChannelItemProps {
  channelName: string;
}

const ChannelItem = (props: ChannelItemProps) => {
  return (
    <li class="text-gray-200 px-2 bg-gray-725 rounded">
      <a href="#" class="flex items-center">
        <span class="text-xl">#</span>
        <span class="ml-2">{props.channelName}</span>
      </a>
    </li>
  );
};

export default ChannelItem;
