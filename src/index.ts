import dotenv from "dotenv";
import express, { Request, Response } from "express";
import adminRoter from "./routes/admin";
dotenv.config();

const app = express();
app.use(express.json());

app.get("/", (_req: Request, res: Response) => {
  return res.send("Express Typescript on Vercel");
});
app.use("/api", adminRoter);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(
    `Running on ${PORT}`
  );
});
