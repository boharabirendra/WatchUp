import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./routes/index.route";

const app = express();
app.use(cors({
    origin: config.cors.origin,
    credentials: true
}));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.static("public"));
app.use(cookieParser());

/**Route handler */
app.use(router);


export default app;