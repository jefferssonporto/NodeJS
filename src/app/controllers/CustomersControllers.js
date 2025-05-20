import Customer from "../models/Custormer";
import { Op } from "sequelize";
import { parseISO } from "date-fns";
import Contact from "../models/Contact";
import * as Yup from "yup";

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
    async index(req, res) {
        //extende a classe models
        const {
            name,
            email,
            status,
            createdBefore,
            createdAfter,
            updatedBefore,
            updatedAfter,
            sort, //campos de ordenação
        } = req.query;

        const page = req.query.page || 1;
        const limit = req.query.limit || 25;

        // localhost:3000/customers/?page2&limit=25
        //250 registros equivalente a 10 paginas
        // pagina 2 (25 - 50)   (paginação)

        let where = {};
        const order = [];

        if (name) {
            where = {
                ...where, // Tudo com 3 pontos ele vai concatenar com  o objeto
                name: {
                    [Op.iLike]: name,
                },
            };
        }

        if (email) {
            where = {
                ...where,
                email: {
                    [Op.iLike]: email,
                },
            };
        }

        if (status) {
            where = {
                ...where,
                status: {
                    [Op.in]: status
                        .split(",")
                        .map((item) => item.toUpperCase()), //.split("") - transforma em um Array active,archived => ["active", "archived"]
                }, //.map(item => item.toUpperCase() indenpendete do que usuario passar minusculo ou maiusculo
            };
        }

        if (createdBefore) {
            where = {
                ...where,
                createdAt: {
                    [Op.gte]: parseISO(createdBefore),
                },
            };
        }

        if (createdAfter) {
            where = {
                ...where,
                createdAt: {
                    [Op.lte]: parseISO(createdAfter),
                },
            };
        }

        if (updatedBefore) {
            where = {
                ...where,
                updatedAt: {
                    [Op.gte]: parseISO(updatedBefore),
                },
            };
        }

        if (updatedAfter) {
            where = {
                ...where,
                updatedAt: {
                    [Op.lte]: parseISO(updatedAfter),
                },
            };
        }

        console.log(where);

        if (sort) {
            order = sort.split(",").map((item) => item.split(":"));
        }

        const data = await Contact.findAll({
            where,
            include: [
                {
                    model: Customer,
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
    async show(req, res) {
        const customer = await Customer.findBypk(req.params.id); //vai dar um findbyprimary key (ID)

        if (!customer) {
            return res.status(404).json(); // Se não existir um customer ele tem que retornar 404
        }

        return res.json(customer);
    }

    //Cria um novo Customer
    async create(req, res) {
        //req.body
        /*  cria o schema / const schema = 
        validar o schema com o req.body */

        const schema = Yup.object().shape({
            name: Yup.string().required(), //primeiro é o tipo do dado (string) e dps as validações.
            email: Yup.string().email().required(),
            status: Yup.string().uppercase(),
        });

        //validação do schema
        if (!(await schema.isValid(req.body))) {
            //valido com quem, no caso req.body
            return res.status(400).json({ error: "Error on validate schema." }); //Se não for valido (schema), vai fazer alguma outra coisa
        }

        const customer = await Customer.create(req.body);

        return res.status(201).json(customer);
    }

    //Atualiza um Customer
    async update(req, res) {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            status: Yup.string().uppercase(),
        });

        //validação do schema
        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: "Error on validate schema." });
        }

        const customer = await Customer.create(req.body);

        if (!customer) {
            return res.status(404).json(); // Se não existir um customer ele tem que retornar 404
        }

        await customer.update(req.body); //vai aproveitar tudo que estar no req.body e vai jogar dentro do Customer

        return res.json(customer);
    }

    //Exclui um Customer
    async destroy(req, res) {
        //Recupera ele pra ver se exite:
        const customer = await Customer.findBypk(req.params.id);

        if (!customer) {
            return res.status(404).json();
        }

        //se ele existe então:
        await customer.destroy();

        return res.json(); //delete não precisa retornar nada
    }
}

export default new CustomersController();
