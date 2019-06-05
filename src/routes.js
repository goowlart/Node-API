const express = require('express')
const routes = express.Router();

const ProductController = require("./controllers/ProductController")
const AuthController = require("./controllers/AuthController")
const ProjectController = require("./controllers/ProjectsController")

const authMiddlware = require('./middlewares/auth')

//Ould routes
routes.get("/products", ProductController.index)
routes.get("/products/:id", ProductController.show)
routes.post("/products", ProductController.store)
routes.put("/products/:id", ProductController.update)
routes.delete("/products/:id", ProductController.destroy)

//USER
routes.post('/register', AuthController.register)
routes.post('/auth', AuthController.authenticate)
routes.post('/auth/forgot_password', AuthController.forgot_password)
routes.post('/auth/reset_password', AuthController.reset_password)

routes.use(authMiddlware)  //ROUTES REQUIRING TOKEN

//PROJECTS
routes.get("/projects", ProjectController.index)
routes.get("/project/:projectId", ProjectController.show)
routes.post("/projects", ProjectController.create)
routes.put("/project/:projectId", ProjectController.update)
routes.delete("/project/:projectId", ProjectController.destroy)

module.exports = routes;