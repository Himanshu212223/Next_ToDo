export const responseHandler = (response, success=false, status=500, message="Internal Server Error") => {
    return response.status(status).json({
        success : success,
        message : message
    })
}