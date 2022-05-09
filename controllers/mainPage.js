import db from "../db.js";
import chalk from "chalk";
//import bcrypt from "bcrypt";
//import { v4 } from 'uuid';

export async function getMainPage(req, res){
    
    let sum = 0;    
    try {
        const {authorization} = req.headers;
        const token = authorization?.replace("Bearer","").trim();
        //if(!token) return res.sendStatus(400);
        const session = await db.collection("sessions").findOne({token});
        //if(!session) return res.sendStatus(404);
        //const user = await db.collection("users").findOne({_id: session.userId});
        //if(!user) return res.status(404).send("Usuário não cadastrado.")
        const userFlow = await db.collection("cashFlow").find({userId: session.userId}).toArray();
        userFlow.map((flow) => {
            if(flow.type === "entry"){
                sum += parseFloat(flow.value);
            } else if (flow.type === "exit"){
                sum -= parseFloat(flow.value);
            }
        });
        res.status(200).send([userFlow, sum]);
    } catch (e) {
        res.status(500).send("Erro na página.");
    }
}