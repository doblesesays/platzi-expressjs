const express = require('express');
const router = express.Router();
const productMocks = require('../../utis/mocks/products')


router.get('/', (req, res) => {
    const { query } = req.query;
    res.status(200).json({
        data: productMocks,
        message: "products listed"
    });
})

router.get('/:productId', (req, res) => {
    const { producId } = req.params;
    res.status(200).json({
        data: productMocks[0],
        message: "products retrieved"
    });
})

router.post('/', (req, res) => {
    res.status(201).json({
        data: productMocks[0],
        message: "product created"
    });
})

router.put('/:productId', (req, res) => {
    res.status(200).json({
        data: productMocks[0],
        message: "product updated"
    });
})

router.delete('/:productId', (req, res) => {
    res.status(200).json({
        data: productMocks,
        message: "product deleted"
    });
})

module.exports = router;