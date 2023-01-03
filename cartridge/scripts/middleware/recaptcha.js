'use strict';

var recaptchaSitePreferences = require('../helpers/recaptchaSitePreferences');
var request = require('request');

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
        var recaptchaVerificationURL = 'https://www.google.com/recaptcha/api/siteverify';
        var recaptchaSecretKey = recaptchaSitePreferences.getRecaptchaSecretKey();

        if (!recaptchaIsChecked) {
            res.json(
                {
                    error: [Resource.msg('error.message.invalid.recaptcha', 'recaptcha', null)],
                    invalid_captcha: true,
                    fieldErrors: [],
                    serverErrors: [Resource.msg('error.message.invalid.recaptcha', 'recaptcha', null)]
                }
            );
        } else {
            request.post({
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                url: recaptchaVerificationURL,
                body: {
                    secret: recaptchaSecretKey,
                    response: recaptchaIsChecked
                }},
                function (error, reponse, body) {
                    console.log(body);
                }
                );
            };
        }

        next();
}

module.exports = {
    validateRecaptcha: validateRecaptcha
};