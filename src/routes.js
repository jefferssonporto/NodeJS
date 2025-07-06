import { Router } from "express";

import sessions from "./app/controllers/SessionsController";
import customers from "./app/controllers/CustomersControllers";
import contacts from "./app/controllers/ContactsController";
import Users from "./app/controllers/UsersController";
import auth from "./app/Middlewares/auth";

const routes = new Router();

//Sessions
routes.post("/sessions", sessions.create);

//Controla o acesso a partir desse ponto
routes.use(auth);

//Customers
routes.get("/customers", customers.index);
routes.get("/customers/:id", customers.show);
routes.post("/customers", customers.create);
routes.put("/customers/:id", customers.update);
routes.delete("/customers/:id", customers.destroy);

//Contacts
routes.get("/customers/:customerId/contacts", contacts.index);
routes.get("/customers/:customerId/contacts/:Id", contacts.show);
routes.post("/customers/:customerId/contacts", contacts.create);
routes.put("/customers/:customerId/contacts/:Id", contacts.update);
routes.delete("/customers/:customerId/contacts/:Id", contacts.destroy);

//Users
routes.get("/Users", Users.index);
routes.get("/Users/:id", Users.show);
routes.post("/Users", Users.create);
routes.put("/Users/:id", Users.update);
routes.delete("/Users/:id", Users.destroy);

export default routes;
