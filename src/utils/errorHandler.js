const errorHandler = (err, req, res, next) => {
    console.error(err.stack); // Log the error stack trace for debugging
  
    // Default error response
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal Server Error";
  
    res.status(statusCode).json({
      success: false,
      message,
      ...(process.env.NODE_ENV === "development" && { stack: err.stack }), // Include stack trace in development
    });
  };
  
  module.exports = errorHandler;