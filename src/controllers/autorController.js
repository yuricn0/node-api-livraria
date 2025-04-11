import { autor } from "../models/Autor.js";
import mongoose from "mongoose";

class AutorController {

      static listarAutores = async (req, res) => {
            try {
                  const autores = await autor.find({});
                  res.status(200).json(autores);
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao listar autores!`
                  });
            }
      }

      static buscarAutorPorId = async (req, res)  => {
            try {    
                  const id = req.params.id; 
                  const autorEscolhido = await autor.findById(id);

                  if (autorEscolhido !== null) {
                        res.status(200).json(autorEscolhido);
                  
                  } else {
                        res.status(404).json({
                              message: "ID do autor não encontrado!"
                        });
                  }
            } catch (error) {
                  if (error instanceof mongoose.Error.CastError) {
                        res.status(400).json({
                              message: "Dados fornecidos estão incorretos!"});         
                  } else {
                        res.status(500).json({
                              message: `${error.message} - Erro interno de servidor!`
                        });   
                  }
            }
              
      }

      static cadastrarAutor = async (req, res)  => {
            try {
                  const novoAutor = await autor.create(req.body);
                  res.status(201).json({
                        message: "Autor cadastrado com sucesso!",
                        autor: novoAutor
                  });
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao cadastrar autor!`
                  });
            }
      }

      static atualizarAutor = async (req, res)  => {
            try {
                  const autorAtualizado = await autor.findByIdAndUpdate(req.params.id, req.body);
                  res.status(200).json({
                        message: "Autor atualizado com sucesso!",
                        autor: autorAtualizado
                  });
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao atualizar dados do autor!`
                  });
            }
      }

      static deletarAutor = async (req, res) => {
            try {
                  await autor.findByIdAndDelete(req.params.id);
                  res.status(200).json({
                        message: "Autor deletado com sucesso!"
                  });                
            } catch (error) {
                  res.status(500).json({
                        message: `${error.message} - Falha ao deletar autor!`
                  });
            }
      }

}

export default AutorController;