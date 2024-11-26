import getTodosUsuarios from "../models/usuariosModels.js";

async function listarUsuarios (req,res) {
    const result = await getTodosUsuarios();
    res.status(200).json(result);
}

export default listarUsuarios;