const dbUser = require('../models/userModel')
const userRepositories  = require('../repositories/userRepositories')
const cryptoUtils = require('../utils/cryptoUtils')
const jwt = require('jsonwebtoken')


const alreadyExists = (e) => e.message && e.message.indexOf('duplicate key') > -1

const hasError = (e) => e._message === 'User validation failed'       


const handleErrors = (e,res)=>{
    if (alreadyExists(e))
        res.status(409).send("User already exists")
    else if (hasError(e))
        res.status(400).json(e.errors)
    else
    res.status(500).send('Internal server error')

} 





const register = async (req,res) =>{
    try{
        const data = req.body
        data.password = await cryptoUtils.getHash(data.password)
        data.createdAt = Date.now()
        await userRepositories.add(data)
        res.status(201)
        res.send()
    }
    catch (e) {
        console.log(e)
        handleErrors(e,res)
    }
}

const update = async (req,res) =>{
    try{
      const email = req.params.email
      await userRepositories.update(email,req.body)
      res.status(204)
      res.send( )
    } 
    catch (e){
    res.status(500).send("internal server error")
    }
}

const getUsers = async (req,res) =>{
    try{
        const pageIndex = +req.params.page || 0
        const pageSize = +req.params.size   || 10
        const options = {
             name : req.query.name || '',
             degree : +req.query.degree,
             qualification : +req.query.qualification,
             skills : req.query.skills,
             sort : req.query.sort,
             sortDir : req.query.sortDir
        }
       
        const totalRecords = await userRepositories.getUserCount(options)
        const totalpages = Math.ceil(totalRecords/pageSize)
        const users = await userRepositories.getUsers(pageIndex, pageSize,options)
        const response = {
            data : users,
            metadata : {
                totalRecords : totalRecords,
                totalpages : totalpages
            }
        }
        
        res.status(200)
        res.json(response)
            }
            catch(e){
                console.log(e)
                res.status(500).send('Internal server error')
            }
        }

const getUserByEmail = (req,res)=>{
   
   userRepositories.getUserByEmail(req.params.email)
   .then(user => res.status(200).json(user))
   .catch(err =>res.status(500).send('Internal server error'))
}


const signin = async (req,res) =>{
    const payload = req.body
    const dbUser = await userRepositories.getUser(payload.email)
    // const hashedPwd = await userRepositories.getUserPassword(payload.password)
    if(!dbUser) 
        return res.status(401).send("Unauthorized")
    
 const result = await cryptoUtils.compare(payload.password,dbUser.password)

   
 if (result){
   const token =  cryptoUtils.getToken(dbUser)
    res.status(200)
    res.send(token)
}
else{
    res.status(401)
    res.send('Unauthorized')
}

}



const addRecruiter = async (req,res)=>{
    try{
        const user = req.body
        user.password = await cryptoUtils.getHash(user.password)
        user.createdAt = Date.now()
       user.role = 1
        await userRepositories.add(user)
        res.status(201).send("Succes")
     
    } catch(err){
        res.status(401).send("internal server error")
    }
  
}


module.exports = {register,update,getUsers,getUserByEmail,signin,addRecruiter}