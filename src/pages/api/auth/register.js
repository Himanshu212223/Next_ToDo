import { RequestHandler } from "@/Utils/RequestHandler";
import { cookieHandler } from "@/Utils/coockeHandler"
import { connectDB, generateToken } from "@/Utils/features";
import { responseHandler } from "@/Utils/responseHandler";
import { User } from "@/models/users";
import bcrypt from 'bcryptjs';

const register = RequestHandler(async (request, response) => {
    if (request.method !== "POST") {
        return responseHandler(response, false, 405, "Only POST Method is allowed.");
    }

    const { name, email, password } = request.body;

    if (!name || !email || !password) {
        return responseHandler(response, false, 403, "Please provide all the details");
    }

    await connectDB();

    let user = await User.findOne({ email: email });
    if (user) {
        return responseHandler(response, false, 409, "User alredy exist.");
    }

    let securedPassword = null ;

    try {
        const stringifiedPassword = password.toString() ;
        let salt = await bcrypt.genSalt(10) ;
        securedPassword = await bcrypt.hash(stringifiedPassword, salt);
    }
    catch (error) {
        console.log(error);
        return responseHandler(response, false, 500, "Internal Server Error.")
    }


    user = await User.create({
        name: name,
        email: email,
        password: securedPassword
    });

    let tempUser = {
        id: user._id
    }

    const token = generateToken(tempUser);

    cookieHandler(response, token, true);

    // return responseHandler(response, true, 201, `User ${user.name} Registered Successfully.`);
    return response.status(201).json({
        success : true,
        message : `User ${user.name} Registered Successfully`,
        user : user
    });

});

export default register;