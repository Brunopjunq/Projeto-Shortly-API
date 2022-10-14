import { Router } from "express";
import { postUser } from "../controllers/authController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import authSchema from "../schemas/authSchema.js";

const authRouter = Router();

authRouter.post('/signup', validateSchema(authSchema), postUser)
//authRouter.post('/signin', VALIDAÇÃO, CONTROLLER);

export default authRouter;