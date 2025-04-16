import { autor } from '../models/Autor.js';

class AutorController {
    static listarAutores = async (req, res, next) => {
        try {
            const autores = await autor.find({});
            res.status(200).json(autores);
        } catch (error) {
            next(error);
        }
    };

    static buscarAutorPorId = async (req, res, next) => {
        try {
            const id = req.params.id;
            const autorEscolhido = await autor.findById(id);

            if (autorEscolhido !== null) {
                res.status(200).json(autorEscolhido);
            } else {
                res.status(404).json({
                    message: 'ID do autor não encontrado!',
                });
            }
        } catch (error) {
            next(error);
        }
    };

    static cadastrarAutor = async (req, res, next) => {
        try {
            const novoAutor = await autor.create(req.body);
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
            const autorAtualizado = await autor.findByIdAndUpdate(
                req.params.id,
                req.body
            );
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
            await autor.findByIdAndDelete(req.params.id);
            res.status(200).json({
                message: 'Autor deletado com sucesso!',
            });
        } catch (error) {
            next(error);
        }
    };
}

export default AutorController;
