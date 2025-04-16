import "./database";

import Customer from "./app/models/Customer";


class Playground {
    static async play() {
        const customers = await Customer.findAll({
         //  attributes: {exclude: ["status", "id"]},     excluir uma coluna especifica
           //  attributes: ["id","name"],   busca por conteudo especifico
        });

        console.log(JSON.stringify(customers, null, 2)); 
    }
}

Playground.play(); 