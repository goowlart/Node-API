const express = require('express')
const routes = express.Router();

const ProductController = require("./controllers/ProductController")
const AuthController = require("./controllers/AuthController")
const ProjectController = require("./controllers/ProjectsController")


const authMiddlware = require('./middlewares/auth')


// primeira rota 
routes.get("/products", ProductController.index)
routes.get("/products/:id", ProductController.show)
routes.post("/products", ProductController.store)
routes.put("/products/:id", ProductController.update)
routes.delete("/products/:id", ProductController.destroy)


//USER
routes.post('/register', AuthController.register)
routes.post('/auth', AuthController.authenticate),



routes.use(authMiddlware)  //ROUTES REQUIRING TOKEN


routes.get ('/', ProjectController.index)


   
 module.exports = routes;