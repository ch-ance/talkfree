import { For } from "solid-js";
import { useChat } from "../../../store/useChat";

const ActivitySidebar = () => {
  const { activeUsers } = useChat();

  return (
    <div class="bg-gray-875 w-72 flex-none px-3 py-3 overflow-y-auto">
      <h3 class="uppercase tracking-wide font-semibold text-xs text-gray-500 mb-2">
        Online - {activeUsers().length}
      </h3>
      <ul class="mb-6">
        <For
          each={activeUsers()}
          fallback={
            <>
              <p>no one is online...</p>
              <br />
              <p>how did this happen?</p>
              <br />
              <p>someone should always be here....</p>
              <br />
              <p>I mean, you're here, right?</p>
              <br />
              <br />
              <p>Are you there?</p>
            </>
          }
        >
          {(user) => (
            <li class="text-gray-500 px-2 hover:text-gray-200 hover:bg-gray-725 py-1 my-2">
              <a href="#" class="flex items-center">
                {/* <img
                                src="./static/icon_placeholder_avatar.svg"
                                alt="avatar"
                                class="w-8 h-8 rounded-full"
                              /> */}
                <span class="ml-2">{user.username}</span>
              </a>
            </li>
          )}
        </For>
      </ul>
    </div>
  );
};
export default ActivitySidebar;
