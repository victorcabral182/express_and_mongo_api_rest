import express from "express"
import routes from "./routes/index.js"
import conectaNaDatabase from "./config/dbConnect.js"

const conexao = await conectaNaDatabase()

conexao.on("error", (err) => {
  console.error("Erro de conexão: ", err)
})

conexao.once("open", () => {
  console.log("Conexão com o banco feita com sucesso!")
})

const app = express()
routes(app)

export default app
