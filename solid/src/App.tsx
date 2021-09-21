import { Component, lazy, onMount } from "solid-js";
import { Router, Routes, Route } from "solid-app-router";
import vurt from "./vurt";
import { useVurt } from "./store/useVurt";
const Login = lazy(() => import("./components/Login"));
const ChatScreen = lazy(() => import("./components/ChatScreen"));

const App: Component = () => {
  const { identity } = useVurt();

  const connectToIPFS = () => {
    vurt
      .initIPFS()
      .then((ipfs) => {
        console.log("connected to ipfs", ipfs);
      })
      .catch((err) => {
        console.error(err);
        connectToIPFS();
      });
  };

  onMount(connectToIPFS);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={identity()?.public?.alias ? <ChatScreen /> : <Login />}
        />
      </Routes>
    </Router>
  );
};

export default App;
