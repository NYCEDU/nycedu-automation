const env = process.env,
      apiKeys = {
          SLACK_TOKEN: env['SLACK_TOKEN'],
          TYPEFORM_TOKEN: env['TYPEFORM_TOKEN'],
          twitterKeys: {
              consumer_key: env['NYCEDU_TWITTER_CONSUMER_KEY'],
              consumer_secret: env['NYCEDU_TWITTER_CONSUMER_SECRET'],
              access_token_key: env['NYCEDU_TWITTER_ACCESS_TOKEN'],
              access_token_secret: env['NYCEDU_TWITTER_ACCESS_TOKEN_SECRET']
          }
      }

module.exports = apiKeys
