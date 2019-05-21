const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors')
const requireDir = require('require-dir')

//initialization of the api
const app = express();
app.use(express.json())
app.use(cors())

// starting database
mongoose.connect('mongodb://localhost:27017/nodeapi', { 
    useNewUrlParser: true,
    useCreateIndex:  true
 });

 //Import all models * * *  Using the library requireDir
requireDir('./src/models');


//routes
app.use('/api', require("./src/routes")) 


app.listen(3001);