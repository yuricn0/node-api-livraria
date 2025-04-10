import express from "express";
import conectaBD from "./config/dbConnect.js";
import livro from "./models/Livro.js";     

const conexao = await conectaBD();

conexao.on("error", (erro) => {
      console.error("Erro na conexão com o banco de dados", erro);
});

conexao.once("open", () => {
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
})

const app = express();
app.use(express.json());

app.get("/", (req, res) => {
      res.status(200).send("Bem-vindo à Livraria da Alura!");
});

app.get("/livros", async (req, res) => {
      const livros = await livro.find({});
      res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
      const index = buscaLivro(req.params.id);
      res.status(200).json(livros[index]);
})

app.post("/livros", (req, res) => {
      const livro = req.body;
      livros.push(livro);
      res.status(201).send("Livro cadastrado com sucesso!");
});

app.put("/livros/:id", (req, res) => {
      if (buscaLivro(req.params.id) === -1) {
            return res.status(404).send("Livro não encontrado para atualização!");
      }
      const index = buscaLivro(req.params.id);
      livros[index] = req.body;
      res.status(200).send("Livro atualizado com sucesso!");
});

app.patch("/livros/:id", (req, res) => {
      if (buscaLivro(req.params.id) === -1) {
            return res.status(404).send("Livro não encontrado para atualização!");
      }
      const index = buscaLivro(req.params.id);
      livros[index].titulo = req.body.titulo;
      res.status(200).send("Livro atualizado com sucesso!");
});

app.delete("/livros/:id", (req, res) => {
      if (buscaLivro(req.params.id) === -1) {
            return res.status(404).send("Livro não encontrado!");
      }
      const index = buscaLivro(req.params.id);
      livros.splice(index, 1);
      res.status(204);
});





export default app;
