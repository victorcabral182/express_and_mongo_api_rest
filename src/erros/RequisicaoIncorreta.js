import ErroBase from "./ErroBase.js"

class RequisicaoIncorreta extends ErroBase {
  constructor(mensagem) {
    super(mensagem, 400)
  }
}

export default RequisicaoIncorreta
