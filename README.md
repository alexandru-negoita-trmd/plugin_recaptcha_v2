# RACE Google reCAPTCHA v2 Plugin

## Summary

The following cartridge integrates the Google reCAPTCHA v2 service into RACE. It allows the user to choose between the checkbox and the invisible captcha methods for the following forms:
- Login
- Register
- Payment

## Implementation guide

### Cartridge installation

a)	Import metadata:
There are two XML files which need to be imported. One for the custom attributes and one for the HTTP service to be called externally.

**Custom attributes**
-	In the cartridge folder find \metadata\site-import\meta\recaptchaV2SitePreferences.xml
-	Go to Business Manager > Administration > Site Development > Import & Export
-	Under Import & Export Files, click Upload and select the .xml file in the metadata folder
-	Under Meta Data, click Import and select the files that you have just uploaded
-	This should create a new group containing multiple site preference attributes. To check whether the import was successful, go to Business Manager > Merchant Tools > Site Preferences > Custom Preferences. Search for Marketing Site group. Clicking it should return your attributes.

**HTTP service**
-	In the cartridge folder find \metadata\site-import\meta\recaptchaService.xml
-	Go to Business Manager > Administration > Operations > Import & Export
-	Under Import & Export Files, click Upload and select the .xml file in the metadata folder
-	Under Services, click Import and select the files that you have just uploaded
-	This should create a new service under Administration > Operations Services with the id 'recaptcha.v2.service'.

b)	Update the cartridge path:
-	Go to Business Manager > Administration > Sites > Manage Sites
-	Select the site you wish
-	Click on the Settings tab
-	Prepend “plugin_recaptcha_v2:” in the cartridge path (without quotes)
-	Click Apply

### Custom attributes

The following table contains the 5 attributes used to manipulate the site preferences in regards of transactional features.

|#|Attribute Name|Data Type|
|---|---|---|
|1|sfraEnableGoogleRecaptchaV2|boolean|
|2|sfraGoogleRecaptchaV2SiteKey|string|
|3|sfraGoogleRecaptchaType|enum of strings|
|4|sfraGoogleRecaptchaV2SecretKey|string|

### Brief description of attributes

**sfraEnableGoogleRecaptchaV2** - Enable or disable the recaptcha service.

**sfraGoogleRecaptchaV2SiteKey** - The site key generated when activating the Google reCAPTCHA service.

**sfraGoogleRecaptchaType** - Choose between checkbox or invisible captcha type.

**sfraGoogleRecaptchaV2SecretKey** - The secret key generated when activating the Google reCAPTCHA service.

### The HTTP service

It can be found in the Business Manager under Services and serves as the endpoint to be called inside the code to the external Google service.

## Dependencies

This solution currently only works on top of the RACE cartridge.
