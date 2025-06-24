//Importação das bibliotecas
import "dotenv/config";

import express from "express";
import Youch from "youch";
import "express-async-errors";

import authMiddleware from "./app/middlewares/auth.js";
import routes from "./routes.js";

import "./database";
import { next } from "sucrase/dist/types/parser/tokenizer";

//As classes onde vai conter a lógica
class App {
    constructor() {
        this.server = express();
        this.middlewares();
        this.routes();
        this.exceptionHandler();
    }

    middlewares() {
        this.server.use(express.json());
        this.server.use(express.urlencoded({ extended: false }));
        this.server.use(authMiddleware);
    }

    routes() {
        this.server.use(routes);
    }

    exceptionHandler() {
        this.server.use(async (err, req, res, next) => {
            if (process.env.NODE_ENV === "development") {
                const errors = await new Youch(err, req).toJSON();
                return res.status(500).json(errors);
            }
        });
    }
}

//Tudo que eu quero exportar
export default new App().server;
