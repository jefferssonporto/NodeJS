//Classe responsável pela manipulação da Tabela do Banco de Dados

import Sequelize, { Model, Op } from "sequelize";

class Customer extends Model {
    static init (sequelize) {           //Criação do método init, que precisa receer o objeto sequelize
        super.init(                     //recebe SUPER, Pra chamar o Init da classe Model, já que foi estendida (extends)
            {                       //Definição dos campos Model
            name: Sequelize.STRING,
            email: Sequelize.STRING,
            status: Sequelize.ENUM("ACTIVE", "ARCHIVED"),    
        },
        {
            scopes: {    //Criando um Scopo
                active: {
                    where: {
                        status: "ACTIVE"
                    },
                    order: ["createdAt"],
                },

                Jefferson: {
                    where: {
                        name: "Dev Jefferson"
                    },
                },

               created(date){   //Passar parametros no scopo, como se fosse uma função
                return {
                    where: {
                        createdAt:{
                            [Op.gte]:  date,
                        }
                    }
                }
               } 
            },
            sequelize,
        }
     );
    }
    static associate(models) {
        this.hasMany(models.Contact);  //usado para definir um relacionamento de um-para-muitos entre modelos (tabelas).
    }
}

export default Customer;