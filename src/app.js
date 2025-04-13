//Importação das bibliotecas
import express from "express";
import routes from "./routes";

import "./database";


//As classes onde vai conter a lógica
class App {
    constructor() {
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
export default new App().server;
