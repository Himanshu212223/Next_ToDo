import { cookieHandler } from "@/Utils/coockeHandler";
import { responseHandler } from "@/Utils/responseHandler";

const { RequestHandler } = require("@/Utils/RequestHandler");

const logout = RequestHandler(async (request, response)=>{
    if(request.method !== "GET"){
        return responseHandler(response, false, 405, "Only GET Method is allowed") ;
    }

    cookieHandler(response, null, false);

    return responseHandler(response, true, 200, "Logout Successfully.");
})

export default logout ;