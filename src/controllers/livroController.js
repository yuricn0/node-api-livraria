import { autor } from '../models/Autor.js';
import livro from '../models/Livro.js';

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livro.find().populate('autor').exec();

            res.status(200).json(livrosResultado);
        } catch (error) {
            next(error);
        }
    };

    static buscarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroEscolhido = await livro
                .findById(id)
                .populate('autor', 'nome')
                .exec();

            res.status(200).json(livroEscolhido);
        } catch (error) {
            next(error);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let novoLivro = new livro(req.body);
            const autorEncontrado = await autor.findById(novoLivro.autor);
            const livroCompleto = {
                ...novoLivro,
                autor: { ...autorEncontrado._doc },
            };
            const livroCriado = await livro.create(livroCompleto);
            res.status(201).json({
                message: 'Livro cadastrado com sucesso!',
                livro: livroCriado,
            });
        } catch (error) {
            next(error);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroAtualizado = await livro.findByIdAndUpdate(
                id,
                {$set: req.body}
            );

            res.status(200).json({
                message: 'Livro atualizado com sucesso!',
                livro: livroAtualizado,
            });
        } catch (error) {
            next (error);
        }
    };

    static deletarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            await livro.findByIdAndDelete(id);

            res.status(200).json({
                message: 'Livro deletado com sucesso!',
            });
        } catch (error) {
            next(error);
        }
    };

    static listarLivrosPorEditora = async (req, res, next) => {
        try {
            const editora = req.query.editora;

            const livrosPorEditora = await livro.find({ "editora": editora });

            res.status(200).json(livrosPorEditora);
        } catch (error) {
            next (error);
        }
    }
}

export default LivroController;
