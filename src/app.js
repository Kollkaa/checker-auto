const express = require('express');
const app = express();

const userRouter = require('./routes/user_router');
const newsRoute = require('./routes/news_router');
const contnetRoute = require('./routes/content_router');
const componentRouter = require('./routes/component_router');

const languageRoute = require('./routes/variable/langunage_router');
const mainConfigRoute = require('./routes/variable/get_main_config_router');

const bodyParser = require('body-parser');



// app.use('/',(req,res)=>{
//   let date =new Date()
//   res.send({
//     "date":date.toUTCString(),
//     "server":"server1"
//   })
// })

app.use(bodyParser.json()) // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/user',(req,res)=>{
    console.log(req.body)
    console.log("user")
    const CoinMarketCap = require('coinmarketcap-api')
 
    const apiKey = '5e7ea113-55b9-42c9-871b-39f1616065c2'
    const client = new CoinMarketCap(apiKey)
     
    client.getMetadata({symbol: ['QMALL', 'WWY']}).then((e)=>{
        res.send(e)
    }).catch(console.error)
    
})


module.exports = app;