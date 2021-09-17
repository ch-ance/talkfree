import {
  Component,
  createEffect,
  createMemo,
  createSignal,
  lazy,
  onMount,
} from "solid-js";
import { Router, Routes, Route, Link } from "solid-app-router";
import vurt from "./vurt";
import { useVurt } from "./store/useVurt";
const Login = lazy(() => import("./components/Login"));
const Home = lazy(() => import("./components/Home"));

const App: Component = () => {
  const [loadingIPFS, setLoadingIPFS] = createSignal(true);
  const { identity } = useVurt();

  const connectToIPFS = () => {
    vurt
      .initIPFS()
      .then((ipfs) => {
        setLoadingIPFS(false);
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
          element={identity()?.persona?.publicKey ? <Home /> : <Login />}
        />
      </Routes>
    </Router>
  );
};

export default App;
