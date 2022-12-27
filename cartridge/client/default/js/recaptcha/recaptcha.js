'use strict';

var recaptchaHelper = require('./recaptchaHelper');

$( document ).ready(function() {

    var checkCaptchaLogin = function(response) {
        $('form.login').submit();
        recaptchaHelper.methods.resetRecaptcha('submit-login');
    };

    var checkCaptchaRegister = function(response) {
        $('form.registration').submit();
        recaptchaHelper.methods.resetRecaptcha('recaptcha-register');
    };

    var checkCaptchaNewsletter = function(response) {
        $('form.newssub-form').submit();
        recaptchaHelper.methods.resetRecaptcha();
    };

    var recaptchaCheckboxCallbackLogin = function() {
        $('button.login-recaptcha-checkbox').removeAttr('disabled');
    }

    var recaptchaCheckboxCallbackRegister = function() {
        $('button.register-recaptcha-checkbox').removeAttr('disabled');
    }

    window.checkCaptchaLogin = checkCaptchaLogin;
    window.checkCaptchaRegister = checkCaptchaRegister;
    window.checkCaptchaNewsletter = checkCaptchaNewsletter;
    window.recaptchaCheckboxCallbackLogin = recaptchaCheckboxCallbackLogin;
    window.recaptchaCheckboxCallbackRegister = recaptchaCheckboxCallbackRegister;
});
