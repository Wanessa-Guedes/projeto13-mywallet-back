import db from "../db.js";
import chalk from "chalk";
import bcrypt from "bcrypt";
import { v4 } from 'uuid';

export async function getMainPage(req, res){
    
    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();
        if(!token) return res.sendStatus(400);
        const validUser = await db.collection("sessions").findOne({token});
        if(!validUser) return res.sendStatus(404);
        const userFlow = await db.collection("cashFlow").findOne({_id: validUser.userId});
        res.status(200).send(userFlow);
    } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro na página principal"), e));
    }
}