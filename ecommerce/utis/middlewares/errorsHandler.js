const { config } = require('../../config')
const Sentry = require('@sentry/node');
const boom = require('boom');
const isRequestAjaxOrApi = require('../../utis/isRequestAjaxOrApi')
const debug = require('debug')('app:error');

function withErrorStack(err, stack) {
    if (config.dev) {
        return { ...err, stack } // equivalente a Object.assign({}, err, stack)
    }
}

Sentry.init({ dsn: `https://${config.sentryDns}@sentry.io/${config.sentryId}` });

function logErrors(err, req, res, next) {
    // Sentry.captureException(err);
    debug(err.stack)
    next(err);
}

function wrapErrors(err, req, res, next) {
    if (!err.isBoom) {
        next(boom.badImplementation(err));
    }
    
    next(err);
}

function clientErrorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    // catch errors for ajax request or if an error ocurred while streaming
    if (isRequestAjaxOrApi(req) || res.headersSent) {
        res.status(statusCode).json( withErrorStack(payload, err.stack) );
    } else {
        next(err);
    }
}

function errorHandler(err, req, res, next) {
    const {
        output: { statusCode, payload }
    } = err;

    res.status(statusCode);
    res.render("error", withErrorStack(payload, err.stack));
}

module.exports = { logErrors, clientErrorHandler, errorHandler, wrapErrors }