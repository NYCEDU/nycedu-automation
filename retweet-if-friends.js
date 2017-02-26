const twitterRetweet = require("./twitter-retweet"),
    _ = require("lodash")

function retweetIfFriends (tweets, friendIds) {
    tweets.forEach( function (tweet) {
        if (_.includes(friendIds, tweet.user.id)) {
            console.log("found a tweet to retweet!")
            console.log(tweet.user.screen_name)
            console.log(tweet.text)
            console.log("retweeting... " + tweet.id_str)
            twitterRetweet(tweet.id_str);
        }
    })
}

module.exports = retweetIfFriends
