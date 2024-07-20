const errorHandler = (error, req, res, next) => {
    let statusCode = error.status || 500;
    let errorMessage = error.message || "Internal server Error";
    res.status(statusCode).send({Error: errorMessage, Stack: error.stack, Name: error.name, Status: error.status, });
}

export default errorHandler;