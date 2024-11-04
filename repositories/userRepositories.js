const userModel = require('../models/userModel')

const add = (data) =>{
    const user = new userModel(data)
    return user.save()
}

const update = (email,data) =>{
    const {firstName,lastName,mobile,gender,qualification,degree,
        skills,passout 
    }    = data
    return userModel.updateOne({email},{
        $set:{
            firstName,
            lastName,
            mobile,
            gender,
            qualification,
            degree,
            skills,
            passout,
            updateAt: Date.now()

        }
    });
    
}
const getUsers =(pageIndex, pageSize,options)=>{
    const projection = {_id : 0,__v : 0,password : 0}
  const {name, qualification, degree, skills} = options
    const filter = {
       
        $or : [
            {firstName : {$regex :name,$options : 'i'}, },
            {lastName : {$regex : name,$options : 'i'}},
        ]
    }
    if (degree)  filter.degree = degree
    if (skills){
        const skillsArr = skills.split(',')
        filter.skills = {$all : skillsArr}
    }
    if (qualification) filter.qualification = qualification
    const skipRows = pageIndex * pageSize
    const sort = options.sort ? {[options.sort]: options.sortDir || 1  } : {updatedAt:-1}
   return userModel.find(filter,projection)
   .sort(sort)
   .skip(skipRows)
   .limit(pageSize)
}

const getUserByEmail = (email)=>{
    const projection = {_id : 0,__v : 0,password : 0}
    const filter  = {email}
    return userModel.findOne(filter,projection)
}
 
const getUserCount = (options)=>{
    const {name, qualification, degree, skills} = options
    const filter = {
        $or: [
            {firstName : {$regex : name, $options : 'i'} },
            {lastName : {$regex : name, $options : 'i'}}
        ]
    }
    if (degree) filter.degree = degree
    if (qualification) filter.qualification =  qualification
    if (skills) {
        const skillsArr = skills.split(',')
        filter.skills = {$all : skillsArr}
    }
    return userModel.countDocuments(filter)
}

const getUser = (email) =>{
    return userModel.findOne({email},{password:1,email:1,role:1})
}




module.exports = {add, update,getUsers,getUserByEmail,getUserCount,getUser}