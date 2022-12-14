import { Router } from "express";
import { getRanking, getUserInfo } from "../controllers/userController.js";
import { validateToken } from "../middleware/validateToken.js";

const userRouter = Router();

userRouter.get('/users/me', validateToken, getUserInfo);
userRouter.get('/ranking', getRanking);

export default userRouter;