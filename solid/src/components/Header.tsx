import {} from "solid-js";
import { useVurt } from "../store/useVurt";
import { Identity } from "../vurt/auth";

const Header = () => {
  const { identity } = useVurt();
  const alias = (identity() as Identity).persona.alias;

  return (
    <header class="border-b-2 flex justify-between">
      <h1 class="text-5xl">talk free</h1>
      <section>
        <ul>
          <li>
            <button class="">
              {alias}-{identity().persona.publicKey}
            </button>
          </li>
          <li></li>
        </ul>
      </section>
    </header>
  );
};
export default Header;
