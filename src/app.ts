import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import config from "./config";
import router from "./routes/index.route";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { notFoundError } from "./middlewares/notFoundError.middleware";

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
app.use(errorHandler);
app.use(notFoundError);


export default app;