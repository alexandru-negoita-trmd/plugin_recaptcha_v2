'use strict';

$( document ).ready(function() {
    console.log('recaptcha loaded');

    var checkCaptchaLogin = function(response) {
        $('form.login').submit();
        grecaptcha.reset();
    };

    var checkCaptchaRegister = function(response) {
        $('form.registration').submit();
        grecaptcha.reset();
    };

    var checkCaptchaNewsletter = function(response) {
        $('form.newssub-form').submit();
        grecaptcha.reset();
    };

    var checkCaptchaPlaceOrder = function(response) {
        $("#button-hidden").click();
        grecaptcha.reset();
    };

    window.checkCaptchaLogin = checkCaptchaLogin;
    window.checkCaptchaRegister = checkCaptchaRegister;
    window.checkCaptchaNewsletter = checkCaptchaNewsletter;
    window.checkCaptchaPlaceOrder = checkCaptchaPlaceOrder;
});
