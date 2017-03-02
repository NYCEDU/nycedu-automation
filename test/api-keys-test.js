const apiKeysTest = () => {
  describe('ApiKeysTest', () => {
    before( () => {
      process.env['SLACK_TOKEN'] = 'slack'
      process.env['TYPEFORM_TOKEN'] = 'typeform'
      process.env['NYCEDU_TWITTER_CONSUMER_KEY'] = 'foo'
      process.env['NYCEDU_TWITTER_CONSUMER_SECRET'] = 'bar'
      process.env['NYCEDU_TWITTER_ACCESS_TOKEN'] = 'baz'
      process.env['NYCEDU_TWITTER_ACCESS_TOKEN_SECRET'] = 'qux'
    });

    it('build object with proper key assignments and values', () => {
      const apiKeys = require('../api-keys')
      const testKeys = {
        SLACK_TOKEN: 'slack',
        TYPEFORM_TOKEN: 'typeform',
        twitterKeys: {
            consumer_key: 'foo',
            consumer_secret: 'bar',
            access_token_key: 'baz',
            access_token_secret: 'qux'
        }
      }

      // console.log('apiKeys:', apiKeys.twitterKeys)
      // console.log('testKeys:', testKeys.twitterKeys)

      expect(apiKeys).to.deep.equal(testKeys);
    });
  });
}

module.exports = apiKeysTest
