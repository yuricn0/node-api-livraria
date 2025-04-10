import livro from "../models/Livro.js";

class LivroController {

      static async listarLivros(req, res) {
            try {
                  const livros = await livro.find({});
                  res.status(200).json(livros);
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao listar livros!`
                  });
            }
      }

      static async buscarLivroPorId(req, res) {
            try {
                  if (!req.params.id) {
                        res.status(400).json({
                              message: "ID do livro não informado!"
                        });
                        return;
                  }

                  if (!livro.findById(req.params.id)) {
                        res.status(404).json({
                              message: "Livro não encontrado!"
                        });
                        return;
                  }
                  const livroEscolhido = await livro.findById(req.params.id);
                  res.status(200).json(livroEscolhido);
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao buscar livro!`
                  });
            }
      }

      static async cadastrarLivro(req, res) {
            try {
                  const novoLivro = await livro.create(req.body);
                  res.status(201).json({
                        message: "Livro cadastrado com sucesso!",
                        livro: novoLivro
                  });
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao cadastrar livro!`
                  });
            }
      }

      static async atualizarLivro(req, res) {
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

      static async deletarLivro(req, res) {
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

}

export default LivroController;