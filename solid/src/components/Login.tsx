import { Component, createSignal, onMount } from "solid-js";

import { useVurt } from "../store/useVurt";
import vurt from "../vurt";

interface LoginProps {}

const Login: Component<LoginProps> = (props) => {
  const [alias, setAlias] = createSignal("");
  const { setIdentity } = useVurt();

  const handleClick = async (e: Event) => {
    e.preventDefault();
    if (!alias()) setAlias("anon");
    const newIdentity = vurt.createIdentity(alias());

    localStorage.setItem("SECRET_KEYS", JSON.stringify(newIdentity.secret));

    localStorage.setItem("PUBLIC_KEYS", JSON.stringify(newIdentity.public));

    setIdentity(newIdentity);
  };

  return (
    <main class="w-screen h-screen flex justify-center items-center font-sans bg-blue-vurt-900">
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
          autofocus
          onInput={(e) => setAlias(e.currentTarget.value)}
        />
        <button
          class="bg-blue-vurt-300 hover:bg-blue-vurt-100 hover:border-blue-vurt-900 hover:text-blue-vurt-900 border-2 text-blue-vurt-50 p-2 rounded w-80 text-lg"
          id="login"
          type="submit"
          onClick={handleClick}
        >
          <span>Login</span>
        </button>
        <div class="h-20 break-words max-w-sm w-96 flex flex-col justify-center items-center">
          <p>Enter a username.</p>
          <p>
            <button
              onclick={(e) => {
                e.preventDefault();
              }}
            >
              or click here to learn more
            </button>
          </p>
        </div>
      </form>
    </main>
  );
};
export default Login;
