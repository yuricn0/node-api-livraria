import ErroBase from "./ErroBase.js";

class NaoEncontrado extends ErroBase {
    constructor(mensagem = 'Rota não encontrada!') {
        super(mensagem, 404);
    }
}

export default NaoEncontrado;