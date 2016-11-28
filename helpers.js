const fs = require('fs'),
      PREVIOUS_INVITES_FILE = require('./constants').PREVIOUS_INVITES_FILE

function getPreviouslyInvited() {
    if (!fs.existsSync(PREVIOUS_INVITES_FILE)) {
        fs.writeFileSync(PREVIOUS_INVITES_FILE, JSON.stringify([]))
    }
    const previouslyInvited = require(PREVIOUS_INVITES_FILE)
    return previouslyInvited
}

function addToPreviouslyInvited(email) {
    const previouslyInvited = getPreviouslyInvited()
    previouslyInvited.push(email)
    fs.writeFileSync(PREVIOUS_INVITES_FILE, JSON.stringify(previouslyInvited))
    console.log('added ' + email + ' to list of previously invited users')
}

module.exports = {
    getPreviouslyInvited: getPreviouslyInvited,
    addToPreviouslyInvited: addToPreviouslyInvited
}
