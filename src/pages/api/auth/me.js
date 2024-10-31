import { User } from "@/models/users";
import { checkUserAuth, connectDB } from "@/Utils/features";
import { responseHandler } from "@/Utils/responseHandler";

const { RequestHandler } = require("@/Utils/RequestHandler");

const me = RequestHandler(async (request, response) => {
    if(request.method !== "GET"){
        return responseHandler(response, false, 405, "Only GET Method is allowed") ;
    }

    await connectDB();

    let user = await checkUserAuth(request) ;


    if(!user){
        return responseHandler(response, false, 401, "Login First") ;
    }

    // return responseHandler(response, true, 200, user) ;
    return response.status(200).json({
        success : true,
        message : "User is already Logged in.",
        user : user
    });
})

export default me ;