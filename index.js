import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";

import authRouter from "./routes/authRouter.js";
import transactionsRouter from "./routes/transactionsRouter.js";

const app = express();
app.use(json());
app.use(cors());

//Projeto13 - MyWallet 
app.use(authRouter)
app.use(transactionsRouter)

// subindo back-end
const PORTA = process.env.PORTA || 5000;
app.listen(PORTA, () => {
    console.log(chalk.bold.green(`Back-end on na porta ${PORTA}`))
});