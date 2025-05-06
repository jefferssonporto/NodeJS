
import Customer from "../models/Custormer";
import {Op} from "sequelize";
import { parseISO } from "date-fns";
import Contact from "../models/Contact";

const customers = [
    {
        id: 1,
        name: "Dev Jefferson",
        site: "https://www.linkedin.com/in/jefferson-de-oliveira-porto-869067277/",
    },
    { id: 2, name: "Google", site: "https://www.google.com/" },
    {
        id: 3,
        name: "Instagram",
        site: "https://www.instagram.com/jeffersson_porto/",
    },
];

class CustomersController {
    //Listagem dos resgistros (Customer)
    async index(req, res) {         //extende a classe models
        const {
            name,
            email,
            status, 
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort,   //campos de ordenação
        } = req.query;      

        const page = req.query.page || 1;       
        const limit = req.query.limit || 25;

            // localhost:3000/customers/?page2&limit=25
            //250 registros equivalente a 10 paginas
            // pagina 2 (25 - 50)   (paginação)
        
        let where ={};
        const order = [];

        if(name) {
            where = {
                ...where,      // Tudo com 3 pontos ele vai concatenar com  o objeto
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if(email) {
            where = {
                ...where,      
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        if(status) {
            where = {
                ...where,      
                status: {
                    [Op.in]: status.split(",").map(item => item.toUpperCase()), //.split("") - transforma em um Array active,archived => ["active", "archived"]
                },                                              //.map(item => item.toUpperCase() indenpendete do que usuario passar minusculo ou maiusculo
            };
        }

        if(createdBefore) {
            where = {
                ...where,      
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if(createdAfter) {
            where = {
                ...where,      
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if(updatedBefore) {
            where = {
                ...where,      
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if(updatedAfter) {
            where = {
                ...where,      
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        console.log(where);

        if(sort) {
            order = sort.split(",").map(item => item.split(":"));
        }

    const data = await Customer.findAll({
            where,
            include: [ 
                {
                    model: Contact,
                    attributes: ["id", "status"],
                },
            ],
            order,
            limit,
            offset: limit * page - limit, 
    });

        return res.json(data);
    }


    //Recupera um registro ou recurso (Customer)
    show(req, res) {
        const id = parseInt(req.params.id, 10);
        const customer = customers.find((item) => item.id === id);
        const status = customer ? 200 : 404;

        console.warn("GET :: /customers/:id ", json.stringfy(customer));

        return res.status(status).json(customer);
    }

    //Cria um novo Customer
    create(req, res) {
        const { name, site } = req.body;
        const id = customers[customers.length - 1].id + 1;

        const newCustomer = { id, name, site };
        customers.push(newCustomer);

        return res.status(201).json(newCustomer);
    }

    //Atualiza um Customer
    update(req, res) {
        const id = parseInt(req.params.id, 10);
        const { name, site } = req.body;

        const index = customers.findIndex((item) => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers[index] = { id: parseInt(id, 10), name, site };
        }

        return res.status(status).json(customers[index]);
    }

    //Exclui um Customer
    destroy(req, res) {
        const id = parseInt(req.params.id, 10);
        const index = customers.findIndex((item) => item.id === id);
        const status = index >= 0 ? 200 : 404;

        if (index >= 0) {
            customers.splice(index, 1);
        }

        return res.status(status).json();
    }
}

export default new CustomersController();
