import db from "../db.js";
import chalk from "chalk";
import bcrypt from "bcrypt";
import { v4 } from 'uuid';
import Joi from "joi";
import dayjs from "dayjs";

export async function postInFlow(req, res){

    //const data = { value: outflowInInfo.value, description: outflowInInfo.description};
    
    // Fazer verificação com joi
        const outFLowSchema = Joi.object({
            value: Joi.number().required(),
            description: Joi.string().required(),
        });

        const {error, value} = outFLowSchema.validate(req.body, {abortEarly: false});
        if(error){
            res.status(422).send(error.details.map(detail => detail.message));
            return;
        };  

    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();
        if(!token) return res.sendStatus(400);
        const validUser = await db.collection("sessions").findOne({token});
        if(!validUser) return res.sendStatus(404);
        const id = validUser.userId;
        const dayFlow = dayjs().format("DD/MM");
        await db.collection("cashFlow").insertOne({
            userId: id,
            value: value.value,
            description: value.description,
            type: "entry", 
            day: dayFlow});
        res.status(201).send(console.log(chalk.bold.green("Inflow funcionando!")));
    } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro na página de inserir entrada money"), e));
    }
}