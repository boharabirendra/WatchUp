import express from "express";
import userRouter from "./users.route";

const router = express();

router.use("/api/v1/users", userRouter);



export default router;
