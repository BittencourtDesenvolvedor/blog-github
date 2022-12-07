const express = require('express');
const app = express();
const bodyParser = require("body-parser");
const conn = require("./db/conn")

const categoriesController = require('./controlles/CategoriesController');
const articlesController = require('./controlles/ArticlesController');

app.set("view engine", "ejs");


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'))

app.use('/', categoriesController);
app.use('/', articlesController);

app.get("/", (req, res) => {
    conn.select().table('articles').then(art => {
        res.render('index', {art: art})
    })
    
})  

app.listen(2000, () => {

    console.log('App Rodando')
})
