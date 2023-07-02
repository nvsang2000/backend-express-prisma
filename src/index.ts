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
app.listen(3000 || process.env.PORT, () => {
  console.log(
    `Server successfully listening at http://localhost:${process.env.PORT}`
  );
});
