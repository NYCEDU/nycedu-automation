'use strict';

const request = require('request'),
    _ = require('lodash'),
    moment = require('moment'),
    TYPEFORM_TOKEN = require('./api-keys').TYPEFORM_TOKEN,
    constants = require('./constants'),
    TYPEFORM_FORM_ID = constants.TYPEFORM_FORM_ID,
    TYPEFORM_EMAIL_FIELD = constants.TYPEFORM_EMAIL_FIELD,
    TYPEFORM_TWITTER_FIELD = constants.TYPEFORM_TWITTER_FIELD

function getFromTypeform (params, callback) {
    // merge params with API key and default completed = true
    // allow params passed from calling function to overwrite completed
    const completedParams = { completed: true }
    const keyParams = { key: TYPEFORM_TOKEN}
    const fullParams = _.extend({}, completedParams, params, keyParams)

    request({
        url: 'https://api.typeform.com/v1/form/' + TYPEFORM_FORM_ID,
        qs: fullParams
    }, function (error, response, body) {
        if (callback) {
            callback(error, response, body)
        }
    })
}

function getLatestResponses (mostRecentDateSubmit, callback) {
    // convert mostRecentDateSubmit string to Unix timestamp
    const timestamp = moment.utc(mostRecentDateSubmit).unix()
    const params = { since: timestamp }

    console.log("Requesting all Typeform responses since:", mostRecentDateSubmit)
    // get all responses after the timestamp
    getFromTypeform(params, (error, response, body) => {
        if (error) {
            console.log("Error getting latest invites from Typeform:", error)
        } else {
            console.log("Received response from Typeform:", body)
            const userData = parseResponses(JSON.parse(body))
            console.log("Number of new responses:", userData.length)
            if (callback) {
                callback(userData)
            }
        }
    })
}


// takes a response payload from Typeform API
// returns an array of objects with user data
function parseResponses (data) {
    if (!data.responses) { return []; }
    return data.responses.map( r => {
        let screenName = r.answers[TYPEFORM_TWITTER_FIELD]
        if (screenName) { screenName = screenName.replace('@', '') }
        return {
            email: r.answers[TYPEFORM_EMAIL_FIELD],
            twitter: screenName,
            dateSubmit: r.metadata.date_submit
        }
    })
}

module.exports = {
    getFromTypeform,
    getLatestResponses,
    parseResponses
}
