import mongoose from "mongoose";
// import {jwt} from "jsonwebtoken" ;
import jwt, { sign } from "jsonwebtoken";
import { User } from "@/models/users";

export const connectDB = async() => {
    const {connection} = await mongoose.connect(process.env.MONGO_URI, {
        dbName : "NeXtTodo"
    });

    console.log(`!!! Congratulations, DataBase is connected to ${connection.host}  !!!`);
}


export const generateToken = (content) => {
    let signed = null ;
    try{
        signed = jwt.sign(content, process.env.JWT_SECRET);
    }
    catch(error){
        console.log(error) ;
    }
    return signed ;
}


export const checkUserAuth = async (request, response) => {
    const cookie = request.headers.cookie ;
    if(!cookie){
        return null ;
    }
    const token = cookie.split("=")[1] ;
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) ;
    return await User.findById(decodedData.id) ;
}