import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
const app = express();
app.use(cors({
    origin: config.cors.origin,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());
export default app;