const express = require("express");
const server = express();

// http:localhost:3000/hello?nome&idade=28
// Query Params = ?nome = jefferson&idade=28 

// http:localhost:3000/hello/jefferson
// Route Params - /hello/:nomedoparametro

server.get("/hello", (req, res) => { //Sempre que bater na rota hello e ela for do tipo GET, eu vou responder alguma coisa
    const {nome, idade} = req.query;

    return res.json({ 
        title: "Hello World",
        message: `Olá ${nome} tudo bem !?`,
        idade: idade
    });     // Resposta          
});  

server.get("/hello/:nome", (req,res) => {

    const {nome, idade} = req.params;

    return res.json({ 
        title: "Hello World",
        message: `Olá ${nome} tudo bem !?`,
        
    });     // Resposta     
});

server.listen(3000); // Porta que eu quero trabalhar
// Normalmente utiliza-se as portas 3000  5000  8000  8080
