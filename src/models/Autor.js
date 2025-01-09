import mongoose from "mongoose"
import autopopulate from "mongoose-autopopulate"

const autorSchema = new mongoose.Schema(
  {
    id: { type: String },
    nome: {
      type: String,
      required: [true, "O nome do(a) autor(a) é obrigatório"],
    },
    nacionalidade: { type: String },
  },
  {
    versionKey: false,
  }
)

autorSchema.plugin(autopopulate)

const autores = mongoose.model("autores", autorSchema)

export default autores
