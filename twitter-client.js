const Twitter = require('twitter'),
    twitterKeys = require('./api-keys').twitterKeys

const client = new Twitter(twitterKeys);

module.exports = client;
