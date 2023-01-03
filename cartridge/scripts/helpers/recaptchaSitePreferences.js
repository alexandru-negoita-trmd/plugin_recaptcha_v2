var System = require('dw/system');

/**
 *
 * @returns {boolean} a boolean of true or false
 */
function isRecaptchaV2Enabled() {
    var site = System.Site.getCurrent();
    return site.getCustomPreferenceValue('sfraEnableGoogleRecaptchaV2') ? true : false;
}

/**
 *
 * @returns {string} google recaptcha type enabled
 */
function getRecaptchaTypeEnabled() {
    var site = System.Site.getCurrent();
    if (!isRecaptchaV2Enabled) {
        return false;
    }
    return site.getCustomPreferenceValue('sfraGoogleRecaptchaType');
}

/**
 *
 * @returns {string} google recaptcha secret key
 */
function getRecaptchaSecretKey() {
    var site = System.Site.getCurrent();
    return site.getCustomPreferenceValue('sfraGoogleRecaptchaV2SecretKey');
}

module.exports = {
    isRecaptchaV2Enabled: isRecaptchaV2Enabled,
    getRecaptchaTypeEnabled: getRecaptchaTypeEnabled,
    getRecaptchaSecretKey: getRecaptchaSecretKey
}
