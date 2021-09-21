const Chat = () => {
  return (
    <div class="chat text-sm text-gray-400 overflow-y-auto">
      <div class="flex ml-6 my-3 py-4 border-t border-gray-700">
        <div class="flex-none">
          <a href="#">
            {/* <img
                        src="./static/icon_placeholder_avatar.svg"
                        alt="avatar"
                        class="w-12 h-12 rounded-full"
                      /> */}
          </a>
        </div>
        <div class="ml-5">
          <div>
            <a href="#" class="text-white hover:underline">
              username
            </a>
            <span class="text-xs text-gray-600 ml-1">12/31/2029</span>
          </div>
          <div>
            <div>Placeholder text</div>
            <div>Placeholder text number two</div>
          </div>
        </div>
      </div>
      <div class="flex ml-6 my-3 py-4 border-t border-gray-700">
        <div class="flex-none">
          <a href="#">
            {/* <img
                        src="./static/icon_placeholder_avatar.svg"
                        alt="avatar"
                        class="w-12 h-12 rounded-full"
                      /> */}
          </a>
        </div>
        <div class="ml-5">
          <div>
            <a href="#" class="text-white hover:underline">
              username
            </a>
            <span class="text-xs text-gray-600 ml-1">1/1/2030</span>
          </div>
          <div>
            <div>Placeholder text</div>
            <div>Placeholder text number two</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Chat;
