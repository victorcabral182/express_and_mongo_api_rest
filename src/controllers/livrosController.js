import { autores, livros } from "../models/index.js"
import NaoEncontrado from "../erros/NaoEncontrado.js"

class LivroController {
  static listarLivrosPaginado = async (req, res, next) => {
    try {
      const buscaLivros = livros.find()
      req.resultado = buscaLivros
      next()
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorId = async (req, res, next) => {
    try {
      const id = req.params.id
      const livroResultados = await livros.findById(id)
      if (livroResultados !== null) res.status(200).send(livroResultados)
      else next(new NaoEncontrado("Id do livro não localizado"))
    } catch (erro) {
      next(erro)
    }
  }

  static cadastrarLivro = async (req, res, next) => {
    try {
      let livro = new livros(req.body)
      const livroResultado = await livro.save()
      res.status(201).send(livroResultado.toJSON())
    } catch (erro) {
      next(erro)
    }
  }

  static atualizarLivro = async (req, res, next) => {
    try {
      const id = req.params.id
      await livros.findByIdAndUpdate(id, { $set: req.body })
      res.status(200).send({ message: "Livro atualizado com sucesso" })
    } catch (erro) {
      next(erro)
    }
  }

  static excluirLivro = async (req, res, next) => {
    try {
      const id = req.params.id
      await livros.findByIdAndDelete(id)
      res.status(200).send({ message: "Livro removido com sucesso" })
    } catch (erro) {
      next(erro)
    }
  }

  static listarLivroPorFiltro = async (req, res, next) => {
    try {
      const busca = await processaBusca(req.query, next)
      if (busca !== null) {
        const livrosResultado = livros.find(busca)
        req.resultado = livrosResultado
        next()
      } else {
        res.status(200).send([])
      }
    } catch (erro) {
      next(erro)
    }
  }
}

async function processaBusca(params) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = params

  let busca = {}

  if (editora) busca.editora = { $regex: editora, $options: "i" }
  if (titulo) busca.titulo = { $regex: titulo, $options: "i" }

  if (nomeAutor) {
    const autor = await autores.findOne({
      nome: { $regex: nomeAutor, $options: "i" },
    })
    if (autor !== null) {
      busca.autor = autor._id
    } else {
      busca = null
    }
  }

  if (minPaginas || maxPaginas) busca.numeroPaginas = {}
  // gte = maior ou igual
  if (minPaginas) busca.numeroPaginas.$gte = minPaginas
  // lte = menor ou igual
  if (maxPaginas) busca.numeroPaginas.$lte = maxPaginas

  return busca
}

export default LivroController
