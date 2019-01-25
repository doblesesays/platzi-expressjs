const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products');

const productService = new ProductsService();

router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
        throw new Error('this is an error on view');
        const products = await productService.getProducts({ tags })
        res.render('products', { products })
    } catch (error) {
        next(error);
    }

})

module.exports = router;