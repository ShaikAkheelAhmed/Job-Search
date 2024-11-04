const mongoose = require("mongoose")

const userModel = mongoose.model('user',{
    firstName : {type : String, 
    minLength : [3, '3 character are allowed'],
    maxLength : [100, 'max character are allowed'],
    required :[true, 'First name is required']
    },
    lastName : {
        type : String, 
        required : [true, 'Last name is required']
    },
    gender : String,
    password : String,
    active : {type : Boolean, default : 1},
    email:{type:String,
        unique:true,
        required : [true, 'Email is required'], 
        validate:function(v){
        validator: v => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v) 
        
        message : props => `${props.value} is not a valid email `
        },
     },
    mobile : {type : String,
    validate: {validator: v =>{
        return /[0-9]{10}/.test(v);
    },
    message : ()=> 'Invalid phone number' 
  }
  },
    qualification : Number,
    degree : String,
    image : String,
    resume : String,
    role : {type: Number, default : 0},
    skills : [String],
    passout : Number,
    createdAt : Date,
    updatedAt : {type :Date, default : Date.now()}




})


module.exports = userModel