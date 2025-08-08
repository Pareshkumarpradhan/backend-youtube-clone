// require('dotenv').config({path: './env'})
import dotenv from "dotenv";
import connectDB from "./db/index.js";

dotenv.config({
  path: "./.env",
});

connectDB();

/*
import express from "express";
const app = express;

;(async () => {
  try {
   const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);

   console.log(`MongoDB connected successfully: ${connectionInstance.connection.host}`);

    // Express app error event listener
    app.on("error", (error) => {
      console.log("Express App Error: ", error);
      throw error;
    });

    // Start Express server
    app.listen(process.env.PORT, () => {
      console.log(`App is listen on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.error("Initial Database Connection Error:", error);
    throw error;
  }
})();
*/
