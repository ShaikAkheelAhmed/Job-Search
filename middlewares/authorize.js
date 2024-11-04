const Role = {
candidate : 0,
recruiter : 1,
admin : 2
}



const authorizeRecruter = async (req,res,next)=>{
    if (req.role === Role.recruiter)next()
    
        
   else res.status(403).send("You don't have access")
    
}

const authorizeAdmin = (req, res, next)=>{
    if (req.role === Role.admin) next()
      
    else res.status(403).send("Forbiddensds")
 
}


module.exports = {authorizeAdmin,authorizeRecruter}