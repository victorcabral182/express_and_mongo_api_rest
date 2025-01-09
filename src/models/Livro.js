import mongoose from "mongoose"

const livroSchema = new mongoose.Schema(
  {
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
      enum: {
        values: ["Casa do código", "Alura"],
        message: "A editora {VALUE} não é um valor permitido",
      },
    },
    numeroPaginas: {
      type: Number,
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000
        },
        message:
          "O número de páginas deve estar entre 10 e 5000, valor fornecido: {VALUE}",
      },
    },
  },
  { versionKey: false }
)

const livros = mongoose.model("livros", livroSchema)

export default livros
