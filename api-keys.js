const env = process.env,
      apiKeys = {
          SLACK_TOKEN: env['SLACK_TOKEN'],
          TYPEFORM_TOKEN: env['TYPEFORM_TOKEN']
      }

module.exports = apiKeys
