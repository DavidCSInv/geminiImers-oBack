// Importando os módulos necessários
import express from "express"; // Framework para gerenciar rotas e requisições HTTP
import multer from "multer"; // Biblioteca para lidar com upload de arquivos
import cors from "cors"
import { atualizaNovoPost, listarPosts, NovoPost, uploadImagem } from "../controllers/postsController.js"; // Importação de controladores relacionados a posts
import listarUsuarios from "../controllers/usuariosController.js"; // Importação do controlador relacionado a usuários

const corsOptions = {
    origin: "http://localhost:8000",
    optionsSucessStatus:200
}

// Configuração de armazenamento para uploads com multer
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        // Define a pasta onde os arquivos enviados serão salvos
        cb(null, 'uploads/');
    },
    filename: function(req, file, cb) {
        // Define o nome do arquivo salvo como o nome original do arquivo enviado
        cb(null, file.originalname);
    }
});

// Inicialização do middleware multer com a configuração de destino e armazenamento
const upload = multer({ dest: "./uploads", storage }); 
// Nota: Em sistemas Linux/macOS, o `dest` sozinho pode funcionar sem a necessidade de storage.

// Função que define as rotas da aplicação
const routes = (app) => {
    app.use(express.json()); // Middleware para habilitar o parsing de JSON no corpo das requisições

    app.use(cors(corsOptions))
    // Rota para listar todos os posts
    app.get("/posts", listarPosts);

    // Rota para listar todos os usuários
    app.get("/usuarios", listarUsuarios);

    // Rota para criar um novo post
    app.post("/posts", NovoPost);

    // Rota para realizar upload de uma imagem e executar o controlador de upload
    app.post("/upload", upload.single("imagem"), uploadImagem);

    app.put("/upload/:id",atualizaNovoPost);
};

export default routes; // Exporta a configuração das rotas para ser utilizada em outro arquivo
