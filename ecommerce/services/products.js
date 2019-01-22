const productsMocks = require('../utis/mocks/products');

class ProductService {
    constructor() {}

    getProducts({ tags }) {
        return Promise.resolve(productsMocks);
    }

    getProduct({ producId }) {
        return Promise.resolve(productsMocks[0]);
    }

    createProduct({ product }) {
        return Promise.resolve(productsMocks[0]);
    }

    updateProduct({ producId, product }) {
        return Promise.resolve(productsMocks[0]);
    }

    deleteProduct({ producId }) {
        return Promise.resolve(productsMocks);
    }
}

module.exports = ProductService;