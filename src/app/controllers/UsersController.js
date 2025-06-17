import { Op } from "sequelize";
import { parseISO } from "date-fns";
import * as Yup from "yup";
import User from "../models/User";
import { fi } from "date-fns/locale";

class UsersController   {
    async index(req, res)   {
        const {
            name,
            email,
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

        const data = await User.findAll({
            attributes: {exclude: ["password", "password_hash"]},
            where,
            order,
            limit,
            offset: limit * page - limit,
        });

        return res.json(data);
    }
    }

    async show(req, res) {
        const User = await User.findBypk(req.params.id); 

        if (!User) {
            return res.status(404).json(); 
        }

        return res.json(User);
    }


    async create(req, res)  {
        const schema = Yup.object().shape({
            name: Yup.string().required(), 
            email: Yup.string().email().required()
            .email()
            .required(),
            password: Yup.string()
            .required()
            .min(8),        //Se o password estiver preenchido, excuto a validação abaixo
             passwordConfirmation:  Yup.string().when("password", (password, field) => 
                password ? field.required().oneOf([Yup.ref("password")])    : field
             ),   //Só serve para gerar um erro de validação.
         });

        if (!(await schema.isValid(req.body))) {
            
            return res.status(400).json({ error: "Error on validate schema." }); 
        }

        const {id, name, email, createdAt, updatedAt} = await User.create(req.body);

        return res.status(201).json({id, name, email, createdAt, updatedAt});
    }


    async update(req, res)  {
        const schema = Yup.object().shape({
            name: Yup.string(),
            email: Yup.string().email(),
            oldPassword: Yup.string().min(8),
            password: Yup.string()
            .min(8).when("oldPassword", (oldPassword, field) => 
                oldPassword ? field.required()  :   field
            ),        
             passwordConfirmation:  Yup.string().when("password", (password, field) => 
                password ? field.required().oneOf([Yup.ref("password")])    : field
             ),   //Só serve para gerar um erro de validação.
         });

        if (!(await schema.isValid(req.body))) {
            
            return res.status(400).json({ error: "Error on validate schema." }); 
        }

        const {id, name, email, createdAt, updatedAt} = await User.create(req.body);

        return res.status(201).json({id, name, email, createdAt, updatedAt});
    }
    

    async destroy(req, res){

    }

}

export default new UsersController(); 