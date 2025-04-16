import {Op} from "sequelize";  //Op de Operação

import "./database";

import Customer from "./app/models/Customer";


class Playground {
    static async play() {              
        const customers = await Customer.findAll({ 
            where: {         
            [Op.or]: {                      //Isola uma opção ou outra na pesquisa dentre as abaixo/multiplicas opções        
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], //Intervalo entre datas
             },

            /* createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], //Intervalo entre datas
             }, */

         /* createdAt: {
            [Op.gte]: new Date(),    //gte maior que,  lte menor que..
         },*/
            /*   name: {
                [Op.like]: "Dev%",
            }    */  
        },
       });  
        
     
     
        /*  const customers = await Customer.findAll({ 
            where: {                                 //Pesquisar utilizando o where
              status:  {
                    [Op.ne]: "ACTIVE",           // Retorna todos não são ACTIVE, retorna ao contrario do que esta no filtro.  
              },
            },        
       });   */
        
        
        /* const customers = await Customer.findAll({ 
              where: {                                  //Pesquisar utilizando o where
                status:  {
                      [Op.eq]: "ACTIVE",   // Retorna todos que estão com os status ativos  
                },
              },        
         });   */
       
        // const customer = await Customer.findByPk(1); //Buscar pelo ID 
        
        /*  const customer = await Customer.findOne({      Busca especifica e exclusao
            attributes: {exclude: ["status", "id"]},
            }); */ 
        
        
        /* const customers = await Customer.findAll({
           attributes: {exclude: ["status", "id"]},   / Excluir uma coluna especifica
             attributes: ["id","name"],                 Busca por conteudo especifico
        });  */

       /*  const customers = await Customer.findAll(); Busca todos no banco de dados
       */

        console.log(JSON.stringify(customers, null, 2)); 
    }
}

Playground.play(); 