const {Schema, model} = require("mongoose");

const UserSchema = new Schema({
    username:{
        type: String,
        min: 1,
        max:16,
        unique:true,
        required:true
        },
    password:{
        type:String,
        min:1,
        max:16,
        required:true
    },
    isActive:{
        type:Boolean,
        default:true
    },

},{
    versionKey:false,
})


module.exports = model("Users", UserSchema)