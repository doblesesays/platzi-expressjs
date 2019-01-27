const passport = require('passport');
const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../../../config')
const MongoLib = require('../../../lib/mongo')
const boom = require('boom')

passport.use(
    new Strategy(
        {
            secretOrKey: config.authJwtSecret,
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
        }
    , async (tokenPayload, callback) => {
        const mongoDB = new MongoLib();

        try {
            const [user] = await mongoDB.getAll('users', { username: tokenPayload.sub })

            if (!user) {
                return callback(boom.unauthorized(), false)
            }

            return callback(null, user);
        } catch (error) {
            return callback(error);
        }
    })
)