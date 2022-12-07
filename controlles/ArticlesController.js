const express = require('express');
const router = express.Router();
const conn = require('../db/conn')
const slugify = require('slugify')

router.get('/articles', (req, res) => {
    conn.select(["articles.*", "categories.title as titleCateg"]).table('articles').innerJoin("categories", "categories.id", "articles.id_categories").then(art => {
        res.render('admin/articles', {art: art})
    })
    
})

//---- Novo artigo ----------

router.get('/articles/news', (req, res) => {
    conn.select().table('categories').then(categ => {
         res.render('admin/articles/new', {categ: categ})
    })   
})

router.post("/articles/news", (req, res) => {
    var {title, body, categories} = req.body;
    conn.insert({
        title: title,
        slug: slugify(title),
        body: body,
        id_categories: categories
    }).into('articles').then(() => {
        res.redirect('/articles')
    }).catch(error => {
        res.redirect('/articles/news')
    })

})

//----- Editar o artigo ----------

router.get("/articles/edit/:id", (req, res) => {
    var id = req.params.id;

    if(isNaN(id)){
       res.redirect('/articles')
      }

      if(id != ""){
           conn.where({id: id}).table('articles').then(art => {
              conn.select().table('categories').then(categ => {
                res.render('admin/articles/edit', {art: art, categ: categ })
              })           

           }).catch((error) => {
           res.redirect("/articles")
           })
      }else{
       res.redirect('/articles')
      }  
})

router.post("/articles/edit", (req, res) => {
    var {id, title, body, categories} = req.body;
    conn.update({
        title: title,
        slug: slugify(title),
        body: body,
        id_categories: categories
    }).into('articles').where({id: id}).then(() => {
        res.redirect('/articles')
    }).catch(error => {
        res.redirect('/articles/news')
    })

})



//---- Deletar a categoria ------------

router.post('/articles/delete', (req, res) => {
    var id = req.body.id;
    conn.where({id: id}).delete().table('articles').then(() => {
         res.redirect('/articles')
    }).catch(error => {
        res.redirect('/articles')
    })
})


module.exports = router;