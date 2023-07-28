import express from "express";
import cors from "cors";
import { authRouter, todoRouter } from "./routes/index.js";

const app = express();

app.use(express.json());
app.use(cors());
app.use("/", authRouter);
app.use("/", todoRouter);

export default app;
