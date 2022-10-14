import { Router } from "express";
import { deleteUrl, getUrl, openUrl, postUrl } from "../controllers/urlController.js";
import { validateSchema } from "../middleware/validateSchema.js";
import { validateToken } from "../middleware/validateToken.js";
import urlSchema from '../schemas/urlSchema.js'

const urlRouter = Router();

urlRouter.post('/urls/shorten', validateSchema(urlSchema),validateToken, postUrl);
urlRouter.get('/urls/:id', getUrl);
urlRouter.get('/urls/open/:shortUrl', openUrl);
urlRouter.delete('/urls/:id', validateToken, deleteUrl);

export default urlRouter;