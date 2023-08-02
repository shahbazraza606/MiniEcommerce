const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    email:{
        type: String,
        required: true,
        unique:true,
    },
    phonenumber:{
        type: String,
        required: true,
    },
    address:{
        type: String,
        required: true,
    },
    gender:{
        type: String,
        required: true,
    },
    username:{
        type: String,
        required: true,
        unique:true,
    },
    password:{
        type: String,
        required: true,
    },
    type:{
        type: String,
        required: true,
    
    }
})

userSchema.pre("save", async function(next){
    try{
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(this.password, salt);
        this.password = hashedPassword;
        next();
    }catch(error){
        next(error);
    }
}
)

module.exports = mongoose.model("User", userSchema);
