import { useState } from "react";
import { Window, MessageList, MessageInput } from "stream-chat-react";
import Board from "./Board";
import "./Chat.css";

const Game = ({ channel, setChannel }) => {
  const [playersJoined, setPlayersJoined] = useState(
    channel.state.watcher_count === 2
  );
  const [result, setResult] = useState({ winner: "none", state: "none" });

  channel.on("user.watching.start", (e) => {
    setPlayersJoined(e.watcher_count === 2);
  });

  if (!playersJoined) {
    return <div>Waiting for other player to join...</div>;
  }
  return (
    <div className="gameContainer">
      <Board result={result} setResult={setResult} />
      <Window>
        <MessageList
          hideDeletedMessages
          disableDateSeparator
          closeReactionSelectorOnClick
          messageActions={["delete", "react"]}
        />
        <MessageInput noFiles />
      </Window>
      <button
        onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}
        className="leaveBtn"
      >
        Leave Game
      </button>
      {result.state === "won" && <div>{result.winner} Won the Game</div>}
      {result.state === "tie" && <div>Game Tied</div>}
    </div>
  );
};

export default Game;
