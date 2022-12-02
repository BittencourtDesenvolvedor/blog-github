const express = require('express');
const router = express.Router();

router.get('/articles', (req, res) => {
    res.render('admin/articles')
})


module.exports = router;