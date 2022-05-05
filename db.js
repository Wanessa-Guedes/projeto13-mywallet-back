import { MongoClient } from "mongodb";
import dotenv from "dotenv";

dotenv.config();

let db = null;
const mongoClient = new MongoClient(process.env.MONGO_URI);

await mongoClient.connect();

db = mongoClient.db("mywallet");

export default db;
