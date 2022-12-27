'use strict';

var server = require('server');
server.extend(module.superModule);

var recaptchaMiddleware = require('*/cartridge/scripts/middleware/recaptcha');

/**
 * Submit payment
 */
server.prepend(
    'SubmitShipping',
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