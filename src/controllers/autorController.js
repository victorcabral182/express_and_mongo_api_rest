import { autor, autorSchema } from "../models/AutorModel.js"

class AutorController {
  static async listarAutores(_, res) {
    try {
      const listaAutores = await autor.find({})
      res.status(200).json(listaAutores)
    } catch (e) {
      res.status(500).json({ message: `${e.message} - Falha na requisição` })
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id
      const autorEncontrado = await autor.findById(id)
      res.status(200).json(autorEncontrado)
    } catch (e) {
      res.status(500).json({ message: `${e.message} - Falha ao buscar autor` })
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      await autor.create(req.body)
      const listaAutores = await autor.find({})
      res
        .status(201)
        .json({ message: "Livro criado com sucesso", itens: listaAutores })
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - FALHA AO CADASTRAR LIVRO` })
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id
      await autor.findByIdAndUpdate(id, req.body)
      const listaAutores = await autor.find({})
      res.status(200).json({ message: "Livro atualizado", itens: listaAutores })
    } catch (e) {
      console.log("asd")
      res
        .status(500)
        .json({ message: `${e.message} - Falha ao atualizar autor` })
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id
      await autor.findByIdAndDelete(id)
      const lista = await autor.find({})
      res
        .status(200)
        .json({ message: "Livro excluído com sucesso!", itens: lista })
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - OCORREU UM ERRO AO EXCLUIR O LIVRO` })
    }
  }
}

export default AutorController
