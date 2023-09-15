var pgp = require("pg-promise")(/*options*/);
const Pool = require('pg').Pool
const sharp = require("sharp");
const fs = require("fs");
const connection_object = require('../config/settings.json');
const Binance = require('node-binance-api');
const pool = new Pool({
    host: connection_object.DB_HOST,
    user: connection_object.DB_USER,
    database: connection_object.DB_DATABASE,
    password: connection_object.DB_PASS,
    port: connection_object.DB_PORT,
});
module.exports.getNews=async (req,res)=>{
    console.log(connection_object.pk_key)
    console.log(connection_object.sc_key)
    const binance = new Binance().options({
      APIKEY: connection_object.pk_key,
      APISECRET: connection_object.sc_key
    });
    binance.bookTickers((error, balances) => {
        if ( error ) return console.error(error);

        var bal =balances.filter((el)=>{
            console.log(el.symbol,"ewweweweweew")
            return el.symbol.toLowerCase().indexOf("usdt")>=2
        })
        console.info("ETH balance: ", bal)
        res.status(200).json(bal.sort((el,el1)=>{
            return el1.bidPrice- el.bidPrice
        }))

      });
   
}
module.exports.getNewById=(req,res)=>{
    const id = parseInt(req.params.id)
    console.log(id)
    let newse;
    let language;
    let content;
    let rotation;
    let components;
    pool.query(
        'SELECT id_news, title, language_id, image, content_id, description '+
        'FROM news WHERE id_news = $1',[id], (error, results) => {
        if (error) {
            console.log( error)
            res.status(500).json({response:false})
        }else{
            newse= results.rows[0];
            console.log(newse)
            pool.query('SELECT  language_title, code  '+
            'FROM language WHERE id = $1',[newse.language_id],(er,resLang)=>{
                if (error) {
                    console.log( error)
                    res.status(500).json({response:false})
                }else{
                    language= resLang.rows[0];
                    pool.query('SELECT id, rotation_id  '+
                    'FROM content WHERE id = $1',[newse.content_id],(er,resCont)=>{
                        if (error) {
                            console.log( error)
                            res.status(500).json({response:false})
                        }else{
                            content= resCont.rows[0];
                            pool.query('SELECT  code  '+
                            'FROM rotation WHERE id = $1',[content.rotation_id],(er,resRot)=>{
                                if (error) {
                                    console.log( error)
                                    res.status(500).json({response:false})
                                }else{
                                    rotation= resRot.rows[0];
                                    console.log(content.id)
                                    pool.query('SELECT component.id AS component_id, component.body AS html_body, component.image_path, component.place_list , types.title AS type'+
                                    ' FROM component '+
                                    ' INNER JOIN types ON component.type_id=types.id'+
                                    ' WHERE component.content_id = $1'+
                                    ' ORDER BY  component.place_list ASC ',[content.id],(er,resCompon)=>{
                                        if (error) {
                                            console.log( error)
                                            res.status(500).json({response:false})
                                        }else{
                                            components= resCompon.rows;
                                            res.status(200).json({
                                                response:true,
                                                data:{
                                                    new:{
                                                        id:newse.id,
                                                        title:newse.title,
                                                        description:newse.description,
                                                        image:newse.image,
                                                        language:{
                                                            title :language.language_title,
                                                            code : language.code
                                                        },
                                                        content: {
                                                            rotation :rotation.code,
                                                            components: components
                                                        }
                                                    },
                                                }
                                            })
                                        }
                                    })
                                }
                            })
                        }
                    })
                }
            })
        }
    })
   
}

module.exports.createNews=async (req,res)=>{
     const { title, description, images, language_id, content_id} = req.body;
     console.log(title, description, images, language_id,content_id);
     console.log(req.file);
     fs.access("./upload/images", (error) => {
        if (error) {
          fs.mkdirSync("./upload/images");
        }
      });
      const { buffer, originalname } = req.file;
      const timestamp = new Date().toISOString();
      const ref = `${timestamp}-${originalname.split(".")[0]}.webp`;
      await sharp(buffer)
        .webp({ quality: 50 })
        .toFile("./upload/images" + ref);
      const link = `http://localhost:43123/${ref}`;
     pool.query(
         'INSERT INTO news (title,description, image, language_id,content_id) VALUES ($1, $2, $3, $4, $5) returning id',
         [title,description,ref, language_id,content_id], (error, results) => {
            if(err){
                res.status(500).json(
                    {
                        responce:false,
                    }
                )
            }
            
            console.log(results)
            res.status(200).json(
                {   responce:true, 
                    data:{
                         id:results.rows[0].id
                    }
             })    })
     
}

module.exports.deleteNews=(req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM news WHERE id = $1 returning id', [id], (error, results) => {
        if(err){
            res.status(500).json(
                {
                    responce:false,
                }
            )
        }
       
        res.status(200).json(
            {   responce:true, 
                data:{
                     id:results.rows[0].id
                }
         })    })
}

module.exports.updateNews=async (req,res)=>{
    const id = parseInt(req.params.id)
    const { title,description, language_id,content_id } = req.body;
    fs.access("./upload/images", (error) => {
        if (error) {
          fs.mkdirSync("./upload/images");
        }
      });
      const { buffer, originalname } = req.file;
      const timestamp = new Date().toISOString();
      const ref = `${timestamp}-${originalname.split(".")[0]}.webp`;
      await sharp(buffer)
        .webp({ quality: 50 })
        .toFile("./upload/images" + ref);
      const link = `http://localhost:43123/${ref}`;
    pool.query(
    'UPDATE news SET title = $1, language_id = $2, description = $3, image = $4, content_id = $5 WHERE id = $6 returning id',
    [title, language_id,description,ref,content_id,id],
        (error, results) => {
            if(err){
                res.status(500).json(
                    {
                        responce:false,
                    }
                )
            }
            res.status(200).json(
                {   responce:true, 
                    data:{
                         id:results.rows[0].id
                    }
             })        }
  )
}