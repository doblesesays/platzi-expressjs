const { config } = require('../config')
const { MongoClient } = require('mongodb')

// codificando user y password
// para que no haya problemas con caracteres especiales
const USER = encodeURIComponent(config.dbUser)
const PASSWORD = encodeURIComponent(config.dbPassword)
const DB_NAME = config.dbName;

const MONGO_URI = `mongodb://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${DB_NAME}?authSource=${DB_NAME}`

class MongoLib {
    constructor() {
        this.client = new MongoClient(MONGO_URI, { useNewUrlParser: true })
        this.dbName = DB_NAME;
    }
    // constructor() {
        // this.client = new MongoClient()
        // this.dbName = DB_NAME;
    // }

    connect() {
        return new Promise((resolve, reject) => {
            this.client.connect((err) => {
                if (err) {
                    reject(error);
                }
                console.log('Connected succesfully to mongo');
                resolve(this.client.db(this.dbName))
            })
        })
    }
    // connect() {
    //     return new Promise((resolve, reject) => {
    //         this.client.connect(MONGO_URI, { useNewUrlParser: true }, (err, client) => {
    //             console.log('Connected succesfully to mongo');
    //             resolve(client.db(this.dbName))
    //         })
    //     })
    // }

    getAll(collection, query) {
        return this.connect().then((db) => {
            return db
                .collection(collection)
                .find(query)
                .toArray();
        })
    }
}

module.exports = MongoLib;