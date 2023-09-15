var pgp = require("pg-promise")(/*options*/);
const Pool = require('pg').Pool

const connection_object = require('../../config/settings.json');
const pool = new Pool({
    host: connection_object.DB_HOST,
    user: connection_object.DB_USER,
    database: connection_object.DB_DATABASE,
    password: connection_object.DB_PASS,
    port: connection_object.DB_PORT,
});
module.exports.getRotation=(req,res)=>{
    pool.query('SELECT id, code '+
	'FROM rotation ORDER BY code ASC ', (error, results) => {
        if (error) {
            console.log( error)
        }
        res.status(200).json(results.rows)
      })
}
module.exports.updateRotation=(req,res)=>{
    pool.query('UPDATE  id, code '+
	'FROM rotation ORDER BY code ASC ', (error, results) => {
        if (error) {
            console.log( error)
        }
        res.status(200).json(results.rows)
      })
}


