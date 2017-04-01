// NEVER DIRECTLY PUT KEYS IN THIS FILE
// Save them as environment variables in your bash_profile
// and reference them here
// To export the prodKeys, the NODE_ENV environment variable
// must be set to 'production' in bash_profile

const env = process.env

const devKeys = {
    TYPEFORM_TOKEN: env['DEV_TYPEFORM_TOKEN'],
    SLACK_TOKEN: env['DEV_SLACK_TOKEN'],
    twitterKeys: {
        consumer_key: env['DEV_NYCEDU_TWITTER_CONSUMER_KEY'],
        consumer_secret: env['DEV_NYCEDU_TWITTER_CONSUMER_SECRET'],
        access_token_key: env['DEV_NYCEDU_TWITTER_ACCESS_TOKEN'],
        access_token_secret: env['DEV_NYCEDU_TWITTER_ACCESS_TOKEN_SECRET']
    }
}

const prodKeys = {
    TYPEFORM_TOKEN: env['PROD_TYPEFORM_TOKEN'],
    SLACK_TOKEN: env['PROD_SLACK_TOKEN'],
    twitterKeys: {
        consumer_key: env['PROD_NYCEDU_TWITTER_CONSUMER_KEY'],
        consumer_secret: env['PROD_NYCEDU_TWITTER_CONSUMER_SECRET'],
        access_token_key: env['PROD_NYCEDU_TWITTER_ACCESS_TOKEN'],
        access_token_secret: env['PROD_NYCEDU_TWITTER_ACCESS_TOKEN_SECRET']
    }
}

const apiKeys = env['NODE_ENV'] === 'production' ? prodKeys : devKeys

module.exports = apiKeys
