import db from "../db.js";
import chalk from "chalk";
import bcrypt from "bcrypt";
import Joi from "joi";
import { v4 } from 'uuid';

export async function postSignIn(req, res){
    
    //const {email, password} = req.body;

    // Fazer verificação com joi
    const signInSchema = Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required()
    });

    const {error, value} = signInSchema.validate(req.body, {abortEarly: false});
    if(error){
        res.status(422).send(error.details.map(detail => detail.message));
        return;
    };
        //TODO: Tela 1 -- Colocar no banco de dados
    try{

        const usersCollection = db.collection('users');
        const loginUserData = {
            email: value.email,
            password: value.password
        };
        const isUser = await usersCollection.findOne({email: loginUserData.email});
        if(isUser && bcrypt.compareSync(value.password, isUser.password)){
            const token = v4();
            // Crie uma sessão na coleção de sessões para o usuário e retorne um token para o front-end
            await db.collection("sessions").insertOne({
                userId: isUser._id, 
                token
            });
            return res.status(200).send({name: isUser.name, token});
        } else {
            return res.status(401).send(console.log(chalk.bold.red("Falha no log-in")));
        }

    } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro ao logar"), e));
    }
}