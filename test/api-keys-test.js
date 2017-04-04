const path = require("path"),
    apiKeysFilePath = path.join(__dirname, '..', 'api-keys.js')

describe("api-keys.js", function () {
    beforeEach(function () {
        process.env = {
            DEV_SLACK_TOKEN: 'fake dev slack token',
            PROD_SLACK_TOKEN: 'fake prod slack token',
            DEV_NYCEDU_TWITTER_ACCESS_TOKEN: 'fake dev twitter token',
            PROD_NYCEDU_TWITTER_ACCESS_TOKEN: 'fake prod twitter token'
        }
    })
    describe("not in production", function () {
        beforeEach(function () {
            process.env.NODE_ENV = 'development'
            this.apiKeys = require('../api-keys')
        })

        it("requires the expected apiKeys with the expected object shape", function () {
            expect(this.apiKeys.SLACK_TOKEN).to.equal('fake dev slack token')
            expect(this.apiKeys.twitterKeys.access_token_key).to.equal('fake dev twitter token')
        })
    })

    describe("in production", function () {
        beforeEach(function () {
            process.env.NODE_ENV = 'production'
            this.apiKeys = require('../api-keys')
        })

        it("requires the expected apiKeys with the expected object shape", function () {
            expect(this.apiKeys.SLACK_TOKEN).to.equal('fake prod slack token')
            expect(this.apiKeys.twitterKeys.access_token_key).to.equal('fake prod twitter token')
        })
    })

    afterEach(function () {
        // need to do this or else node will reuse the apiKeys.js in memory
        delete require.cache[apiKeysFilePath]
    })
})
