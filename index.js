const express = require('express')
const app = express()
const port = 8000
const defaultRouter = require('./routes/defaultRouter')
const userRouter = require('./routes/userRouter')
const mongoose = require('mongoose')
const morgan = require('morgan')
const config = require('./config/index')
const bodyparser = require('body-parser')
const path = require('path')
const fs = require('fs')



app.use(bodyparser.json())

app.listen(port, ()=>{
    console.log("server is running on port")
})

const dir= path.join(__dirname,'logs')
if (!fs.existsSync(dir)) fs.mkdirSync(dir)
const stream =
fs.createWriteStream(path.join(__dirname,'logs,request.log'),{flags:'a'})
app.use(morgan('combined',{stream}))

mongoose.connect(config.dbContStr)
.then(res => console.log("connected to mongodb"))
.catch(err => console.log("failed to connect"))





app.use('/',defaultRouter)

app.use('/api/users',userRouter)