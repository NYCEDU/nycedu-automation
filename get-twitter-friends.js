const client = require('./twitter-client.js')

function getTwitterFriends (callback) {
    client.get('friends/ids', function(error, data, response) {
        callback(error, data, response)
    });
}

module.exports = getTwitterFriends;
