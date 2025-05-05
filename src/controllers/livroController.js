import NaoEncontrado from '../erros/NaoEncontrado.js';
import { livros } from '../models/index.js';

class LivroController {
    static listarLivros = async (req, res, next) => {
        try {
            const livrosResultado = await livros
                .find()
                .populate('autor')
                .exec();

            res.status(200).json(livrosResultado);
        } catch (error) {
            next(error);
        }
    };

    static buscarLivroPorId = async (req, res, next) => {
        try {
            const id = req.params.id;

            const livroEscolhido = await livros
                .findById(id)
                .populate('autor', 'nome')
                .exec();
            if (!livroEscolhido) {
                next(new NaoEncontrado('ID do livro não encontrado!', 404));
            }

            res.status(200).json(livroEscolhido);
        } catch (error) {
            next(error);
        }
    };

    static cadastrarLivro = async (req, res, next) => {
        try {
            let novoLivro = new livros(req.body);
            const livroCompleto = await novoLivro.save();
            res.status(201).json({
                message: 'Livro cadastrado com sucesso!',
                livro: livroCompleto,
            });
        } catch (error) {
            next(error);
        }
    };

    static atualizarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;
            const livroAtualizado = await livros.findByIdAndUpdate(id, {
                $set: req.body,
            });
            if (!livroAtualizado) {
                next(new NaoEncontrado('ID do livro não encontrado!', 404));
            }

            res.status(200).json({
                message: 'Livro atualizado com sucesso!',
                livro: livroAtualizado,
            });
        } catch (error) {
            next(error);
        }
    };

    static deletarLivro = async (req, res, next) => {
        try {
            const id = req.params.id;

            await livros.findByIdAndDelete(id);

            if (!livros) {
                next(new NaoEncontrado('ID do livro não encontrado!', 404));
            }

            res.status(200).json({
                message: 'Livro deletado com sucesso!',
            });
        } catch (error) {
            next(error);
        }
    };

    static listarLivrosPorFiltro = async (req, res, next) => {
        try {
            const { editora, titulo } = req.query;

            const busca = {};
            if (editora) busca.editora = editora;
            if (titulo) busca.titulo = titulo;

            const livrosResultado = await livros.find(busca);

            if (!livrosResultado) {
                next(new NaoEncontrado('Editora não encontrada!', 404));
            }

            res.status(200).json(livrosResultado);
        } catch (error) {
            next(error);
        }
    };
}

export default LivroController;
