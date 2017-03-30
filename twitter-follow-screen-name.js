const client = require("./twitter-client")

function twitterFollowByScreenName(screenName, callback) {
    console.log('Following ' + screenName + '...')
    client.post('friendships/create', {screen_name: screenName})
        .then(function(data) {
            console.log(screenName + ' successfully followed!')
            console.log(data)
            if (callback) { callback(data) }
        })
        .catch(function(err) {
            console.log(err)
        })
}

module.exports = twitterFollowByScreenName
