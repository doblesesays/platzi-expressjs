const productsMocks = require('../utis/mocks/products');
const MongoLib = require('../lib/mongo')

class ProductService {
    constructor() {
        this.collection = 'products';
        this.mongoDB = new MongoLib(); 
    }

    async getProducts({ tags }) {
        // query de mongo
        const query = tags && { tags: { $in: tags } }
        const products = await this.mongoDB.getAll(this.collection, query);

        return products || [];
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