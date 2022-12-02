const express = require('express');
const router = express.Router();

router.get('/categories', (req, res) => {
    res.render('admin/categories')
})


module.exports = router;