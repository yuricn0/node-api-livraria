import express from "express";

const app = express();
app.use(express.json());

const livros = [
      {
            id: 1,
            titulo: "O Senhor dos Anéis - A Sociedade do Anel"
      },
      {
            id: 2,
            titulo: "O Hobbit"
      }
]

function buscaLivro(id) {
      return livros.findIndex(livro => {
            return livro.id === Number(id)
      });
}

app.get("/", (req, res) => {
      res.status(200).send("Bem-vindo à Livraria da Alura!");
});

app.get("/livros", (req, res) => {
      res.status(200).json(livros);
});

app.get("/livros/:id", (req, res) => {
      if (buscaLivro(req.params.id) === -1) {
            return res.status(404).send("Livro não encontrado!");
      }
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

app.delete("/livros/:id", (req, res) => {
      if (buscaLivro(req.params.id) === -1) {
            return res.status(404).send("Livro não encontrado!");
      }
      const index = buscaLivro(req.params.id);
      livros.splice(index, 1);
      res.status(204);
});




export default app;
