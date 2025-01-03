import livro from "../models/LivroModel.js"

class LivroController {
  static async listarLivros(_, res) {
    try {
      const listaLivros = await livro.find({})
      res.status(200).json(listaLivros)
    } catch (e) {
      res.status(500).json({ message: `${e.message} - Falha na requisição` })
    }
  }

  static async listarLivroPorId(req, res) {
    try {
      const id = req.params.id
      const livroEncontrado = await livro.findById(id)
      res.status(200).json(livroEncontrado)
    } catch (e) {
      res.status(500).json({ message: `${e.message} - Falha ao buscar livro` })
    }
  }

  static async cadastrarLivro(req, res) {
    try {
      await livro.create(req.body)
      const listaLivros = await livro.find({})
      res
        .status(201)
        .json({ message: "Livro criado com sucesso", itens: listaLivros })
    } catch (e) {
      res
        .status(500)
        .json({ message: `${e.message} - FALHA AO CADASTRAR LIVRO` })
    }
  }

  static async atualizarLivro(req, res) {
    try {
      const id = req.params.id
      await livro.findByIdAndUpdate(id, req.body)
      const listaLivros = await livro.find({})
      res.status(200).json({ message: "Livro atualizado", itens: listaLivros })
    } catch (e) {
      console.log("asd")
      res
        .status(500)
        .json({ message: `${e.message} - Falha ao atualizar livro` })
    }
  }

  static async excluirLivro(req, res) {
    try {
      const id = req.params.id
      await livro.findByIdAndDelete(id)
      const lista = await livro.find({})
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

export default LivroController
