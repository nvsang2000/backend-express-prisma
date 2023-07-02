import dotenv from "dotenv";
import express, { Request, Response } from "express";
import routes from "./routes/index";
dotenv.config();

const app = express();
app.use(express.json());

app.use("/api", routes);

app.listen(3000 || process.env.PORT, () => {
  console.log(
    `Server successfully listening at http://localhost:${process.env.PORT}`
  );
});
