'use strict';

var recaptchaSitePreferences = require('../helpers/recaptchaSitePreferences');
var Resource = require('dw/web/Resource');
var LOGGER = require('dw/system/Logger').getLogger('recaptcha', 'RecaptchaService');

/**
 *
 * @param {Object} req - Request object
 * @param {Object} res - Response object
 * @param {Function} next - Next call in the middleware chain
 */
function validateRecaptcha(req, res, next) {

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
        } else {
            var recaptchaService = require('../services/recaptcha-service');
            var recaptchaSecretKey = recaptchaSitePreferences.getRecaptchaSecretKey();
            var body = recaptchaService.getRequestBody(recaptchaSecretKey, recaptchaIsChecked);
            var result = recaptchaService.initRecaptchaService().call(body);

            if (!result.isOk()) {
                res.json(
                    {
                        error: [Resource.msg('error.message.server.error', 'recaptcha', null)],
                        invalid_captcha: true,
                        fieldErrors: [],
                        serverErrors: [Resource.msg('error.message.server.error', 'recaptcha', null)]
                    }
                );
            } else {
                var responseObj = JSON.parse(result.object.getText());
                if (!responseObj.success) {
                    var errMsg = getErrorMessageByAPIResponse(responseObj);
                    LOGGER.debug(JSON.stringify(result.object.getText()));
                    res.json(
                        {
                            error: [errMsg],
                            invalid_captcha: true,
                            fieldErrors: [],
                            serverErrors: [errMsg]
                        }
                    );
                }
            }
        }
    }
    next();
}

/**
 * Get error message by error code
 * @param {*} responseObj Google API response message
 * @returns {string} Error message
 */
function getErrorMessageByAPIResponse(responseObj) {
    var errorMessage = Resource.msg('error.message.invalid.recaptcha', 'recaptcha', null);
    if (responseObj.hasOwnProperty('error-codes') && Array.isArray(responseObj['error-codes'])) {
        var errorCode = responseObj['error-codes'].shift();
        switch (errorCode) {
            case 'missing-input-secret':
                errorMessage = Resource.msg('error.message.recaptcha.missing-input-secret', 'recaptcha', null);
                break;

            case 'invalid-input-secret':
                errorMessage = Resource.msg('error.message.recaptcha.invalid-input-secret', 'recaptcha', null);
                break;

            case 'missing-input-response':
                errorMessage = Resource.msg('error.message.recaptcha.missing-input-response', 'recaptcha', null);
                break;

            case 'invalid-input-response':
                errorMessage = Resource.msg('error.message.recaptcha.invalid-input-response', 'recaptcha', null);
                break;

            case 'bad-request':
                errorMessage = Resource.msg('error.message.recaptcha.bad-request', 'recaptcha', null);
                break;

            case 'timeout-or-duplicate':
                errorMessage = Resource.msg('error.message.recaptcha.timeout-or-duplicate', 'recaptcha', null);
                break;

            default:
                break;
        }
    }

    return errorMessage;
}

module.exports = {
    validateRecaptcha: validateRecaptcha
};