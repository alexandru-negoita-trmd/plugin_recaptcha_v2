'use strict';

/**
 *
 * @param {*} id recaptcha div id or null
 */
function resetRecaptcha(id) {
    $('.g-recaptcha').each(function(idx){
        if (typeof id === 'undefined' || id === $(this).attr('id')) {
            grecaptcha.reset(idx);
        }
    });
}

/**
 *
 * @param {*} i recaptcha div index
 * @param {*} element JQuery element
 */
function regenerateRecaptchaById(i, element) {
    if (recaptchaIsInvisible(element)) {
        grecaptcha.reset(i);
        grecaptcha.execute(i);
    }
}

/**
 *
 * @param {*} id recaptcha div id or null
 */
function regenerateRecaptcha(id) {
    var captchaEl = $('.g-recaptcha');
    if (captchaEl && captchaEl.length > 0) {
        captchaEl.each(function(idx, el){
            if ((id && el.id === id) || typeof id === 'undefined') {
                setTimeout(function(){
                    regenerateRecaptchaById(idx, el);
                }, idx * 1000);
            }
        });
    }
}

/**
 *
 * @param {*} element JQuery Object
 * @returns {boolean} true or false
 */
function recaptchaIsInvisible(element) {
    var size = element.dataset.size;
    if (size === 'invisible') {
        return true;
    }
    return false;
}

/**
 *
 * @param {*} element Jquery captcha div
 * @param {*} i recaptcha div index
 */
function executeRecaptcha(element, i) {
    if (recaptchaIsInvisible(element)) {
        grecaptcha.execute(i);
    }
}

module.exports = {
    methods: {
        resetRecaptcha: resetRecaptcha,
        regenerateRecaptcha: regenerateRecaptcha,
        executeRecaptcha: executeRecaptcha
    }
}