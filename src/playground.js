import "./database";

import Customer from "../src/app/models/Custormer";


class Playground {
    static async play() {
        const customers = await Customer.findAll();

        console.log(JSON.stringify(customers, null, 2)); 
    }
}

Playground.play(); 