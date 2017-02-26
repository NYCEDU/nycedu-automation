const client = require("./twitter-client")

function twitterRetweet(tweetId) {
    client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
        if (!error) {
            console.log(tweet);
        } else {
            console.log(error);
        }
    })
}

module.exports = twitterRetweet
