const express = require('express');
const passport = require('passport');
const api = express.Router();
require('../../utis/auth/strategies/basic')
const boom = require('boom');
const jwt = require('jsonwebtoken');
const { config } = require('../../config')

api.post('/token', async (req, res, next) => {
    passport.authenticate('basic', async (error, user) => {
        try {
            if (error || !user){
                next(boom.unauthorized());
            }

            req.login(user, { session: false }, (err) => {
                if (err) {
                    next(error);
                }

                const payload = { sub: user.username, email: user.email }
                const token = jwt.sign(payload, config.authJwtSecret, {
                    'expiresIn': '15m'
                });

                return res.status(200).json({ access_token: token });
            })
        } catch (error) {
            next(error);
        }
    })(req, res, next);
})

module.exports = api;