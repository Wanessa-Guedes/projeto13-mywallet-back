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
        return res.status(422).send(`Dados preenchidos incorretamente. 
                                    !! Senha tem no min 3 caracteres.`);
    };

    try{
        const loginUserData = {
            email: value.email,
            password: value.password
        };
        const usersCollection = db.collection('users');
        const isUser = await usersCollection.findOne({email: loginUserData.email});
        if(isUser && bcrypt.compareSync(value.password, isUser.password)){
            const token = v4();
            //console.log(token)
            await db.collection("sessions").insertOne({
                userId: isUser._id, 
                token
            });
            return res.status(200).send({name: isUser.name, token});
        } else {
            return res.status(401).send("Falha no log-in. Usuário não cadastrado ou senha inválida.");
        }
    } catch (e) {
        res.status(500).send("Erro ao logar");
    }
}