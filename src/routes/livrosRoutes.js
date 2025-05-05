import express from 'express';
import livroController from '../controllers/livroController.js';

const router = express.Router();

router
    .get('/livros', livroController.listarLivros)
    .get('/livros/busca', livroController.listarLivrosPorFiltro)
    .get('/livros/:id', livroController.buscarLivroPorId)
    .post('/livros', livroController.cadastrarLivro)
    .put('/livros/:id', livroController.atualizarLivro)
    .delete('/livros/:id', livroController.deletarLivro);

export default router;
