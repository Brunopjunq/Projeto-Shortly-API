import { Router } from "express";
import { postUrl } from "../controllers/urlController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import urlSchema from '../schemas/urlSchema.js'

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSchema(urlSchema), postUrl);

export default urlRouter;