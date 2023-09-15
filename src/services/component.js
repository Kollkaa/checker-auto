var pgp = require("pg-promise")(/*options*/);
const Pool = require('pg').Pool
const sharp = require("sharp");
const fs = require("fs");
const connection_object = require('../config/settings.json');
const pool = new Pool({
    host: connection_object.DB_HOST,
    user: connection_object.DB_USER,
    database: connection_object.DB_DATABASE,
    password: connection_object.DB_PASS,
    port: connection_object.DB_PORT,
});
module.exports.getComponent=(req,res)=>{
    pool.query('SELECT id, type_id, body, image_path, content_id, place_list FROM component ORDER BY id ASC',
    (err,result)=>{
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

module.exports.getComponentById=(req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('SELECT id, type_id, body, image_path, content_id, place_list FROM component WHERE id=$1 ORDER BY id ASC',
    [id],(err,result)=>{
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
module.exports.createComponent=(req,res)=>{

    const body=req.body;
    pool.query('INSERT INTO component (type_id,body,image_path,content_id,place_list) VALUES ($1,$2,$3,$4,$5) returning id',
    [body.type_id,body.body,body.image_path,body.content_id,body.place_list],(err,result)=>{
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
                data: "Create Component id:"+result.rows[0].id
            }
        )
    })
}
module.exports.deleteComponentById=(req,res)=>{
    const id = parseInt(req.params.id)
    
    pool.query('DELETE FROM component WHERE id = $1 returning id',[id],(err,result)=>{
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
                data: "Delete Component id:"+result.rows[0].id
            }
        )
    })
}
module.exports.updateComponentById=(req,res)=>{
    const id = parseInt(req.params.id)
    const body = req.body;
   
    pool.query('UPDATE component SET type_id = $1, body = $2, image_path = $3, content_id = $4, place_list = $5'+
     ' WHERE id = $6 returning id',[body.type_id,body.body,body.image_path,body.content_id,body.place_list,id],(err,result)=>{
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
                data: "Update Component id:"+result.rows[0].id
            }
        )
    })
}