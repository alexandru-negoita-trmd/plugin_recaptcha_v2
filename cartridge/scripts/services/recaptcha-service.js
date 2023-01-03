/**
 * reCaptcha Service to verify recaptcha token
 *
 */
 var LocalServiceRegistry = require('dw/svc/LocalServiceRegistry');
 var recaptchaSitePreferences = require('../helpers/recaptchaSitePreferences');

 /**
  * Recaptcha service
  * @returns {Object} Recaptcha Service
  */
 function getRecaptchaService() {
     var recaptchaService = LocalServiceRegistry.createService('recaptcha.v2.service', {
         createRequest: function (svc, args) {
            var recaptchaSecretKey = recaptchaSitePreferences.getRecaptchaSecretKey();
            svc.addHeader('Content-Type', 'application/json');
            for (var k in args) {
                svc.addParam(k, args[k]);
            }
            return svc;
         },
         parseResponse: function (svc, output) {
             return output;
         },
         getRequestLogMessage: function (reqObj) {
             return reqObj;
         }
     });
     return recaptchaService;
 }

 /**
  *
  * @param {string} secret Recaptcha SECRET KEY
  * @param {string} token Recaptcha token
  * @returns {Object} Body params for POST request
  */
 function getRequestBody(secret, token) {
    return {
        'secret': secret,
        'response': token
    };
}

 // export
 module.exports = {
     /**
      * recaptcha v2
      * @returns {Object} Recaptcha Service
      */
     initRecaptchaService: function () {
         var recaptchaService = getRecaptchaService();
         recaptchaService.setRequestMethod('POST');
         recaptchaService.setURL(recaptchaService.getURL());
         return recaptchaService;
     },
     getRequestBody: getRequestBody
 };