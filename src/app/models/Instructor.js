const { date } = require('../../lib/utils')

const db = require('../../config/db')

module.exports = {
    all(callback) {

        db.query(`
        SELECT INSTRUCTORS.*, COUNT(MEMBERS) AS TOTAL_STUDENTS
        FROM INSTRUCTORS
        LEFT JOIN MEMBERS ON (INSTRUCTORS.ID = MEMBERS.INSTRUCTOR_ID)
        GROUP BY INSTRUCTORS.ID
        ORDER BY TOTAL_STUDENTS DESC`, function (err, results) {
            if (err) throw `DataBase ERROR! ${err}`

            callback(results.rows)

        })
    },
    create(data, callback) {
        const query = `
            INSERT INTO instructors(
                name, 
                avatar_url,
                gender,
                services,
                birth,
                created_at
            ) VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING id
        `

        const values = [
            data.name,
            data.avatar_url,
            data.gender,
            data.services,
            date(data.birth).iso,
            date(Date.now()).iso,
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `DataBase ERROR! ${err}`

            callback(results.rows[0])
        })
    },

    find(id, callback) {
        db.query(`
        SELECT * 
        FROM instructors
        WHERE id = $1`, [id], function (err, results) {
            if (err) throw `Database Error! ${err}`
            callback(results.rows[0])
        })
    },
    findBy(filter, callback){
        db.query(`
        SELECT INSTRUCTORS.*, COUNT(MEMBERS) AS TOTAL_STUDENTS
        FROM INSTRUCTORS
        LEFT JOIN MEMBERS ON (INSTRUCTORS.ID = MEMBERS.INSTRUCTOR_ID)
        WHERE INSTRUCTORS.NAME ILIKE '%${filter}%'
        OR INSTRUCTORS.SERVICES ILIKE '%${filter}%'
        GROUP BY INSTRUCTORS.ID
        ORDER BY TOTAL_STUDENTS DESC`, function (err, results) {
            if (err) throw `DataBase ERROR! ${err}`

            callback(results.rows)

        })
    },
    update(data, callback) {
        const query = `
        UPDATE instructors SET
            avatar_url=($1),
            name=($2),
            birth=($3),
            gender=($4),
            services=($5)
        WHERE id = $6
        `

        const values = [
            data.avatar_url,
            data.name,
            date(data.birth).iso,
            data.gender,
            data.services,
            data.id
        ]

        db.query(query, values, function (err, results) {
            if (err) throw `DataBase ERROR! ${err}`
            callback()
        })
    },
    delete(id, callback) {
        db.query(`DELETE FROM instructors WHERE id = $1`, [id], function (err, results) {
            if (err) throw `DataBase ERROR! ${err}`

            return callback()
        })
    }
}