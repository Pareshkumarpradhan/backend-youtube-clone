// Custom class for standardizing API response structure
class ApiResponse {
    // Constructor to initialize the response with status code, data, and message
    constructor(
        statusCode, // HTTP status code (e.g., 200, 201)
        data, // Response data payload
        message = "Success" // Default success message
    ) {
        // Assign the HTTP status code
        this.statusCode = statusCode;
        
        // Store the response data
        this.data = data;
        
        // Store the response message
        this.message = message;
        
        // Determine if the response is successful based on status code (< 400)
        this.success = statusCode < 400;
    }
}

// Export the ApiResponse class for use in other modules
export { ApiResponse };