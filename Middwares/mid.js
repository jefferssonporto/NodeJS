const express = require("express");
const server = express();

server.get("/hello", (req, res) => {
    const { name } = req.query;

    return res.json({
        title: "Hello!",
        message: `Olá ${name} tudo bem com você ?`,
    });
});

server.listen(3000);
