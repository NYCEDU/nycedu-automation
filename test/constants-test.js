const path = require("path"),
    constantsFilePath = path.join(__dirname, '..', 'constants.js')

describe("constants.js", function () {
    describe("not in production", function () {
        beforeEach(function () {
            process.env.NODE_ENV = 'development'
            this.constants = require('../constants')
        })

        it("requires the expected constants", function () {
            expect(this.constants.TYPEFORM_FORM_ID).to.equal('p5DhOL')
            expect(this.constants.TYPEFORM_EMAIL_FIELD).to.equal('email_37507879')
            expect(this.constants.TYPEFORM_TWITTER_FIELD).to.equal('textfield_44354349')
        })
    })

    describe("in production", function () {
        beforeEach(function () {
            process.env.NODE_ENV = 'production'
            this.constants = require('../constants')
        })

        it("requires the expected constants", function () {
            expect(this.constants.TYPEFORM_FORM_ID).to.equal('JYeqCl')
            expect(this.constants.TYPEFORM_EMAIL_FIELD).to.equal('email_37513365')
            expect(this.constants.TYPEFORM_TWITTER_FIELD).to.equal('textfield_37512157')
        })
    })

    afterEach(function () {
        // need to do this or else node will reuse the constants.js in memory
        delete require.cache[constantsFilePath]
    })
})
