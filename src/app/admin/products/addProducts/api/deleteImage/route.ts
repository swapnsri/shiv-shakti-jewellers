// app/api/delete-image/route.js

import { NextResponse } from "next/server";
import cloudinary from "cloudinary";

// Configure Cloudinary with environment variables
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Handle the DELETE request
export async function DELETE(req: Request) {
  try {
    const { publicId } = await req.json(); // Get the publicId from the request body

    if (!publicId) {
      return NextResponse.json(
        { message: "Public ID is required" },
        { status: 400 },
      );
    }

    // Delete the image from Cloudinary using the publicId
    const result = await cloudinary.v2.uploader.destroy(publicId);

    if (result.result !== "ok") {
      return NextResponse.json(
        { message: "Failed to delete image" },
        { status: 500 },
      );
    }

    // Return success response
    return NextResponse.json(
      { message: "Image deleted successfully", result },
      { status: 200 },
    );
  } catch (err: any) {
    console.error("Error deleting image:", err);
    return NextResponse.json(
      { message: "Error deleting image", error: err.message },
      { status: 500 },
    );
  }
}
