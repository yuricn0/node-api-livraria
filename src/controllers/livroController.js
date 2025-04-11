import { autor } from "../models/Autor.js";
import livro from "../models/Livro.js";

class LivroController {

      static listarLivros = async (req, res) => {
            try {
                  const livros = await livro.find({});
                  res.status(200).json(livros);
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao listar livros!`
                  });
            }
      }

      static buscarLivroPorId = async (req, res) => {
            try {          
                  const livroEscolhido = await livro.findById(req.params.id);
                  res.status(200).json(livroEscolhido);
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao buscar livro!`
                  });
            }
      }

      static cadastrarLivro = async (req, res) => {
            const novoLivro = req.body;
            try {
                  const autorEncontrado = await autor.findById(novoLivro.autor);
                  const livroCompleto = { ...novoLivro,
                        autor: { ... autorEncontrado._doc }};
                  const livroCriado = await livro.create(livroCompleto);
                  res.status(201).json({
                        message: "Livro cadastrado com sucesso!",
                        livro: livroCriado
                  });
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao cadastrar livro!`
                  });
            }
      }

      static atualizarLivro = async (req, res) => {
            try {
                  const livroAtualizado = await livro.findByIdAndUpdate(req.params.id, req.body);
                  res.status(200).json({
                        message: "Livro atualizado com sucesso!",
                        livro: livroAtualizado
                  });
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao atualizar livro!`
                  });
            }
      }

      static deletarLivro = async (req, res) => {
            try {
                  await livro.findByIdAndDelete(req.params.id);
                  res.status(200).json({
                        message: "Livro deletado com sucesso!"
                  });                
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao deletar livro!`
                  });
            }
      }

      static async listarLivrosPorEditora(req, res) {
            const editora = req.query.editora;
            try {
                  const livrosPorEditora = await livro.find({ editora: editora });
                  res.status(200).json(livrosPorEditora);
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao listar livros por editora!`
                  });           
            }
      }
}

export default LivroController;