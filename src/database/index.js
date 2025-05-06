//Carregar os Models dentro da aplicação

import  Sequelize  from "sequelize";

import config from "../config/database";

import Customer from "../app/models/Customer";
import Contact from "../app/models/Contact";
import User from "../app/models/User";


const models = [Customer, Contact, User];       //models

class Database {
    constructor() {
        this.connection = new Sequelize(config);
        this.init();
        this.associate();
    }

    init() {                //Chamada do Init de cada módel
        models.forEach(model => model.init(this.connection));
    }    
    
    associate() {
        models.forEach(model => {
            if (model.associate) {
                model.associate (this.connection.models);
            }
        });
    }

    associate() {
        models.forEach(model => {
            if (model.associate) {
                model.associate(this.connection.models);
            }
        });
    }
 }

export default new Database();