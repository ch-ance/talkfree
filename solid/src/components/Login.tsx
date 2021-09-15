import { createMemo, createSignal } from "solid-js";
import Vurt from "../vurt";

const Login = (props) => {
  const [alias, setAlias] = createSignal("");
  const [loadingMsg, setLoadingMsg] = createSignal("");

  const handleClick = async (e: Event) => {
    e.preventDefault();
    setLoadingMsg("creating your identity");
    try {
      const newIdentity = await Vurt.createIdentity(alias());
      console.log("newIdentity", newIdentity);
      if (newIdentity) {
        setAlias("");
        setLoadingMsg("");
      }
    } catch (err) {
      console.error(err);
      alert("there was an error, please try again");
      setLoadingMsg("");
    }
  };

  return (
    <main class="w-screen h-screen flex justify-center items-center font-sans bg-green-pea-800">
      <form class="pt-10 px-10 rounded flex justify-center items-center flex-col shadow-md border-4 border-red-punch-200 bg-blue-vurt-500">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="w-20 h-20 text-black-600 mb-2"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fill-rule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
            clip-rule="evenodd"
          />
        </svg>
        <p class="mb-5 text-3xl uppercase text-teal-aqua-900">Login</p>
        <input
          type="username"
          name="alias"
          class="mb-5 p-3 w-80 focus:border-teal-aqua-700 rounded border-2 outline-none bg-blue-vurt-900 text-red-punch-100"
          autocomplete="off"
          placeholder="alias"
          required
          value={alias()}
          onChange={(e) => setAlias(e.target.nodeValue)}
          disabled={Boolean(loadingMsg())}
        />
        <button
          class="bg-blue-vurt-300 hover:bg-blue-vurt-100 hover:border-blue-vurt-900 hover:text-blue-vurt-900 border-2 text-blue-vurt-50 p-2 rounded w-80 text-lg"
          id="login"
          type="submit"
          onClick={handleClick}
          disabled={Boolean(loadingMsg())}
        >
          <span>Login</span>
        </button>
        <div class="h-20 flex items-center">
          <p class="">{loadingMsg()}</p>
        </div>
      </form>
    </main>
  );
};
export default Login;
