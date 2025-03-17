//Importação das bibliotecas
const express = require("express");
const routes = require("./routes");

//As classes onde vai conter a lógica
class App {
    constructor(){
        this.server = express();
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.server.use(express.json());
    }

    routes() {
        this.server.use(routes);
    }
}

//Tudo que eu quero exportar
module.exports = new App().server;

