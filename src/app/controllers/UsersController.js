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

async show(req, res) {
  const user = await User.findByPk(req.params.id); 

  if (!user) {
    return res.status(404).json();
  }

  const { id, name, email, createdAt, updatedAt } = user;

  return res.json({ id, name, email, createdAt, updatedAt });
}


async create(req, res)  {
  const schema = Yup.object().shape({
    name: Yup.string().required(), 
    email: Yup.string().email().required(),
    password: Yup.string().required().min(8),        
    passwordConfirmation: Yup.string().when("password", (password, field) => 
      password ? field.required().oneOf([Yup.ref("password")]) : field
    ),
  });
 }
  async update(req, res)  {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      oldPassword: Yup.string().min(8),
      password: Yup.string().min(8).when("oldPassword", (oldPassword, field) => 
        oldPassword ? field.required() : field
      ),        
      passwordConfirmation: Yup.string().when("password", (password, field) => 
        password ? field.required().oneOf([Yup.ref("password")]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: "Error on validate schema." }); 
    }

    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    const { oldPassword } = req.body;

    if (oldPassword && !(await user.checkPassword(oldPassword))) {
      return res.status(401).json({ error: "User password does not match." });
    }

    const { id, name, email, createdAt, updatedAt } = await user.update(req.body);

    return res.json({ id, name, email, createdAt, updatedAt });
  }

  async destroy(req, res) {
    const user = await User.findByPk(req.params.id);

    if (!user) {
      return res.status(404).json();
    }

    await user.destroy();

    return res.json();
  }
}


export default new UsersController(); 