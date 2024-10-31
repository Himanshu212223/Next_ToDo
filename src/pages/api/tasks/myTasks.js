import { Tasks } from "@/models/tasks";
import { checkUserAuth, connectDB } from "@/Utils/features";
import { RequestHandler } from "@/Utils/RequestHandler";
import { responseHandler } from "@/Utils/responseHandler";

const myTasks = RequestHandler(async (request, response)=> {

    if(request.method !== "GET"){
        return responseHandler(response, false, 405, "Only GET Method is allowed.");
    }

    await connectDB();

    const user = await checkUserAuth(request) ;

    if(!user){
        return responseHandler(response, false, 401, "Login First.") ;
    }

    const tasks = await Tasks.find({user : user._id});

    return responseHandler(response, true, 200, tasks);
});

export default myTasks ;