const express = require('express');
const router = express.Router();
const conn = require('../db/conn')
const slugify = require('slugify')

router.get('/articles', (req, res) => {
    res.render('admin/articles')
})

//---- Nova artigo ----------

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


module.exports = router;