//Classe responsável pela manipulação da Tabela do Banco de Dados

import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";

class User extends Model {
    static init(sequelize) {
        //Criação do método init, que precisa receer o objeto sequelize
        super.init(
            //recebe SUPER, Pra chamar o Init da classe Model, já que foi estendida (extends)
            {
                //Definição dos campos Model
                name: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL, //Só serve para capturar a informação e não vai persistir a informação
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
                name: {
                    singular: "user",
                    plural: "users",
                },
            }
        );
        this.addHook("beforeSave", async (user) => {
            if (user.password) {
                user.password_hash = await bcrypt.hash(user.password, 8);
            }
        });
    }

    checkPassword(password) {
        return bcrypt.compare(password, this.password_hash); //Etapa que compara onde a senha que o usuário digitou é a mesma que a do banco
    }
}

export default User;
