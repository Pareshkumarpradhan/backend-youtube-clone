// Import required dependencies
import mongoose, { Schema } from "mongoose"; // Mongoose for MongoDB interaction and Schema for defining the model structure
import jwt from "jsonwebtoken"; // JWT for generating authentication tokens
import bcrypt from "bcrypt"; // Bcrypt for password hashing

// Define the user schema with fields and their configurations
const userSchema = new mongoose.Schema(
  {
    userName: {
      type: String, // Username stored as a string
      required: true, // Mandatory field
      unique: true, // Ensures username is unique in the database
      lowercase: true, // Converts username to lowercase
      trim: true, // Removes leading/trailing whitespace
      index: true, // Creates an index for faster queries
    },
    email: {
      type: String, // Email stored as a string
      required: true, // Mandatory field
      unique: true, // Ensures email is unique in the database
      lowercase: true, // Converts email to lowercase
      trim: true, // Removes leading/trailing whitespace
    },
    fullName: {
      type: String, // Full name stored as a string
      required: true, // Mandatory field
      trim: true, // Removes leading/trailing whitespace
      index: true, // Creates an index for faster queries
    },
    avatar: {
      type: String, // URL for the user's avatar (e.g., from Cloudinary)
      required: true, // Mandatory field
    },
    coverImage: {
      type: String, // URL for the user's cover image (e.g., from Cloudinary)
    },
    watchHistory: [
      {
        type: Schema.Types.ObjectId, // Array of ObjectIds referencing Video documents
        ref: "Video", // References the Video model
      },
    ],
    password: {
      type: String, // Hashed password stored as a string
      required: [true, "Password is required"], // Mandatory field with custom error message
    },
    refreshToken: {
      type: String, // Stores the refresh token for authentication
    },
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Pre-save middleware to hash the password before saving the user document
userSchema.pre("save", async function (next) {
  // Skip hashing if the password field hasn't been modified
  if (!this.isModified("password")) return next();
  // Hash the password with bcrypt using 10 salt rounds
  this.password = await bcrypt.hash(this.password, 10); // Fixed: Added 'await' since bcrypt.hash is async
  next(); // Proceed to the next middleware or save operation
});

// Instance method to check if the provided password matches the stored hashed password
userSchema.methods.isPasswordCorrect = async function (password) {
  // Compare the provided password with the stored hashed password using bcrypt
  return await bcrypt.compare(password, this.password);
};

// Instance method to generate a JWT access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id, // Include user ID in the token payload
      email: this.email, // Include email in the token payload
      username: this.username, // Include username in the token payload (Fixed: Corrected 'userName' to 'username')
      fullName: this.fullName, // Include full name in the token payload
    },
    process.env.ACCESS_TOKEN_SECRET, // Secret key for signing the access token
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRY, // Token expiration time
    }
  );
};

// Instance method to generate a JWT refresh token
userSchema.methods.generateRefreshToken = function () {
  return jwt.sign(
    {
      _id: this._id, // Include user ID in the token payload
    },
    process.env.REFRESH_TOKEN_SECRET, // Secret key for signing the refresh token
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRY, // Token expiration time
    }
  );
};

// Export the User model created from the schema
export const User = mongoose.model("User", userSchema);