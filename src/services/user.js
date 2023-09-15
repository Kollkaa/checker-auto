var pgp = require("pg-promise")(/*options*/);
const Pool = require('pg').Pool
const { Cexio,CoinMarketCap } = require('node-crypto-api');

module.exports.getUser=(req,res)=>{
    const CoinMarketCap = require('coinmarketcap-api')
 
    const apiKey = '5e7ea113-55b9-42c9-871b-39f1616065c2'
    const client = new CoinMarketCap(apiKey)
     
    client.getMetadata({symbol: ['QMALL', 'WWY']}).then(console.log).catch(console.error)
     
}

module.exports.createUser=(req,res)=>{
     const { emp, name, email,address } = req.body;
     pool.query('INSERT INTO address (city, street) VALUES ($1, $2) returning id', [address.split(",")[0], address.split(",")[1]], (error, results) => {
        if (error) {
            console.log( error)
        }
        console.log(results.rows[0].id)
        pool.query('INSERT INTO users (name, email,address_id) VALUES ($1, $2, $3) returning id', [name, email,results.rows[0].id], (error, results) => {
            if (error) {
                console.log( error)
            }
            res.status(200).json(
                {   responce:true, 
                    data:{
                         id:results.rows[0].id
                    }
             })        })
    })
     
}

module.exports.deleteUser=(req,res)=>{
    const id = parseInt(req.params.id)
    pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
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

module.exports.updateUser=(req,res)=>{
    const id = parseInt(req.params.id)
  const { name, email } = req.body
  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
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