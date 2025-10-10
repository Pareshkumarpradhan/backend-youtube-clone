import dotenv from "dotenv";
dotenv.config();

import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) {
      console.error("No local file path provided for Cloudinary upload");
      return null;
    }

    // Verify file exists
    if (!fs.existsSync(localFilePath)) {
      console.error(`File does not exist at path: ${localFilePath}`);
      return null;
    }

    // upload the file on cloudinary
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto",
    });

    // file has been uploaded successfully
    console.log("File is uploaded on cloudinary", response.url);

    // Unlink the file after successful upload
    try {
      fs.unlinkSync(localFilePath);
    //   console.log(`Successfully deleted local file: ${localFilePath}`);
    } catch (unlinkError) {
      console.error(
        `Failed to delete local file: ${localFilePath}`,
        unlinkError.message
      );
    }
    return response;
  } catch (error) {
    // fs.unlinkSync(localFilePath); // remove the locally saved temporary file as the upload operation got failed

    console.error("Cloudinary upload failed:", error.message);

    // Unlink the file if it exists
    if (localFilePath && fs.existsSync(localFilePath)) {
      try {
        fs.unlinkSync(localFilePath);
        // console.log(
        //   `Successfully deleted local file after error: ${localFilePath}`
        // );
      } catch (unlinkError) {
        console.error(
          `Failed to delete local file after error: ${localFilePath}`,
          unlinkError.message
        );
      }
    }

    return null; // Explicitly return null on failure
  }
};

export { uploadOnCloudinary };
