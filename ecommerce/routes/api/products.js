const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products'); 

const productService = new ProductsService();

router.get('/', async (req, res, next) => {
    const { tags } = req.query;

    try {
        const products = await productService.getProducts({tags})
    
        res.status(200).json({
            data: products,
            message: "products listed"
        });
    } catch (error) {
        next(error);
    }

})

router.get('/:productId', async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await productService.getProduct({ productId })
    
        res.status(200).json({
            data: product,
            message: "products retrieved"
        });
    } catch (error) {
        next(error);
    }
})

router.post('/', async (req, res, next) => {
    const { body: product } = req; 

    try {
        const product = await productService.createProduct({ product })
    
        res.status(201).json({
            data: product,
            message: "product created"
        });
    } catch (error) {
        next(error);
    }
})

router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;

    try {
        const undatedProduct = await productService.updateProduct({ productId, product })
        
        res.status(200).json({
            data: undatedProduct,
            message: "product updated"
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;

    try {
        const product = await productService.deleteProduct({ productId })
        
        res.status(200).json({
            data: product,
            message: "product deleted"
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;