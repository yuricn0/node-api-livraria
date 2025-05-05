class ErroBase extends Error {
    constructor(message = 'Erro interno do servidor', statusCode = 500) {
        super();
        this.message = message;
        this.statusCode = statusCode;
    }

    enviarResposta(res) {
        res.status(this.statusCode).json({ message: this.message, statusCode: this.statusCode });
    }
}

export default ErroBase;