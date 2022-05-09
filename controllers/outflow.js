import db from "../db.js";
import chalk from "chalk";
//import bcrypt from "bcrypt";
//import { v4 } from 'uuid';
import Joi from "joi";
import dayjs from "dayjs";
import { stripHtml } from "string-strip-html";

export async function postOutFlow(req, res){

    //const data = { value: outflowInInfo.value, description: outflowInInfo.description};
    // Fazer verificação com joi
        //const valueRegex = new RegExp(/(^[0-9]+,\d{1,2}$)|(^[0-9]+$)/);
        //console.log(valueRegex.test(req.body.value));
        const outFLowSchema = Joi.object({
            value: Joi.number().required(),
            description: Joi.string().required(),
        });

        const {error, value} = outFLowSchema.validate(req.body, {abortEarly: false});
        if(error){
            return res.status(422).send(error.details.map(detail => detail.message));
        };  

        const sanitizedDescription = stripHtml(value.description).result;

    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();
        //if(!token) return res.sendStatus(400);
        const session = await db.collection("sessions").findOne({token});
        //if(!session) return res.sendStatus(404);
        //const user = await db.collection("users").findOne({_id: session.userId});
        //if(!user) return res.status(404).send("Usuário não cadastrado.")
        const id = session.userId;
        const dayFlow = dayjs().format("DD/MM");
        await db.collection("cashFlow").insertOne({
            userId: id,
            value: value.value,
            description: sanitizedDescription,
            type: "exit", 
            day: dayFlow});
        res.status(201).send(console.log(chalk.bold.green("Outflow funcionando!")));
    } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro na página de inserir saída money"), e));
    }
}