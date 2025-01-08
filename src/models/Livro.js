import mongoose from "mongoose"

const livroSchema = new mongoose.Schema({
  id: { type: String },
  titulo: {
    type: String,
    required: [true, "O título do livro é um campo obrigatório."],
  },
  autor: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "autores",
    required: [true, "O autor(a) do livro é um campo obrigatório."],
  },
  editora: {
    type: String,
    required: [true, "A editora do livro é um campo obrigatório."],
  },
  numeroPaginas: { type: Number },
})

const livros = mongoose.model("livros", livroSchema)

export default livros
