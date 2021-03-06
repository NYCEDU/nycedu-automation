// a place for IDs, urls, etc. that are hard to remember or often need to change
// DO NOT PUT API KEYS HERE - set as environment variables and
// reference them in ./api-keys.js
// To export the prodConstants, the NODE_ENV environment variable
// must be set to 'production' in bash_profile

const devConstants = {
    TYPEFORM_FORM_ID: 'p5DhOL',
    TYPEFORM_EMAIL_FIELD: 'email_37507879',
    TYPEFORM_TWITTER_FIELD: 'textfield_44354349'
}

const prodConstants = {
    TYPEFORM_FORM_ID: 'JYeqCl',
    TYPEFORM_EMAIL_FIELD: 'email_37513365',
    TYPEFORM_TWITTER_FIELD: 'textfield_37512157'
}

const constants = process.env['NODE_ENV'] === 'production' ? prodConstants : devConstants

module.exports = constants
