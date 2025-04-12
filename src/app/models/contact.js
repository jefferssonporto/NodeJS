//Classe responsável pela manipulação da Tabela do Banco de Dados

import Sequelize, { Model } from "sequelize";

class Contact extends Model {
    static init (sequelize) {           //Criação do método init, que precisa receer o objeto sequelize
        super.init(                     //recebe SUPER, Pra chamar o Init da classe Model, já que foi estendida (extends)
            {                       //Definição dos campos Model
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),    
        },
        {
            sequelize,
        }
     );
    }
    static associate(models) {
        this.belongsTo(models.Customer, {foreignKey: "customer_id"});  //Relacionamentos muito pra um,  é o “par” do hasMany.
    }
}

export default Contact;