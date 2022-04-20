import "./App.css";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Cookies from "universal-cookie";
import { StreamChat } from "stream-chat";
import { Chat } from "stream-chat-react";
import { useState } from "react";
import JoinGame from "./components/JoinGame";

const App = () => {
  const [isAuth, setIsAuth] = useState(false);
  const api_key = "9qaay4hr9j9j";
  const cookies = new Cookies();
  const token = cookies.get("token");

  const client = StreamChat.getInstance(api_key);

  const handleLogout = () => {
    cookies.remove("userId");
    cookies.remove("username");
    cookies.remove("firstName");
    cookies.remove("lastName");
    cookies.remove("token");
    cookies.remove("hashedPassword");
    cookies.remove("channelName");
    client.disconnectUser();
    setIsAuth(false);
  };

  if (token) {
    client
      .connectUser(
        {
          id: cookies.get("userId"),
          name: cookies.get("username"),
          firstName: cookies.get("firstName"),
          lastName: cookies.get("lastName"),
          hashedPassword: cookies.get("hashedPassword"),
        },
        token
      )
      .then(() => {
        setIsAuth(true);
      });
  }

  return (
    <div className="App">
      {isAuth ? (
        <Chat client={client} className="gameInterface">
          <JoinGame />
          <button onClick={handleLogout} className="logoutBtn">
            Logout
          </button>
        </Chat>
      ) : (
        <>
          <SignUp setIsAuth={setIsAuth} />
          <Login setIsAuth={setIsAuth} />
        </>
      )}
    </div>
  );
};

export default App;
