import { User } from "@/models/users";
import { cookieHandler } from "@/Utils/coockeHandler";
import { connectDB, generateToken } from "@/Utils/features";
import { RequestHandler } from "@/Utils/RequestHandler";
import { responseHandler } from "@/Utils/responseHandler";
import bcrypt from 'bcryptjs';

const login = RequestHandler(async (request, response)=>{

    if(request.method !== "POST"){
        return responseHandler(response, false, 405, "Only POST Mehtod is allowed.");
    }

    const {email, password} = request.body ;

    if(!email || !password){
        return responseHandler(response, false, 403, "Please provide all the parameters.");
    }

    await connectDB();

    const user = await User.findOne({email : email}).select("+password");

    if(!user){
        return responseHandler(response, false, 401, "Invalid User or Password.");
    }

    const isMatch = await bcrypt.compare(password, user.password) ;
    
    if(!isMatch){
        return responseHandler(response, false, 401, "Invalid User or Password.");
    }


    const tempUser = {
        id : user._id
    }

    const token = generateToken(tempUser) ;

    cookieHandler(response, token, true) ;

    // return responseHandler(response, true, 200, `Welcome back ${user.name}.`);
    return response.status(200).json({
        success : true,
        message : `Welcome back ${user.name}`,
        user : user
    });
})

export default login ;