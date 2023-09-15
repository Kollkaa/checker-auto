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
module.exports.getLanguage=(req,res)=>{
    pool.query('SELECT id, language_title, image, code '+
	'FROM language ORDER BY id ASC ', (error, results) => {
        if (error) {
            console.log( error)
        }
        res.status(200).json(results.rows)
      })
}

module.exports.createLanguage=(req,res)=>{
    const { title, image, code } = req.body;
    pool.query('INSERT INTO language (language_title, image, code)'+
    ' VALUES ($1, $2, $3) returning id', 
    [title,image,code], (error, results) => {
       if (error) {
           console.log( error)
       }
       res.status(200).json(
           {   responce:true, 
               data:{
                    id:results.rows[0].id
               }
        })
   })
}

module.exports.deleteLanguage=(req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM language WHERE id = $1 returning id', [id], (error, results) => {
        if (error) {
            console.log( error)
        } 
        res.status(200).json(
            {   responce:true, 
                data:{
                     id:results.rows[0].id
                }
         })
    })
}

module.exports.updateLanguage=(req,res)=>{
    const id = parseInt(req.params.id)
    const { title, image, code } = req.body;
    pool.query(
        'UPDATE language SET language_title = $1, image = $2, code=$3 WHERE id = $4 returning id',
        [title, image, code, id],
        (error, results) => {
          if (error) {
            console.log( error)
          }
          res.status(200).json(
            {   responce:true, 
                data:{
                     id:results.rows[0].id
                }
         })
        }
      )
}