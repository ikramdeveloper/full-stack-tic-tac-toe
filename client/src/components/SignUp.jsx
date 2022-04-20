import { useState } from "react";
import axios from "axios";
import Cookies from "universal-cookie";

const SignUp = ({ setIsAuth }) => {
  const [user, setUser] = useState({});
  const cookies = new Cookies();

  const handleSignUp = async () => {
    const resp = await axios.post("http://localhost:3001/signup", user);
    const { userId, token, firstName, lastName, username, hashedPassword } =
      resp.data;
    cookies.set("token", token);
    cookies.set("userId", userId);
    cookies.set("firstName", firstName);
    cookies.set("lastName", lastName);
    cookies.set("username", username);
    cookies.set("hashedPassword", hashedPassword);
    setIsAuth(true);
  };

  return (
    <form className="signUp" onSubmit={(e) => e.preventDefault()}>
      <label>Sign Up</label>
      <input
        type="text"
        placeholder="First Name..."
        onChange={(e) => setUser({ ...user, firstName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Last Name..."
        onChange={(e) => setUser({ ...user, lastName: e.target.value })}
      />
      <input
        type="text"
        placeholder="Username..."
        onChange={(e) => setUser({ ...user, username: e.target.value })}
      />
      <input
        type="password"
        placeholder="Password..."
        autoComplete="true"
        onChange={(e) => setUser({ ...user, password: e.target.value })}
      />
      <button onClick={handleSignUp}>Sign Up</button>
    </form>
  );
};

export default SignUp;
