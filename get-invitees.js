'use strict';

const request = require('request'),
      TYPEFORM_TOKEN = require('./api-keys').TYPEFORM_TOKEN,
      constants = require('./constants'),
      TYPEFORM_FORM_ID = constants.TYPEFORM_FORM_ID,
      TYPEFORM_EMAIL_FIELD = constants.TYPEFORM_EMAIL_FIELD,
      getPreviouslyInvited = require('./helpers').getPreviouslyInvited

function getInvitees(callback) {
    console.log('getting latest responses from Typeform...')
    // Get an offset because TypeForm only returns 1,000 results max
    // So when over 1,000 have signed up, we need only most recent results
    const previouslyInvited = getPreviouslyInvited()
    const offset = previouslyInvited.length

    request({
        url: 'https://api.typeform.com/v1/form/' + TYPEFORM_FORM_ID,
        qs: {
            key: TYPEFORM_TOKEN,
            completed: true,
            offset: offset
        }
    },  function(error, response, body) {
            if (error) {
                console.log('Error', error)
            } else {
                console.log('Received responses from Typeform: ', body)
                const emails = parseResponseForEmails(JSON.parse(body))
                console.log('Number of new signups: ' + emails.length)
                console.log(emails)
                callback(emails)
            }
    })
}

function parseResponseForEmails(data) {
    if (!data.responses) { return []; }
    return data.responses.map( r => r.answers[TYPEFORM_EMAIL_FIELD])
}

module.exports = getInvitees
