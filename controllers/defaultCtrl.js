const config = require('../config/index.js')
const mongoose = require('mongoose')
const logger =require('../utils/logger')


const get = (req,res)=>{
    logger.info({message:'user requested for root'})

    res.status(200)
    res.send("fsa api")
}

const health = async(req,res)=>{

try {
    logger.info({message:'user requested for health'})

    await mongoose.connect(config.dbContStr)
    res.status(201)
    res.send({db:'up'})
} catch(e){
    logger.info({message:'failed to connect to db',error:e})

res.status(500)
res.send("internal server error")
}

   
}



module.exports = {get,health}