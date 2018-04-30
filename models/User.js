const mongoose = require("mongoose");
const encryption = require("../util/encryption");

const userSchema = new mongoose.Schema({
    email:{
        type:mongoose.Schema.Types.String,
        required:true,
        unique:true
    },
    hashedPass:{
        type:mongoose.Schema.Types.String,
        required:true,
    },
    name:{
        type:mongoose.Schema.Types.String
    },
    salt:{
        type:mongoose.Schema.Types.String,
        required:true
    },
    roles:[{type:mongoose.Schema.Types.String}],
});

userSchema.method({
    authenticate:function(password){
     return encryption.generateHashedPassword(this.salt,password) === this.hashedPass;
    }
});

const User =  mongoose.model("User",userSchema);

User.seedAdminUser = ()=>{
    User.find({})
    .then(users =>{
     if (users.length > 0 ) return;
     let salt = encryption.generateSalt();
     let hashedPass = encryption.generateHashedPassword(salt,'aD12min');
     User.create({
        email:"Admin",
        hashedPass,
        salt,
        roles:["Admin"]
     });
    }).catch(err=>{
        console.log(err)
    });
}

module.exports = User;


