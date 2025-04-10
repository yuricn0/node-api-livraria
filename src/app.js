import express from "express";
import conectaBD from "./config/dbConnect.js";  
import routes from "./routes/index.js";  

const conexao = await conectaBD();

conexao.on("error", (erro) => {
      console.error("Erro na conexão com o banco de dados", erro);
});

conexao.once("open", () => {
      console.log("Conexão com o banco de dados estabelecida com sucesso!");
})

const app = express();
routes(app);

export default app;
