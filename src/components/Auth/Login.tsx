import { useState } from "react";

const Login = ({ auth, setIsLoggedIn }: any) => {
  const [alias, setAlias] = useState("");
  const [password, setPassword] = useState("");

  const createAccount = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    await auth.createUser(alias, password);
    setIsLoggedIn(true);
  };

  return (
    <section>
      <form>
        <label>Alias</label>
        <input
          placeholder="alias..."
          value={alias}
          onChange={(e) => setAlias(e.target.value)}
        />
        <label>Password</label>
        <input
          placeholder="password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={(e) => createAccount(e)}>Create account</button>
      </form>
    </section>
  );
};

export default Login;
