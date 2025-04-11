import express from "express";
import livroController from "../controllers/livroController.js";

const router = express.Router();

router.get("/livros", livroController.listarLivros);
router.get("/livros/busca", livroController.listarLivrosPorEditora);
router.get("/livros/:id", livroController.buscarLivroPorId);
router.post("/livros", livroController.cadastrarLivro);
router.put("/livros/:id", livroController.atualizarLivro);
router.delete("/livros/:id", livroController.deletarLivro);


export default router;