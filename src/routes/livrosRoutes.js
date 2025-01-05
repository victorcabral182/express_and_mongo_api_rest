import express from "express"
import LivroController from "../controllers/livroController.js"

const livros = express.Router()

livros.get("/livros", LivroController.listarLivros)
livros.get("/livros/busca", LivroController.listarLivrosPorEditora)
livros.get(`/livros/:id`, LivroController.listarLivroPorId)

livros.post("/livros", LivroController.cadastrarLivro)

livros.put(`/livros/:id`, LivroController.atualizarLivro)

livros.delete("/livros/:id", LivroController.excluirLivro)

export default livros
