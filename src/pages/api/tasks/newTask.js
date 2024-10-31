import { Tasks } from "@/models/tasks";
import { checkUserAuth, connectDB } from "@/Utils/features"
import { RequestHandler } from "@/Utils/RequestHandler"
import {responseHandler} from "@/Utils/responseHandler";

const handler = RequestHandler(async (request, response) => {

    if (request.method != "POST") {
        return responseHandler(response, false, 405, "Only POST Method is allowed.")
    }


    const {title, description} = request.body ;

    if(!title || !description){
        return responseHandler(response, false, 403, "Please provide all the parameters.");
    }


    await connectDB();

    const user = await checkUserAuth(request) ;

    if(!user){
        return responseHandler(response, false, 401, "Login First") ;
    }

    await Tasks.create({
        title : title, 
        description : description,
        user : user.id
    });


    return responseHandler(response, true, 201, "Task created Successfully.")
})

export default handler;