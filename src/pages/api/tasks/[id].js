import { Tasks } from "@/models/tasks";
import { checkUserAuth, connectDB } from "@/Utils/features";
import { responseHandler } from "@/Utils/responseHandler";

const { RequestHandler } = require("@/Utils/RequestHandler");

const handler = RequestHandler(async (request, response) => {

    if (request.method === "PUT") {

        await connectDB();
        const user = checkUserAuth(request);
        if (!user) {
            return responseHandler(response, false, 401, "Login First.");
        }

        const taskId = request.query.id;
        
        const task = await Tasks.findById(taskId);
        if (!task) {
            return responseHandler(response, false, 404, "Task not found.");
        }

        task.isCompleted = !task.isCompleted;

        await task.save();

        return responseHandler(response, true, 200, "Task updated successfully.");
    }


    else if (request.method === "DELETE") {
        await connectDB();

        const user = await checkUserAuth(request);

        if (!user) {
            return responseHandler(response, false, 401, "Login First.");
        }

        const taskId = request.query.id;

        const task = await Tasks.findById(taskId);
        if (!task) {
            return responseHandler(response, false, 404, "Task not found.");
        }

        await Tasks.findByIdAndDelete(taskId) ;

        return responseHandler(response, true, 200, "Task Deleted Successfully.");
    }


    else {
        return responseHandler(response, false, 405, "This method is not allowed.");
    }
});

export default handler;