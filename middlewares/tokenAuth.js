const jwt = require('jsonwebtoken')

const tokenAuth = (req,res,next)=>{
try{
    const authheader = req.headers.authorization
    const tokens = authheader.split(' ')
    const jwtToken = tokens[1]
    const result = jwt.verify(jwtToken,'secret@123$')
    req.role = result.role
    console.log(result,"token")
    next()
}
catch(e){
res.status(401).send('Unauthorized')
}
}

module.exports = tokenAuth