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
    if (!isRecaptchaV2Enabled) {
        return false;
    }
    return site.getCustomPreferenceValue('sfraGoogleRecaptchaType');
}

module.exports = {
    isRecaptchaV2Enabled: isRecaptchaV2Enabled,
    getRecaptchaTypeEnabled: getRecaptchaTypeEnabled
}
