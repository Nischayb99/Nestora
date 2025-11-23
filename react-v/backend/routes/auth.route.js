import express from "express";
import { sighUp, login, logOut } from "../controllers/auth.controller.js";
const authRouter = express.Router();

authRouter.post("/signup", sighUp);
authRouter.post("/login", login);
authRouter.post("/logout", logOut);

export default authRouter;