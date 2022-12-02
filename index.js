const express = require('express');
const app = express();
const bodyParser = require("body-parser");

const categoriesController = require('./controlles/CategoriesController');
const articlesController = require('./controlles/ArticlesController');

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.use('/', categoriesController);
app.use('/', articlesController);

app.get("/", (req, res) => {
    res.render('index')
})  

app.listen(2000, () => {
    console.log('App Rodando')
})
