import express from "express"
import AutorController from "../controllers/autorController.js"

const autores = express.Router()

autores.get("/autores", AutorController.listarAutores)
autores.get(`/autores/:id`, AutorController.listarLivroPorId)

autores.post("/autores", AutorController.cadastrarLivro)

autores.put(`/autores/:id`, AutorController.atualizarLivro)

autores.delete("/autores/:id", AutorController.excluirLivro)

export default autores
