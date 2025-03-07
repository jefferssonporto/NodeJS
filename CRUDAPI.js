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


// Update de customers existentes utilizando FindIndex e utilizando calculo de status
server.put("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const {name, site } = req.body;

    const index = customers.findIndex(item => item.id === id);
    const status = index >= 0 ? 200 : 404; //se o index for maior ou igual a 0, status é 200, se não 404
    
    if(index >= 0) {   //Se o index é maior ou igual a 0 vou alterar o Array
        customers[index] = {id: parseInt(id), name, site};
    }

    return res.status(status).json(customers[index]); //resposta para o servirdor

});

server.listen(3000);