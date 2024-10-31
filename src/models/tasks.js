import {mongoose, Schema} from "mongoose" ;

const tasks = new Schema({
    title : {
        type : String,
        required : true
    },
    description : {
        type : String,
        require : true
    },
    isCompleted : {
        type : Boolean,
        default : false
    },
    user : {
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "User"
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
});

mongoose.models = {} ;

export const Tasks = mongoose.model("Tasks", tasks);