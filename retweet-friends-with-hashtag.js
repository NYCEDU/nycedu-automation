const getTweetsWithHashtag = require("./get-tweets-with-hashtag"),
    getTwitterFriends = require("./get-twitter-friends"),
    retweetIfFriends = require("./retweet-if-friends")

function retweetFriendsWithHashtag(hashtag) {
    getTweetsWithHashtag(hashtag, function (error, tweetData, response) {
        if (error) throw error
        if (tweetData) {
            const tweets = tweetData.statuses
            getTwitterFriends(function (error, friendData, response) {
                if (error) throw error
                if (friendData) {
                    const friendIds = friendData.ids
                    retweetIfFriends(tweets, friendIds)
                }
            })
        }
    })
}

module.exports = retweetFriendsWithHashtag
