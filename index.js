import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import Joi from "joi";
import { postSignUp } from "./controllers/signUp.js";
import { postSignIn } from "./controllers/signIn.js";
import { getMainPage } from "./controllers/mainPage.js";
import { postOutFlow } from "./controllers/outflow.js";
import { postInFlow } from "./controllers/inflow.js";

const app = express();
app.use(json());
app.use(cors());


//Projeto13 - MyWallet 
//TODO: Tela 1: Sign-in (post - usuário enviar os dados para entrar no app {e-mail, senha})
app.post("/sign-in", postSignIn)

//TODO: Tela 2: Sign-up (post - usuário cadastra infos {nome, e-mail, senha, confirme a senha})
app.post("/signUp", postSignUp)

//TODO: Tela 3 e tela 6: Tela de registros (get - colocar os registros,
app.get("/mainpage", getMainPage) 
//TODO: Tela 4: Opção de nova entrada (post - {valor e descrição})
app.post("/outflow", postOutFlow) 
//TODO: Tela 5: Opção de nova saída (post - {valor e descrição})
app.post("/inflow", postInFlow) 


// subindo back-end
const PORTA = process.env.PORTA || 5000;
app.listen(PORTA, () => {
    console.log(chalk.bold.green(`Back-end on na porta ${PORTA}`))
});