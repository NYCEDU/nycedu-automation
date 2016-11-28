const request = require('request'),
      path = require('path'),
      TOKEN = require('./api-keys').SLACK_TOKEN,
      helpers = require('./helpers'),
      getPreviouslyInvited = helpers.getPreviouslyInvited,
      addToPreviouslyInvited = helpers.addToPreviouslyInvited

function inviteUsers(emails) {
    // get previously invited users so we don't invite them multiple times
    const previouslyInvited = getPreviouslyInvited()

    emails.forEach( email => {
        if (email && previouslyInvited.indexOf(email) === -1 ) {
            inviteUser(email)
        }
    })
}

function inviteUser(email) {
    console.log('inviting ' + email + '...')
    request({
        url: 'https://slack.com/api/users.admin.invite',
        qs: {
            token: TOKEN,
            email: email,
            resend: true
        },
        method: 'POST'
    },  function(error, response, body) {
            if (error || response.error) {
                console.log('Error inviting ' + email + ': ' + error)
                console.log(body)
            } else {
                console.log('Successfully invited ' + email)
                console.log(body)
                addToPreviouslyInvited(email)
            }
    })
}

module.exports = inviteUsers
