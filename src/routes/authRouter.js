import { Router } from "express";
import { login, postUser } from "../controllers/authController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import  authSchema from "../schemas/authSchema.js";
import loginSchema from "../schemas/loginSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(authSchema), postUser)
authRouter.post('/signin', validateSchema(loginSchema), login)

export default authRouter;