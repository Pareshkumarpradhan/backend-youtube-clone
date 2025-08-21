// Custom error class for handling API errors
class ApiError extends Error {
    // Constructor to initialize the error with customizable properties
    constructor(
        statusCode, // HTTP status code (e.g., 400, 500)
        message = "Something went wrong", // Default error message
        errors = [], // Array to store additional error details
        stack = "" // Optional stack trace for debugging
    ){
        // Call the parent Error class constructor with the message
        super(message);
        
        // Assign the HTTP status code
        this.statusCode = statusCode;
        
        // Initialize data as null (can be used for additional error context if needed)
        this.data = null;
        
        // Store the error message
        this.message = message;
        
        // Indicate the operation was unsuccessful
        this.success = false;
        
        // Store additional error details (e.g., validation errors)
        this.errors = errors;

        // Handle stack trace for debugging
        if(stack){
            // Use provided stack trace if available
            this.stack = stack;
        } else {
            // Capture the stack trace, excluding the constructor call
            Error.captureStackTrace(this, this.constructor);
        }
    }
}

// Export the ApiError class for use in other modules
export {ApiError};