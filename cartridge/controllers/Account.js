'use strict';

var server = require('server');
server.extend(module.superModule);

var recaptchaMiddleware = require('*/cartridge/scripts/middleware/recaptcha');

/**
 * Login customer
 */
server.prepend(
    'Login',
    recaptchaMiddleware.validateRecaptcha,
    function (req, res, next) {
        if (res.viewData.invalid_captcha) {
            this.emit('route:Complete', req, res);
            return;
        }
        next();
    }
);

/**
 * Register new customer
 */
 server.prepend(
    'SubmitRegistration',
    recaptchaMiddleware.validateRecaptcha,
    function (req, res, next) {
        if (res.viewData.invalid_captcha) {
            this.emit('route:Complete', req, res);
            return;
        }
        next();
    }
);

module.exports = server.exports();