import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import { StreamChat } from "stream-chat";
import { v4 as uuidv4 } from "uuid";
import bcrypt from "bcrypt";

dotenv.config();

const app = express();
const api_key = process.env.STREAM_API_KEY;
const secret_key = process.env.STREAM_SECRET_KEY;

app.use(cors());
app.use(express.json());

const serverClient = StreamChat.getInstance(api_key, secret_key);

app.post("/signup", async (req, resp) => {
  try {
    const { firstName, lastName, username, password } = req.body;
    const userId = uuidv4();
    const hashedPassword = await bcrypt.hash(password, 10);
    const token = serverClient.createToken(userId);
    return resp.json({
      token,
      userId,
      firstName,
      lastName,
      username,
      hashedPassword,
    });
  } catch (err) {
    resp.json(err);
  }
});

app.post("/login", async (req, resp) => {
  try {
    const { username, password } = req.body;
    const { users } = await serverClient.queryUsers({ name: username });
    if (users.length === 0) return resp.json({ message: "No user found" });

    const { id, firstName, lastName, hashedPassword } = users[0];
    const token = serverClient.createToken(id);

    const passwordMatch = await bcrypt.compare(password, hashedPassword);
    if (passwordMatch) {
      return resp.json({ token, firstName, lastName, username, userId: id });
    }
  } catch (err) {
    resp.json(err);
  }
});

app.listen(3001, console.log("listening on port 3001..."));
