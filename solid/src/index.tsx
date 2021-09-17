import { render } from "solid-js/web";

import "./index.css";
import App from "./App";
import { VurtProvider } from "./store/useVurt";

// @ts-ignore
if (module.hot) {
  // @ts-ignore
  module.hot.accept();
  console.log(module);
}

render(
  () => (
    <VurtProvider>
      <App />
    </VurtProvider>
  ),
  document.getElementById("root")
);
