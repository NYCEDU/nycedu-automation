'use strict';

const request = require('request'),
      path = require('path'),
      TOKEN = require('./api-keys').SLACK_TOKEN,
      dbHelpers = require('./db-helpers'),
      getFormSubmission = dbHelpers.getFormSubmission,
      saveFormSubmission = dbHelpers.saveFormSubmission,
      twitterFollowByScreenName = require('./twitter-follow-screen-name')

function inviteAndFollowUsers(users) {
    users.forEach( user => {
        // validate that user form submission is complete enough
        if (!user.email || !user.dateSubmit) {
            console.log("Invalid data for user, skipping:", user)
            return;
        }
        getFormSubmission(user.email, user.dateSubmit, (result) => {
            if (!result) {
                console.log("New form submission:", user)
                inviteUser(user)
                if (user.twitter) {
                    twitterFollowByScreenName(user.twitter)
                }
            } else {
                console.log("Form submission already processed:", result)
            }
        })
    })
}

function inviteUser(user) {
    const email = user.email
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
            if (error || body.error) {
                console.log('Error inviting ' + email + ': ' + error)
                console.log(body)
                if (body.error && ['already_invited', 'already_in_team', 'sent_recently'].indexOf(body.error) > -1) {
                    saveFormSubmission(email, user.dateSubmit)
                }
            } else {
                console.log('Successfully invited ' + email)
                console.log(body)
                saveFormSubmission(email, user.dateSubmit)
            }
    })
}

module.exports = inviteAndFollowUsers
