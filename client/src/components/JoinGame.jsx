import { useState } from "react";
import { useChatContext, Channel } from "stream-chat-react";
import CustomInput from "./CustomInput";
import Game from "./Game";

const JoinGame = () => {
  const [rivalName, setRivalName] = useState("");
  const [channel, setChannel] = useState(null);
  const { client } = useChatContext();

  const createChannel = async () => {
    try {
      const resp = await client.queryUsers({ name: { $eq: rivalName } });
      if (resp.users.length === 0) {
        alert("Such user does not exit");
        return;
      }

      const newChannel = await client.channel("messaging", {
        members: [client.userID, resp.users[0].id],
      });

      await newChannel.watch();
      setChannel(newChannel);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <>
      {channel ? (
        <Channel channel={channel} Input={CustomInput}>
          <Game channel={channel} setChannel={setChannel} />
        </Channel>
      ) : (
        <div className="joinGame">
          <h4>Create Game</h4>
          <form onSubmit={(e) => e.preventDefault()}>
            <input
              type="text"
              placeholder="Rival Username..."
              onChange={(e) => setRivalName(e.target.value)}
            />
            <button onClick={createChannel}>Join/Start Game</button>
          </form>
        </div>
      )}
    </>
  );
};

export default JoinGame;
