import {Router} from "express";
import { postSignIn } from "../controllers/signIn.js";
import { postSignUp } from "../controllers/signUp.js";

const authRouter = Router();

authRouter.post("/sign-in", postSignIn)
authRouter.post("/signUp", postSignUp)

export default authRouter;