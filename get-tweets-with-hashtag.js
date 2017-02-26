const client = require('./twitter-client.js')

function getTweetsWithHashtag (hashtag, callback) {
    client.get('search/tweets', {q: '#' + hashtag}, function(error, data, response) {
      callback(error, data, response)
    })
}

module.exports = getTweetsWithHashtag;
