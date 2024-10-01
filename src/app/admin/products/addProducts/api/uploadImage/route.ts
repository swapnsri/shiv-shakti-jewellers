import { v2 as cloudinary } from "cloudinary";
import { connectToDatabase } from "@/app/lib/db/connect"; // Your database connection file
import { NextRequest, NextResponse } from "next/server";
import { Readable } from "stream";
import sharp from "sharp";
import { ProductImage } from "@/app/lib/model/product";

async function resizeImage(fileBuffer: Buffer): Promise<Buffer> {
  return sharp(fileBuffer).resize({ width: 1024 }).toBuffer(); // Resize the image to width of 1024px
}

// Then, resize before uploading

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Helper function to convert a file to a buffer
async function fileToBuffer(file: File): Promise<Buffer> {
  return Buffer.from(await file.arrayBuffer());
}

async function uploadToCloudinary(
  fileBuffer: Buffer,
): Promise<{ secure_url: string; public_id: string }> {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { resource_type: "image", folder: "uploads", timeout: 60000 },
      (error: any, result: any) => {
        if (error) {
          return reject(error);
        }
        if (result) {
          resolve({
            secure_url: result.secure_url,
            public_id: result.public_id,
          });
        }
      },
    );

    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);
    stream.pipe(uploadStream);
  });
}

export async function POST(req: NextRequest): Promise<NextResponse> {
  await connectToDatabase(); // Ensure database connection

  try {
    const formData = await req.formData(); // Use FormData to get files from request
    const imageFile = formData.get("file") as File | null; // Get the image file from the form data

    if (!imageFile) {
      return NextResponse.json(
        { success: false, error: "No file provided" },
        { status: 400 },
      );
    }

    // Convert image file to a buffer
    const imageBuffer = await fileToBuffer(imageFile);
    const resizedBuffer = await resizeImage(imageBuffer);

    // Upload image to Cloudinary and get both URL and public_id
    const { secure_url, public_id } = await uploadToCloudinary(resizedBuffer);

    // Convert form data to an object and include the image URL and public_id
    const productData = {
      imageUrl: secure_url,
      publicId: public_id, // Store the public_id in the product data
    };

    return NextResponse.json(
      { success: true, data: productData },
      { status: 201 },
    );
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { success: false, error: "Error inserting data" },
      { status: 500 },
    );
  }
}

export async function saveImageMetadata(imageUrl: string): Promise<any> {
  const newImage = new ProductImage({ url: imageUrl });
  await newImage.save();
  return newImage._id; // Return the image ID
}
