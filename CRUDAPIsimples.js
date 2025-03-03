const express = required("express");
const server = express();

server.use(express.json());

let customers = [
    {id: 1, name: "Dev Jefferson", site: "https://www.linkedin.com/in/jefferson-de-oliveira-porto-869067277/" },
    {id: 2, name: "Google", site:  "https://www.google.com/"},
    {id: 3, name: "UOL", site: "https://www.uol.com.br/"}
];

server.get("/customers", (req, res) => {
    return res.json(customers);
});

server.get("/customers/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const customer = customers.find(item => item.id == id);
    const status = customer ? 200 : 404;  

    return res.status(status).json(customer);
});

server.listen(3000);