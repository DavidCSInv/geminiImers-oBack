import { ObjectId } from "mongodb";
import 'dotenv/config'
import conectarAoBanco from "../config/db.config.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

export async function getTodosPosts(){
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.find().toArray();
}

export async function criarPost(novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    return colecao.insertOne(novoPost);
}

export async function atualizarPost(id,novoPost) {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("posts");
    const objectId = ObjectId.createFromHexString(id)
    return colecao.updateOne({_id:new ObjectId(objectId)},{$set:novoPost});
}