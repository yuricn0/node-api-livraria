import NaoEncontrado from '../erros/NaoEncontrado.js';
import { autores } from '../models/index.js';

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const autoresResultado = await autores.find({});
            res.status(200).json(autoresResultado);
        } catch (error) {
            next(error);
        }
    };

    static buscarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorEscolhido = await autores.findById(id);

            if (
                autorEscolhido !== null &&
                autorEscolhido !== undefined &&
                autorEscolhido !== ''
            ) {
                res.status(200).json(autorEscolhido);
            } else {
                next(new NaoEncontrado('ID do autor não encontrado!', 404));
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autores.create(req.body);
            res.status(201).json({
                message: 'Autor cadastrado com sucesso!',
                autor: novoAutor,
            });
        } catch (error) {
            next(error);
        }
    };

    static atualizarAutor = async (req, res, next) => {
        try {
            const autorAtualizado = await autores.findByIdAndUpdate(
                req.params.id,
                req.body
            );
            if (!autorAtualizado) {
                next(new NaoEncontrado('ID do autor não encontrado!', 404));
            }
            res.status(200).json({
                message: 'Autor atualizado com sucesso!',
                autor: autorAtualizado,
            });
        } catch (error) {
            next(error);
        }
    };

    static deletarAutor = async (req, res, next) => {
        try {
            await autores.findByIdAndDelete(req.params.id);
            if (!autores) {
                next(new NaoEncontrado('ID do autor não encontrado!', 404));
            }
            res.status(200).json({
                message: 'Autor deletado com sucesso!',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default AutorController;
