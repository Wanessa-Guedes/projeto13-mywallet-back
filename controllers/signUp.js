import db from "../db.js";
import chalk from "chalk";
import bcrypt from "bcrypt";
import Joi from "joi";
import { stripHtml } from "string-strip-html";

// Tela de cadastro --> Recebe - name, email, password, confirm

export async function postSignUp (req, res){
    
    //const {name, email, password, confirm} = req.body;

    // Fazer verificação com joi
    const signUpSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        confirm: Joi.ref('password')
    });

    const {error, value} = signUpSchema.validate(req.body, {abortEarly: false});
    if(error){
        return res.status(422).send(`Dados preenchidos incorretamente. 
                                    !! Senha precisa ter no min 3 caracteres.`);
    };

    const passowrdHash = bcrypt.hashSync(value.password, 10);
    const sanitizedName = stripHtml(value.name).result.trim();
    
    try {
        const usersCollection = db.collection('users');
        const infoUser = {
            name: sanitizedName,
            email: value.email,
            password: passowrdHash
            };
        const emailExists = await usersCollection.findOne({email: infoUser.email});
        if(emailExists){
            return res.status(404).send(console.log(chalk.bold.red("E-mail já cadastrado.")));
        }
        
        await usersCollection.insertOne(infoUser);
        console.log(infoUser);
        res.status(201).send(console.log(chalk.bold.green("Cadastro realizado com sucesso")));

    } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro ao logar"), e));
    }
}
