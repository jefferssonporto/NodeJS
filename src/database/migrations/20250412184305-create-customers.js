
//'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: (queryInterface, Sequelize) => {
   return queryInterface.createTable("customers", { 
    id: {
    type: Sequelize.INTEGER, 
    allowNull: false,               //Sempre que o ID for chave primaria, o Null é false.
    autoIncrement: true,            //fazer com que o contador se incremente automaticamente
    primaryKey: true,               //opção de chave primaria
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        email: {
            type: Sequelize.STRING,
            allowNull: false,
            unique: true,            //Só vai ser permitido 1 email por customers
             },
             create_at: {
                type: Sequelize.DATE,
                allowNull: false,
             },
             update_at: {
                type: Sequelize.DATE,
                allowNull: false,
             },
        });
    },

   down: queryInterface => {
    return queryInterface.dropTable("customers");
  }

};
