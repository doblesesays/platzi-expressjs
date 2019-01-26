const passport = require('passport');
const { BasicStrategy } = require('passport-http')
const MongoLib = require('../../../lib/mongo')
const boom = require('boom')
const bcryptjs = require('bcryptjs')

passport.use(new BasicStrategy(
    async (username, password, callback) => {
        const mongoDB = new MongoLib();

        try {
            // [user] guarda en user el primer objeto del array
            const [user] = await mongoDB.getAll('users', { username });
            
            if (!user) {
                return callback(boom.unauthorized(), false)
            }

            if (! (await bcryptjs.compare(password, user.password))) {
                return callback(boom.unauthorized, false)
            }

            return callback(null, user)
        } catch (error) {
            return callback(error); 
        }
    }
))