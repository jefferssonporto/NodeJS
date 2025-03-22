 
    let customers = [
       {id: 1, name: "Dev Jefferson", site: "https://www.linkedin.com/in/jefferson-de-oliveira-porto-869067277/" },
       {id: 2, name: "Google", site:  "https://www.google.com/"},
       {id: 3, name: "Instagram", site: "https://www.instagram.com/jeffersson_porto/"}
   ]; 


class CustomersController {

    //Listagem dos resgistros (Customer)
    index(req, res) {
         return res.json(customers);
    }

    //Recupera um registro ou recurso (Customer)
    show(req, res){ 
        const id = parseInt(req.params.id);
            const customer = customers.find(item => item.id == id);
            const status = customer ? 200 : 404; 
            
            console.debug("GET :: /customers/:id ", json.stringfy(customer)); 
        
            return res.status(status).json(customer);
    }

    //Cria um novo Customer
    create(req, res) { 
        const { name, site } = req.body; 
            const nextId = this.customers[customers.length -1].id + 1;
        
            const newCustomer = {id, name, site};
            customers.push(newCustomer);
        
            return res.status(201).json(newCustomer); 
    }

    //Atualiza um Customer
    update(req, res) {
         const id = parseInt(req.params.id);
            const {name, site } = req.body;
        
            const index = customers.findIndex(item => item.id === id);
            const status = index >= 0 ? 200 : 404; 
            
            if(index >= 0) {   
                customers[index] = {id: parseInt(id), name, site};
            }
        
            return res.status(status).json(this.customers[index]); 
    }

    //Exclui um Customer
    destroy(req, res)  {
        server.delete("/customers/:id", (req, res) => {
            const id = parseInt(req.params.id);
            const index = customers.findIndex(item => item.id === id); 
            const status = index >= 0 ? 200 : 404; 
        
            if(index >= 0) { 
                customers.splice(index, 1); 
            }
        
            return res.status(status).json(); })
        }
}
export default new CustomersController();