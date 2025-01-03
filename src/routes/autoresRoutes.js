import express from "express"
import AutorController from "../controllers/autorController.js"

const autores = express.Router()

autores.get("/autores", LivroController.listarLivros)
autores.get(`/autores/:id`, LivroController.listarLivroPorId)

autores.post("/autores", LivroController.cadastrarLivro)

autores.put(`/autores/:id`, LivroController.atualizarLivro)

autores.delete("/autores/:id", LivroController.excluirLivro)

export default autores
