import {Op} from "sequelize";  //Op de Operação

import "./database";

import Customer from "./app/models/Customer";

//INSERT
class Playground {       
    static async play() {   
        const customer = await Customer.create({
            name: "megamega", email: "faq@megamega.com.br"
        });   
       //  console.log(JSON.stringify(customers2, null, 2));
     } 
 }
    Playground.play();

        /*const customers = await Customer.scope({
        method: ["created", (new Date(2025,12,1))]
    }).findAll(); 
       // const customers = await Customer.scope("active").findAll(); Vai retornar todos os Scopos Ativos
        

       const customers = await Customer.scope(["active", "Jefferson"]).findAll(); //Dando Where nos dois Scopos, não dá pra manipular com dois scopos com mesmo nome em campos diferentes.
       */
/*
        //Misturando 2 scopos
       const customers1 = await Customer.scope(["active", "Jefferson"]).findAll();
       console.log(JSON.stringify(customers1, null, 2));

       const customers2 = await Customer.scope([            //Precisa estar dentro de um Array
        ["active"], 
       { method: ["created", new Date(2025,12,1)]}
       ]).findAll(); 
       
        console.log(JSON.stringify(customers2, null, 2));
    } 
}
    /*




//Usando o Where com Sequelize SELECT* FROM customer WHERE
/* class Playground {       
    static async play() {   
        // const customer = await Customer.findByPk(1);     Basta somente colocar o ID, no caso "1".
        

       /* const customer = await Customer.findOne({         //FindOne busca a primeira opção
            attributes: {exclude: ["status", "id"]},
        });
        */

       /*const customers = await Customer.findAll({
            attributes: {exclude: ["status"]},
        }); */

       /* const customers = await Customer.findAll({
           // attributes: {exclude: ["status"]},
            where: {
                [Op.or] :{      //Para isolar uma opção, uma ou outra, no caso status ou name
                status: {
                        [Op.eq]: ["ACTIVE", "ARCHIVED"],  //[Op.ne] o inverso, tudo que não é ativo
                },          
            },
              /* createdAt: {
                [Op.gte]: new Date(),      //OP.GTE Maior igual que..,  OP.LTE MENOR IGUAL QUE A DATA ATUAL
               }                                
            },   
        console.log(JSON.stringify(customers, null, 2));
    } 
}
*/

// Funções de agregação: count, min, max, avg


//Retorna o SELECT de MIN onde os Customers tem ACTIVE.
 /* class Playground {       
    static async play() {   
        const customers = await Customer.min("createdAt",{
            where: {status:"ACTIVE"},
        });
        console.log(JSON.stringify(customers, null, 2));

    }
}
    */

//Retorna o SELECT de sum onde os Customers tem ACTIVE, teria que ter um numero, como idade, saldo..
 /* class Playground {       
    static async play() {   
        const customers = await Customer.sum("createdAt",{
            where: {status:"ACTIVE"},
        });  */
        

//Retorna o SELECT de Maximo onde os Customers tem ACTIVE
  /*class Playground {       
    static async play() {   
        const customers = await Customer.max("createdAt",{
            where: {status:"ACTIVE"},
        });  */
        
