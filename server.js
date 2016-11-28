const express = require('express'),
    app = express(),
    path = require('path'),
    inviteUsers = require('./invite-users'),
    getInvitees = require('./get-invitees')

app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'))
})

app.get('/inviteusers', function(req, res){
    getInvitees( emails => {
        inviteUsers(emails)
    })
    res.status(200).send('OK: Finished checking for new signups')
})

app.listen(3000, function() {
    console.log('App listening on port 3000')
})
