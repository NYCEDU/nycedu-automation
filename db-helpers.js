const pg = require('pg'),
    FORM_SUBMISSIONS_TABLE_NAME = "form_submissions"

function setTimestampParsersToReturnStrings(types) {
    // 1114 and 1184 are the OID for postgres TIMESTAMPTZ and TIMESTAMP
    // This tells node-pg not to convert these to Js Date objects, just return the string value from postgres
    [1114, 1184].forEach( (oid) => {
        types.setTypeParser(oid, (stringValue) => {
            return stringValue
        })
    })
}

// Wraps pg.connect so that we can change some default behavior for node-pg
function openDbConnection (callback) {
    // override default behavior for node-pg here:
    setTimestampParsersToReturnStrings(pg.types)

    // open the database connection and execute query/callback
    pg.connect(process.env.DATABASE_URL, function (err, client, done) {
        if (err) {
            console.log("Database connection error: ", err)
        } else {
            if (callback) {
                callback(err, client, done)
            }
        }
    })
}

function createFormSubmissionsTable (callback) {
    const query = `CREATE TABLE IF NOT EXISTS ${FORM_SUBMISSIONS_TABLE_NAME}(
        id SERIAL PRIMARY KEY NOT NULL,
        email TEXT NOT NULL,
        date_submit TIMESTAMP WITH TIME ZONE NOT NULL,
        unique (email, date_submit)
        );`
    openDbConnection( (err, client, done) => {
        client.query(query, function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                console.log(`create ${FORM_SUBMISSIONS_TABLE_NAME} table succeeded!`)
                console.log(result)
                if (callback) {
                    callback(result)
                }
            }
        })
    })
}

// Returns the STRING VALUE of the most recent date_submit from the database
function getMostRecentDateSubmit (callback) {
    openDbConnection( (err, client, done) => {
        const latestDateQuery = `SELECT date_submit FROM ${FORM_SUBMISSIONS_TABLE_NAME}
                                ORDER BY date_submit DESC
                                LIMIT 1;`
        client.query(latestDateQuery, function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                const mostRecentDate = result.rows[0].date_submit
                console.log("Found most recent submit date in db:", mostRecentDate)
                if (callback) {
                    callback(mostRecentDate)
                }
            }
        })
    })
}

function getFormSubmissionsCount (callback) {
    openDbConnection( (err, client, done) => {
        const getCountQuery = `SELECT COUNT(*) FROM ${FORM_SUBMISSIONS_TABLE_NAME}`
        client.query(getCountQuery, function (err, result) {
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

function getAllFormSubmissions (callback) {
    openDbConnection( (err, client, done) => {
        const getAllQuery = `SELECT * FROM ${FORM_SUBMISSIONS_TABLE_NAME}`
        client.query(getAllQuery, function (err, result) {
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

function getFormSubmission (email, dateSubmit, callback) {
    openDbConnection( (err, client, done) => {
        const findQuery = `SELECT * FROM ${FORM_SUBMISSIONS_TABLE_NAME}
                        WHERE email = $1
                        AND date_submit = $2`
        client.query(findQuery, [email, dateSubmit], function (err, result) {
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

function saveFormSubmission (email, dateSubmit, callback) {
    openDbConnection( (err, client, done) => {
        const saveQuery = `INSERT INTO ${FORM_SUBMISSIONS_TABLE_NAME} (email, date_submit)
                        VALUES ($1, $2)`
        client.query(saveQuery, [email, dateSubmit], function (err, result) {
            done()
            if (err) {
                console.error(err)
            } else {
                console.log(`successfully saved form submission: ${email}, ${dateSubmit}`)
                console.log(result)
                if (callback) {
                    callback(result)
                }
            }
        })
    })
}

function saveFormSubmissions (submissions, callback) {
    submissions.forEach ( s => {
        console.log("Saving form submission:", s)
        saveFormSubmission(s.email, s.dateSubmit, callback)
    })
}

module.exports = {
    createFormSubmissionsTable,
    getMostRecentDateSubmit,
    getFormSubmissionsCount,
    getAllFormSubmissions,
    getFormSubmission,
    saveFormSubmission,
    saveFormSubmissions,

}