/*
               //LIMITANDO A BUSCA  

        const customers = await Customer.count ({  //Alterar essa parte para count, min, max..
            include: [
                {
                    model: Contact,     
                },
            ],      
            where: {         
            [Op.or]: {                      
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ],   //OP.BETWEEN Intervalos de datas dentro de um Array
             },
        },
        order: [["name", "DESC"], ["createAt"]],
        limit:2,        //LIMITE que eu quero 
        offset: 2 * 1 - 2, //LIMIT * PAGE - LIMIT. Limite que é a quantiade que eu quero, vezes a pagina, menos o limite
     });
     console.log(JSON.stringify(customers, null, 2));
*/

 /* Op.Or / Op.like / Op.between
 class Playground {       
    static async play() {     
        
               //LIMITANDO A BUSCA  

        const customers = await Customer.findAll({ 
            include: [
                {
                    model: Contact,     
                },
            ],      
            where: {         
            [Op.or]: {                      
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], 
             },
        },
        order: [["name", "DESC"], ["createAt"]],
        limit:2,        //LIMITE que eu quero 
        offset: 2 * 1 - 2, //LIMIT * PAGE - LIMIT. Limite que é a quantiade que eu quero, vezes a pagina, menos o limite
     });
     console.log(JSON.stringify(customers, null, 2)); 
       */
       
       
       
        /* Order By      

        const customers = await Customer.findAll({ 
            include: [
                {
                    model: Contact,  
                    where: {         
                        status: "ACTIVE", 
                    },                                          
                   order: [["name", "DESC"], ["createAt"]], //Multipla seção
                },                                      //DESC ao contrario, 2 Arrays o primeiro seleção do campo, segundo ordenação do campo
            ],      
     });
     console.log(JSON.stringify(customers, null, 2)); 
     Playground.play(); */
     
     /* Mesmo resultado do InnerJoin abaixo
     static async play() {              
        const customers = await Customer.findAll({ 
            include: [
                {
                    model: Contact,     
                },
            ],      
            where: {         
            [Op.or]: {                      
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], 
             },
        },
     });
     console.log(JSON.stringify(customers, null, 2)); 


      /* INCLUDE: Responsavel por fazer o INNERJOIN

     static async play() {              
        const customers = await Customer.findAll({ 
            include: [
                {
                    model: Contact,  
                    where: {         
                        status: "ACTIVE", //só serão exibidos os Customers que possuem Contacts
                    }, 
                    required: false, // vai produzir o LeftOuterJoin, o contacts volta como opcional  
                },
            ],      
            where: {         
            [Op.or]: {                      
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], 
             },
        },
     });
     console.log(JSON.stringify(customers, null, 2)); */

     
     /* Mesmo resultado do InnerJoin abaixo
     static async play() {              
        const customers = await Customer.findAll({ 
            include: [
                {
                    model: Contact,     
                },
            ],      
            where: {         
            [Op.or]: {                      
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], 
             },
        },
     });
     console.log(JSON.stringify(customers, null, 2)); 

    /* Uma Forma de InnerJoin
    static async play() {              
        const customers = await Customer.findAll({ 
            include: [Contact],      
            where: {         
            [Op.or]: {                      
              status:  {
                    [Op.in]: ["ACTIVE", "ARCHIVED"],         
            },   
            name: {
                [Op.like]: "Dev%",
            },
        },
            createdAt: {
                [Op.between]: [new Date(2025, 1,1),new Date(2025, 3, 4) ], 
             },
        },
     });
     console.log(JSON.stringify(customers, null, 2));  */


     //Pesquisar utilizando o where

    /*        

      static async play() {              
        const customers = await Customer.findAll({ 
            where: {         
            [Op.or]: {                              //Op.OR Isola uma opção ou outra na pesquisa dentre as abaixo/multiplicas opções 
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
            }    
        },
       });  
        
     
        /*  const customers = await Customer.findAll({ 
            where: {                                
              status:  {
                    [Op.ne]: "ACTIVE",           // Retorna todos não são ACTIVE, retorna ao contrario do que esta no filtro.  
              },
            },        
       });   */
        
        
        /* const customers = await Customer.findAll({ 
              where: {                                 
                status:  {
                      [Op.eq]: "ACTIVE",     Retorna todos que estão com os status ativos  
                },
              },        
         });   */
       
        //const customer = await Customer.findByPk(1);   Buscar pelo ID 
        
        /* const customer = await Customer.findOne({      Busca especifica e exclusao
            attributes: {exclude: ["status", "id"]},
            });  */
        
        
        /* const customers = await Customer.findAll({
           attributes: {exclude: ["status", "id"]},   / Excluir uma coluna especifica
             attributes: ["id","name"],                 Busca por conteudo especifico
        });  

         const customers = await Customer.findAll(); Busca todos no banco de dados
       

       */
      
 

