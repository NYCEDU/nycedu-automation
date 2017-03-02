// NEVER DIRECTLY PUT KEYS IN THIS FILE
// Save them as environment variables in your bash_profile
// and reference them here
// To export the prodKeys, the NODE_ENV environment variable
// must be set to 'production' in bash_profile

const env = process.env

const baseKeys = {
    SLACK_TOKEN: env['SLACK_TOKEN'],
    twitterKeys: {
        consumer_key: env['NYCEDU_TWITTER_CONSUMER_KEY'],
        consumer_secret: env['NYCEDU_TWITTER_CONSUMER_SECRET'],
        access_token_key: env['NYCEDU_TWITTER_ACCESS_TOKEN'],
        access_token_secret: env['NYCEDU_TWITTER_ACCESS_TOKEN_SECRET']
    }
}

const devKeys = {
    TYPEFORM_TOKEN: env['TYPEFORM_TOKEN']
}

const prodKeys = {
    TYPEFORM_TOKEN: env['PROD_TYPEFORM_TOKEN']
}

const envKeys = env['NODE_ENV'] === 'production' ? prodKeys : devKeys

const apiKeys = Object.assign({}, baseKeys, envKeys)

module.exports = apiKeys
