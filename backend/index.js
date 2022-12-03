const express = require('express');
const app = express();
const router = express.Router();
const mongoose = require('mongoose');
const Location = require('./mode.js');
const cors = require('cors');
const bodyParser = require('body-parser')
app.use(cors());
app.use(bodyParser.urlencoded({extended : true }));
app.use(bodyParser.json());


router.post('/addLocation',(req,res)=>{
    Location.create({date : req.body.date, loc : [...req.body.loc]}, (err,doc)=>{
        if(err){
            res.json({
                status : 'failed',
                message : err
            })
        }else{
            res.json({
                status : 'success',
                message : 'successfully updated',
                data : doc
            })
        }
    })
})
router.get('/select',(req,res)=>{
    Location.find({},(err,doc)=>{
        if(err){
            res.json({
                status : 'failed',
                message : 'invalid id'
            })
        }else{
            res.json({
                status : 'success',
                data : doc
            })
        }
    })
})

app.use('/',router);
mongoose.connect('mongodb://127.0.0.1:27017/map').then(()=>console.log('database connected......')).catch((err)=>(console.log(err)));
app.listen(5000,()=>console.log('Port successfully running on 5000 ...'))