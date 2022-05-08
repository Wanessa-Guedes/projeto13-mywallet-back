import {Router} from "express";
import { getMainPage } from "../controllers/mainPage.js";
import { postOutFlow } from "../controllers/outflow.js";
import { postInFlow } from "../controllers/inflow.js";

const transactionsRouter = Router();

transactionsRouter.get("/mainpage", getMainPage) 
transactionsRouter.post("/outflow", postOutFlow) 
transactionsRouter.post("/inflow", postInFlow) 

export default transactionsRouter;