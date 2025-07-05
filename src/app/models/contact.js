//Classe responsável pela manipulação da Tabela do Banco de Dados

import Sequelize, { Model } from "sequelize";

class Contact extends Model {
    static init(sequelize) {
        //Criação do método init, que precisa receer o objeto sequelize
        super.init(
            //recebe SUPER, Pra chamar o Init da classe Model, já que foi estendida (extends)
            {
                //Definição dos campos Model
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),
            },
            {
                tableName: "contacts", // define o nome da tabela
                name: {
                    singular: "contact",
                    plural: "contacts",
                },
            }
        );
    }
    static associate(models) {
        this.belongsTo(models.Customer, {
            //Relacionamentos muito pra um,  é o “par” do hasMany.
            foreignKey: "customer_id",
            as: "customer",
        });
    }
}

export default Contact;
