import {Router} from "express";

import { getMainPage } from "../controllers/mainPage.js";
import { postOutFlow } from "../controllers/outflow.js";
import { postInFlow } from "../controllers/inflow.js";
import { validateToken } from "../middlewares/authMiddleware.js";

const transactionsRouter = Router();
transactionsRouter.use(validateToken);
transactionsRouter.get("/mainpage", getMainPage) 
transactionsRouter.post("/outflow", postOutFlow) 
transactionsRouter.post("/inflow", postInFlow) 

export default transactionsRouter;