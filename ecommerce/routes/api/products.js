const express = require('express');
const router = express.Router();
const ProductsService = require('../../services/products'); 

const productService = new ProductsService();

router.get('/', async (req, res, next) => {
    const { tags } = req.query;
    console.log("req", req.query);

    try {
        throw new Error('this is an error on the API');
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
    console.log("req", req.params);

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
    console.log("req", req.body);

    try {
        const createdProduct = await productService.createProduct({ product })
    
        res.status(201).json({
            data: createdProduct,
            message: "product created"
        });
    } catch (error) {
        next(error);
    }
})

router.put('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    const { body: product } = req;
    console.log("req", req.params, req.body);

    try {
        const updatedProduct = await productService.updateProduct({ productId, product })
        
        res.status(200).json({
            data: updatedProduct,
            message: "product updated"
        });
    } catch (error) {
        next(error);
    }
})

router.delete('/:productId', async (req, res, next) => {
    const { productId } = req.params;
    console.log("req", req.params);

    try {
        const deletedProduct = await productService.deleteProduct({ productId })
        
        res.status(200).json({
            data: deletedProduct,
            message: "product deleted"
        });
    } catch (error) {
        next(error);
    }
})

module.exports = router;