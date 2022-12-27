'use strict';

var recaptchaSitePreferences = require('../helpers/recaptchaSitePreferences');

/**
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 */
function validateRecaptcha(req, res, next) {
    var Resource = require('dw/web/Resource');

    if (recaptchaSitePreferences.isRecaptchaV2Enabled()) {
        var recaptchaIsChecked = req.form['g-recaptcha-response'];
        if (!recaptchaIsChecked) {
            res.json(
                {
                    error: [Resource.msg('error.message.invalid.recaptcha', 'recaptcha', null)],
                    invalid_captcha: true,
                    fieldErrors: [],
                    serverErrors: [Resource.msg('error.message.invalid.recaptcha', 'recaptcha', null)]
                }
            );
        }
    }

    next();
}

module.exports = {
    validateRecaptcha: validateRecaptcha
};