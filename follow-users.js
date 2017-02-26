'use strict';

const twitterFollowByScreenName = require('./twitter-follow-screen-name'),
    helpers = require('./helpers'),
    getPreviouslyInvited = helpers.getPreviouslyInvited;

function followUsers (users) {
    const previouslyInvited = getPreviouslyInvited()

    users.forEach( user => {
        let screen_name = user.twitter
        let email = user.email
        if (!screen_name || !email) { return }
        if (previouslyInvited.indexOf(email) === -1 ) {
            console.log('Following @' + screen_name + ', email: ' + email + ' ...')
            twitterFollowByScreenName(screen_name)
        }
    })
}

module.exports = followUsers
