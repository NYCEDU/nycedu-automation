const pg = require('pg')

function createUsersTable (callback) {
    const query = `CREATE TABLE IF NOT EXISTS users(
        id SERIAL PRIMARY KEY NOT NULL,
        email TEXT UNIQUE NOT NULL
        );`
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query(query, function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                console.log("createUsersTable succeeded!")
                console.log(result)
                if (callback) {
                    callback(result)
                }
            }
        })
    })
}

function getUsersCount (callback) {
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        client.query('SELECT COUNT(*) FROM users', function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                const count = parseInt(result.rows[0].count, 10)
                if (callback) {
                    callback(count)
                }
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
                if (callback) {
                    callback(result.rows)
                }
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
                if (callback) {
                    callback(result.rows[0])
                }
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
    createUsersTable,
    getUsersCount,
    getUsers,
    getUserByEmail,
    saveUser
}
