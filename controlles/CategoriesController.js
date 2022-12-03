const express = require('express');
const router = express.Router();
const conn = require('../db/conn');
const slugify = require('slugify')

router.get('/categories', (req, res) => {
    conn.select().table('categories').then(categ => {
       res.render('admin/categories', {categ: categ}) 
    })
    
})

router.get('/categories/news', (req, res) => {
    res.render('admin/categories/new')
})

router.post('/categories/news', (req, res) => {
       var title = req.body.title;
       if(title != ""){
          conn.insert({
             title: title,
             slug: slugify(title)
            }).table('categories').then(() => {
                res.redirect('/')
            }).catch(error => {
                res.redirect('/categories/news')
            })
       }else{
         res.redirect('/categories/news')
       }
})



module.exports = router;