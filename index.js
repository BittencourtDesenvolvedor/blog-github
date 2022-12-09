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
    conn.select().table('articles').orderBy("id", 'desc').then(art => {
        conn.select().table("categories").then(categ => {
           res.render('index', {art: art, categ: categ}) 
        })        
    })
    
})
app.get("/:slug", (req, res) => {
    var slug = req.params.slug;
    conn.select().table("articles").where({slug: slug}).then(art => {
        conn.select().table("categories").then(categ => {
            if(art != undefined){
              res.render("article", {art: art, categ: categ})
           }else{
              res.redirect("/")
           }
        }).catch(err => {
            res.redirect("/")
        })       
    }).catch(err => {
        res.redirect("/")
    })
})  

app.get("/categories/:slug", (req, res) => {
    var slug = req.params.slug;
    conn.select(["articles.*", "categories.title as titleCateg"]).table("categories").where({slug: slug}).innerJoin("articles", "articles.id_categories", "categories.id").then(art => {
        if(categ != undefined){
             res.render("index", {art: art})
        }else{
            res.send("teste 1")
        }
    }).catch(err => {
        res.send("teste 2")
    })
})

app.listen(2000, () => {

    console.log('App Rodando')
})
