import {} from "solid-js";
import { useVurt } from "../store/useVurt";
import Header from "./Header";
const Home = () => {
  const { identity } = useVurt();
  return (
    <section>
      <Header />
    </section>
  );
};

export default Home;
