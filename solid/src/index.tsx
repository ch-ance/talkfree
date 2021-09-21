import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { VurtProvider } from "./store/useVurt";
import { ChatProvider } from "./store/useChat";

render(
  () => (
    <VurtProvider>
      <ChatProvider>
        <App />
      </ChatProvider>
    </VurtProvider>
  ),
  document.getElementById("root")
);
