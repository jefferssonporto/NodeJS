const express = required("express");
const server = express();

server.use(express.json());

let customers = [
    {id: 1, name: "Dev Jefferson", site: "https://www.linkedin.com/in/jefferson-de-oliveira-porto-869067277/" },
    {id: 2, name: "Google", site:  "https://www.google.com/"},
    {id: 3, name: "UOL", site: "https://www.uol.com.br/"}
]; //Array

server.get("/customers", (req, res) => {
    return res.json(customers);
});

server.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id == id);
    const status = customer ? 200 : 404; //se retorna 200 ou 404, no caso retornou 404  

    return res.status(status).json(customer);
});

server.post("/customers", (req, res) => {
    const { name, site } = req.body; //conteudo da mensagem(JSON)
    const nextId = customers[customers.length -1].id + 1;

    const newCustomer = {id, name, site};
    customers.push(newCustomer);

    return res.status(201).json(newCustomer); //MAnipulação de Array com retorno em 201
});

server.listen(3000);