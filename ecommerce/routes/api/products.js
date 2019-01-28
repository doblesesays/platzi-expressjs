const express = require('express');
const ProductsService = require('../../services/products');
const validationHandler = require('../../utis/middlewares/validationHandler')
const passport = require('passport')
const cacheResponse = require('../../utis/cacheResponse');
const { FIVE_MINUTES_IN_SECONDS, SIXTY_MINUTES_IN_SECONDS } = require('../../utis/time')

const  { 
    productIdSchema, productTagSchema, createProductSchema, updateProductSchema
} = require('../../utis/schemas/product');

// JWT strategy
require('../../utis/auth/strategies/jwt')

function productsApi(app) {
    const router = express.Router();
    app.use('/api/products', router);

    const productService = new ProductsService();
    
    router.get('/', async (req, res, next) => {
        cacheResponse(res, FIVE_MINUTES_IN_SECONDS);
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
        cacheResponse(res, SIXTY_MINUTES_IN_SECONDS);
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
    
    router.post('/', validationHandler(createProductSchema), async (req, res, next) => {
        const { body: product } = req;
    
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
    
    router.put('/:productId',
        passport.authenticate('jwt', {session: false}),
        validationHandler({ productId: productIdSchema}, 'params'),
        validationHandler(updateProductSchema), async (req, res, next) => {
    
        const { productId } = req.params;
        const { body: product } = req;
    
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
    
    router.delete('/:productId', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
        const { productId } = req.params;
    
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
}


module.exports = productsApi;