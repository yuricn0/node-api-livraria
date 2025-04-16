import express from 'express';
import autorController from '../controllers/autorController.js';

const router = express.Router();

router
    .get('/autores', autorController.listarAutores)
    .get('/autores/:id', autorController.buscarAutorPorId)
    .post('/autores', autorController.cadastrarAutor)
    .put('/autores/:id', autorController.atualizarAutor)
    .delete('/autores/:id', autorController.deletarAutor);

export default router;
