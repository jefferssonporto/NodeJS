//Classe responsável pela manipulação da Tabela do Banco de Dados

import Sequelize, { Model } from "sequelize";

class User extends Model {
    static init (sequelize) {           //Criação do método init, que precisa receer o objeto sequelize
        super.init(                     //recebe SUPER, Pra chamar o Init da classe Model, já que foi estendida (extends)
            {                       //Definição dos campos Model
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            password_hash: Sequelize.STRING,
            provider: Sequelize.BOOLEAN,    
        },
        {
            sequelize,
        }
     );
    }
}

export default User;