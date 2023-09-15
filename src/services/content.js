var pgp = require("pg-promise")(/*options*/);
const Pool = require('pg').Pool
const connection_object = require('../config/settings.json');
const pool = new Pool({
    host: connection_object.DB_HOST,
    user: connection_object.DB_USER,
    database: connection_object.DB_DATABASE,
    password: connection_object.DB_PASS,
    port: connection_object.DB_PORT,
});

module.exports.getContent=(req,res)=>{
    pool.query('SELECT id, rotation_id FROM content ORDER BY id ASC',(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    responce:false,
                }
            )
        }
        res.status(200).json(
            {
                responce:true,
                data: result.rows
            }
        )
    })
}

module.exports.getContentById=(req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('SELECT id, rotation_id FROM content WHERE id =$1',[id],(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    responce:false,
                }
            )
        }
        res.status(200).json(
            {
                responce:true,
                data: result.rows
            }
        )
    })
}
module.exports.createContent=(req,res)=>{
    const body = req.body;
    pool.query('INSERT INTO content (rotation_id) VALUES ($1)',[body.rotation_id],(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    responce:false,
                }
            )
        }
        res.status(200).json(
            {
                responce:true,
                data: "Create Content id:"+result.rows[0].id
            }
        )
    })
}
module.exports.deleteContentById=(req,res)=>{
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM content WHERE id = $1 returning id',[id],(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    responce:false,
                }
            )
        }
        res.status(200).json(
            {
                responce:true,
                data: "Delete Content id:"+result.rows[0].id
            }
        )
    })
}
module.exports.updateContentById=(req,res)=>{
    const id = parseInt(req.params.id)
    const body = req.body;
   
    pool.query('UPDATE content SET title = $1 WHERE id = $2 returning id',[body.rotation_id,id],(err,result)=>{
        if(err){
            res.status(500).json(
                {
                    responce:false,
                }
            )
        }
        res.status(200).json(
            {
                responce:true,
                data: "Update Content id:"+result.rows[0].id
            }
        )
    })
}