import {mongoose, Schema} from 'mongoose' ;

const user = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true,
        select : false,
        minLength : [4, "Password too short"]
    }
});


mongoose.models = {} ;
export const User = mongoose.model("User", user) ;