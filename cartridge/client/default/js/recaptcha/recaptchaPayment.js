'use strict';

var recaptchaHelper = require('./recaptchaHelper');

var onloadRecaptcha = function() {
    $('.g-recaptcha').each(function(idx, element){
        recaptchaHelper.methods.executeRecaptcha(element, idx);
    });
}

var onSubmitRecaptchaShipping = function (token) {}

var onExpiredRecaptchaShipping = function() {
    const submitShippingButton = document.getElementById('btn-submit-shipping');
    if (window.getComputedStyle(submitShippingButton).display !== "none") {
        recaptchaHelper.methods.regenerateRecaptcha('recaptcha_shipping');
    }
}

var onSubmitRecaptchaBilling = function (token) {}

var onExpiredRecaptchaBilling = function() {
    const submitPaymentButton = document.getElementById('btn-submit-payment');
    if (window.getComputedStyle(submitPaymentButton).display !== "none") {
        recaptchaHelper.methods.regenerateRecaptcha('recaptcha_billing');
    }
}

window.onSubmitRecaptchaShipping = onSubmitRecaptchaShipping;
window.onExpiredRecaptchaShipping = onExpiredRecaptchaShipping;
window.onSubmitRecaptchaBilling = onSubmitRecaptchaBilling;
window.onExpiredRecaptchaBilling = onExpiredRecaptchaBilling;

window.onload = function() {
    onloadRecaptcha();
};
