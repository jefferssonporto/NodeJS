'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("contact", { 
        id: { type: Sequelize.INTEGER,
            type: Sequelize.INTEGER, 
            allowNull: false,              
            autoIncrement: true,            
            primaryKey: true, 
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
             customer_id: {
                type: Sequelize.INTEGER,
                references: {model: "customers", key: "id"}, 
                onUpdate: "CASCADE",            
                onDelete: "CASCADE",
                allowNull: false,
             }
    }); 
  },

   down: queryInterface => {
     return queryInterface.dropTable("contact");
     
  }
};
