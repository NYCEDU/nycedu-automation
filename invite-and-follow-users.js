'use strict';

const request = require('request'),
      path = require('path'),
      TOKEN = require('./api-keys').SLACK_TOKEN,
      dbHelpers = require('./db-helpers'),
      getUserByEmail = dbHelpers.getUserByEmail,
      saveUser = dbHelpers.saveUser,
      twitterFollowByScreenName = require('./twitter-follow-screen-name')

function inviteAndFollowUsers(users) {
    users.forEach( user => {
        let email = user.email
        // check that the new user is not already in the db
        // if they are, we do not want to invite / follow them again
        getUserByEmail(email, function (result) {
            if (!result) {
                console.log("User not in table of invited users:", user.email)
                inviteUser(email)
                if (user.twitter) {
                    twitterFollowByScreenName(user.twitter)
                }
            }
        })
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
            if (error || body.error) {
                console.log('Error inviting ' + email + ': ' + error)
                console.log(body)
                if (body.error && ['already_invited', 'already_in_team', 'sent_recently'].indexOf(body.error) > -1) {
                    saveUser(email)
                }
            } else {
                console.log('Successfully invited ' + email)
                console.log(body)
                saveUser(email)
            }
    })
}

module.exports = inviteAndFollowUsers
