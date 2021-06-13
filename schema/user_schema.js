require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt =require('bcryptjs');
const jwt=require("jsonwebtoken")

const user_schema= mongoose.Schema({
    username:{
        type: String ,
        required : true,
        unique:true

    },
    password:{
        type: String,
        required :true,
    },

    email:{
        type:String,
        required:true,
        unique:true
    },
    tokens:[{
        token:{
            type:String,
            require:true
        }
    }],
    imageUrl:{
        type:String,
    }
})


user_schema.methods.generateAuthToken=async function(){
    try{
        const token = jwt.sign({_id:this.id.toString() },process.env.SECRET_KEY)
        console.log(process.env.SECRET_KEY)
        
        this.tokens=this.tokens.concat({token})
        // await this.save()
        return token;
    }catch(error){
          res.send("error part"+error)
    }
}

user_schema.pre('save',async function(next){
    if(this.isModified('password')){
        console.log(this.password);
        this.password = await bcrypt.hash(this.password,10);
        console.log(this.password);
    }  
    next();
});

module.exports= mongoose.model('student',user_schema)