import express from "express";
import autorController from "../controllers/autorController.js";

const router = express.Router();

router.get("/autores", autorController.listarAutores);
router.get("/autores/:id", autorController.buscarAutorPorId);
router.post("/autores", autorController.cadastrarAutor);
router.put("/autores/:id", autorController.atualizarAutor);
router.delete("/autores/:id", autorController.deletarAutor);

export default router;