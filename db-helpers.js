const pg = require('pg')

function getUsersCount (callback) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query('SELECT COUNT(*) FROM users', function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                const count = parseInt(result.rows[0].count, 10)
                callback(count)
            }
        })
    })
}

function getUsers (callback) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query('SELECT * FROM users', function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                callback(result.rows)
            }
        })
    })
}

function getUserByEmail (email, callback) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query('SELECT * FROM users WHERE email = $1', [email], function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                callback(result.rows[0])
            }
        })
    })
}

function saveUser (email, callback) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query('INSERT INTO users (email) VALUES ($1)', [email], function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                console.log('successfully saved user: ', email)
                console.log(result)
                if (callback) {
                    callback(result)
                }
            }
        })
    })
}

module.exports = {
    getUsersCount,
    getUsers,
    getUserByEmail,
    saveUser
}
