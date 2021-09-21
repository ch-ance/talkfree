import { useChat } from "../../../store/useChat";

const ChatHeader = () => {
  const { activeChannel } = useChat();
  return (
    <div class="flex-1 bg-gray-775 flex items-center justify-between border-b border-gray-900 px-4">
      <div class="flex items-center">
        <div class="text-gray-500 text-2xl">#</div>
        <div class="ml-2 text-sm text-white">{activeChannel()?.name}</div>
        <a href="#">
          <div class="border-l pl-3 ml-3 border-gray-600 text-xs text-gray-400">
            {activeChannel()?.description}
          </div>
        </a>
      </div>
      <div class="flex items-center">
        <a href="#" class="ml-4">
          <svg
            class="w-6 h-6 text-gray-300 hover:text-gray-200"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M12 22c1.1 0 2-.9 2-2h-4c0 1.1.89 2 2 2zm6-6v-5c0-3.07-1.64-5.64-4.5-6.32V4c0-.83-.67-1.5-1.5-1.5s-1.5.67-1.5 1.5v.68C7.63 5.36 6 7.92 6 11v5l-2 2v1h16v-1l-2-2z"></path>
          </svg>
        </a>
        <a href="#" class="ml-4">
          <svg
            class="w-6 h-6 text-gray-300 hover:text-gray-200"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              class="secondary"
              d="M2.24 20.35l6.5-7.5a1 1 0 0 1 1.47-.06l1 1a1 1 0 0 1-.06 1.47l-7.5 6.5c-.93.8-2.22-.48-1.4-1.41z"
            ></path>
            <path
              class="primary"
              d="M15 15.41V18a1 1 0 0 1-.3.7l-1 1a1 1 0 0 1-1.4 0l-8-8a1 1 0 0 1 0-1.4l1-1A1 1 0 0 1 6 9h2.59L13 4.59V3a1 1 0 0 1 1.7-.7l7 7A1 1 0 0 1 21 11h-1.59L15 15.41z"
            ></path>
          </svg>
        </a>
        <a href="#" class="ml-4">
          <svg
            class="w-6 h-6 text-gray-300 hover:text-gray-200"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path d="M0 0h24v24H0z" fill="none"></path>
            <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"></path>
          </svg>
        </a>
        <a href="#" class="ml-4">
          <form action="#" class="relative">
            <input
              type="text"
              placeholder="Search"
              class="rounded bg-gray-950 text-gray-200 text-xs px-2 py-1"
            />
            <span class="absolute right-0 top-0 mr-1" style="top:6px">
              <svg
                class="w-4 h-4 text-gray-500 hover:text-gray-200"
                fill="currentColor"
                viewBox="0 0 24 24"
                width="24"
                height="24"
              >
                <path
                  class="heroicon-ui"
                  d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z"
                ></path>
              </svg>
            </span>
          </form>
        </a>
        <a href="#" class="ml-4">
          <svg
            class="w-6 h-6 text-gray-300 hover:text-gray-200"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              d="M19 3H4.99C3.88 3 3.01 3.89 3.01 5L3 19C3 20.1 3.88 21 4.99 21H19C20.1 21 21 20.1 21 19V5C21 3.89 20.1 3 19 3ZM19 15H15C15 16.66 13.65 18 12 18C10.35 18 9 16.66 9 15H4.99V5H19V15Z"
              fill="currentColor"
            ></path>
          </svg>
        </a>
        <a href="#" class="ml-4">
          <svg
            class="w-6 h-6 text-gray-300 hover:text-gray-200"
            fill="currentColor"
            width="24"
            height="24"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 2C6.486 2 2 6.487 2 12C2 17.515 6.486 22 12 22C17.514 22 22 17.515 22 12C22 6.487 17.514 2 12 2ZM12 18.25C11.31 18.25 10.75 17.691 10.75 17C10.75 16.31 11.31 15.75 12 15.75C12.69 15.75 13.25 16.31 13.25 17C13.25 17.691 12.69 18.25 12 18.25ZM13 13.875V15H11V12H12C13.104 12 14 11.103 14 10C14 8.896 13.104 8 12 8C10.896 8 10 8.896 10 10H8C8 7.795 9.795 6 12 6C14.205 6 16 7.795 16 10C16 11.861 14.723 13.429 13 13.875Z"
            ></path>
          </svg>
        </a>
      </div>
    </div>
  );
};

export default ChatHeader;
