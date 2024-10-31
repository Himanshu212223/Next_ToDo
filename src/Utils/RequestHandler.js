import {responseHandler} from "@/Utils/responseHandler"

export const RequestHandler = (passedFunction) => async (request, response) => {
    return Promise.resolve(passedFunction(request, response)).catch((error)=>{
        return responseHandler(response, false, 500, error)
    })
}