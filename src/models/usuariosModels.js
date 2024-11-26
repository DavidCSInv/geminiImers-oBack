import conectarAoBanco from "../config/db.config.js";
const conexao = await conectarAoBanco(process.env.STRING_CONEXAO);

async function getTodosUsuarios() {
    const db = conexao.db("imersao-instabytes");
    const colecao = db.collection("usuarios");
    return colecao.find().toArray();
}

export default getTodosUsuarios;