const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
    res.render('admin/categories')
})

router.get('/categories/news', (req, res) => {
    res.render('admin/categories/new')
})



module.exports = router;