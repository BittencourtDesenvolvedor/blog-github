const express = require('express');
const router = express.Router();
const conn = require('../db/conn');
const slugify = require('slugify')

//---- Rota principal da categoria----------

router.get('/categories', (req, res) => {
    conn.select().table('categories').then(categ => {
       res.render('admin/categories', {categ: categ}) 
    })
    
})

//---- Nova Categoria ---------------

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
                res.redirect('/categories')
            }).catch(error => {
                res.redirect('/categories/news')


            })
       }else{
         res.redirect('/categories/news')
       }
})

//---- editar a categoria -------------

router.get("/categories/edit/:id", (req, res) => {
     var id = req.params.id;

     if(isNaN(id)){
        res.redirect('/categories')
       }

       if(id != ""){
            conn.where({id: id}).table('categories').then(categ => {
            res.render('admin/categories/edit', {categ: categ})
            }).catch((error) => {
            res.redirect("/categories")
            })
       }else{
        res.redirect('/categories')
       }

   
})

router.post('/categories/edit', (req, res) => {
    var{ title, id} = req.body;


    if(title != ""){
       conn.update({
          title: title,
          slug: slugify(title)
         }).table('categories').where({id: id}).then(() => {
             res.redirect('/categories')
         }).catch(error => {
             res.redirect('/categories/edit')
         })
    }else{
      res.redirect('/categories/edit')
    }
})



//---- Deletar a categoria ------------

router.post('/categories/delete', (req, res) => {
    var id = req.body.id;
    conn.where({id: id}).delete().table('categories').then(() => {
         res.redirect('/categories')
    }).catch(error => {
        res.redirect('/')
    })
})



module.exports = router;