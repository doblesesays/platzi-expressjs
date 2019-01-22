const express = require('express');
const router = express.Router();
const productMocks = require('../utis/mocks/products');

router.get('/', (req, res) => {
    res.render('products', { productMocks })
})

module.exports = router;