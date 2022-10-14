import { Router } from "express";
import { getUrl, postUrl } from "../controllers/urlController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import urlSchema from '../schemas/urlSchema.js'

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSchema(urlSchema), postUrl);
urlRouter.get('/urls/:id', getUrl);

export default urlRouter;