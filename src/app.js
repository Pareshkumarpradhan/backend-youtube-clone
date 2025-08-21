// Import required dependencies
import express from "express"; // Express framework for building the server
import cors from "cors"; // CORS middleware for handling cross-origin requests
import cookieParser from "cookie-parser"; // Middleware for parsing cookies

// Initialize the Express application
const app = express();

// Configure CORS middleware to allow cross-origin requests
app.use(cors({
    origin: process.env.CORS_ORIGIN, // Allow requests from the specified origin (defined in environment variables)
    credentials: true // Allow cookies and credentials to be sent with requests
}));

// Parse incoming JSON requests with a size limit of 16kb
app.use(express.json({ limit: "16kb" }));

// Parse URL-encoded data (e.g., form submissions) with extended mode and a size limit of 16kb
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Serve static files from the "public" directory
app.use(express.static("public"));

// Parse cookies attached to incoming requests
app.use(cookieParser());

// Export the configured Express app for use in other modules
export { app };