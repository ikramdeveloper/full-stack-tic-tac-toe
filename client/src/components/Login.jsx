import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const Login = ({ setIsAuth }) => {
  const [username, setUsername] = useState(null);
  const [password, setPassword] = useState(null);
  const cookies = new Cookies();

  const handleLogin = async () => {
    const resp = await axios.post("http://localhost:3001/login", {
      username,
      password,
    });
    const {
      firstName,
      lastName,
      username: loginUser,
      token,
      userId,
    } = resp.data;
    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("username", loginUser);
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    setIsAuth(true);
  };
  return (
    <form className="login" onSubmit={(e) => e.preventDefault()}>
      <label>Login:</label>
      <input
        type="text"
        placeholder="Username..."
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Password..."
        autoComplete="true"
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};

export default Login;
