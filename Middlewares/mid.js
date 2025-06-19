const express = require("express");
const { next } = require("sucrase/dist/types/parser/tokenizer");
const server = express();

//Middlewares Globais
server.use((req, res, next) => {
    console.log("Requisição atualizada com sucesso");
    next();
});

server.use((req, res, next) => {
    console.log(`${req.method} :: ${req.url}`);
    next();
});

server.use((req, res, next) => {
    console.time("timeLogger");

    next();

    console.timeEnd("timeLogger");
});

server.use((req, res, next) => {
    const { name } = req.query;
    if (!name) {
        return res.status(400).json({ error: "name param not found" });
    }

    next();
});

//Middlewares Locais

server.get("/hello", (req, res) => {
    const { name } = req.query;

    return res.json({
        title: "Hello!",
        message: `Olá ${name} tudo bem com você ?`,
    });
});

server.listen(3000);
