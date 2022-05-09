import db from "../db.js";

export async function validateToken(req, res, next) {
    const {authorization} = req.headers;
    const token = authorization?.replace("Bearer","").trim();
    if(!token) return res.sendStatus(400);

    try {
        const session = await db.collection("sessions").findOne({token});
        if(!session) return res.sendStatus(404);
        const user = await db.collection("users").findOne({_id: session.userId});
        if(!user) return res.status(404).send("Usuário não cadastrado.");

        next();
    } catch (e) {
        res.status(500).send(console.log(chalk.bold.red("Erro no authmiddleware"), e));
    }
}