import express, {json} from "express";
import chalk from "chalk";
import cors from "cors";
import Joi from "joi";

const app = express();
app.use(json());
app.use(cors());

// Iniciando salvando tudo em variáveis (Para poder começar o front)
// TODO: Retirar variáveis globais e salvar no mongo
const loginUsersData = [];
const infosUser = [];

//Projeto13 - MyWallet 
//TODO: Tela 1: Sign-in (post - usuário enviar os dados para entrar no app {e-mail, senha})
app.post("/sign-in", (req,res) =>{

    const {email, password} = req.body;

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

    const loginUserData = {
            email: value.email,
            password: value.password
        };

        loginUsersData.push(loginUserData);

        //TODO: Tela 1 -- Colocar no banco de dados

        res.status(201).send(console.log(chalk.bold.green("Log in realizado com sucesso")))

   /*  } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro ao logar"), e));
    } */

})

//TODO: Tela 2: Sign-up (post - usuário cadastra infos {nome, e-mail, senha, confirme a senha})
app.post("/sign-up", (req,res) =>{
    
    const {name, email, password, confirmation} = req.body;

    // Fazer verificação com joi
    const signUpSchema = Joi.object({
        name: Joi.string().required(),
        email: Joi.string().required(),
        password: Joi.string().required(),
        confirmation: Joi.ref('password')
    });

    const {error, value} = signUpSchema.validate(req.body, {abortEarly: false});
    if(error){
        res.status(422).send(error.details.map(detail => detail.message));
        return;
    };

    const infoUser = {
        name: value.name,
        email: value.email,
        password: value.password,
        confirmation: value.confirmation
        };

        infosUser.push(infoUser);

        //TODO: Tela 1 -- Colocar no banco de dados

        res.status(201).send(console.log(chalk.bold.green("Cadastro realizado com sucesso")))

        /*  } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro ao logar"), e));
    } */
})

//TODO: Tela 3 e tela 6: Tela de registros (get - colocar os registros, 
//TODO: Tela 4: Opção de nova entrada (post - {valor e descrição})
//TODO: Tela 5: Opção de nova saída (post - {valor e descrição})



// subindo back-end
const PORTA = 5000;
app.listen(PORTA, () => {
    console.log(chalk.bold.green(`Back-end on na porta ${PORTA}`))
});