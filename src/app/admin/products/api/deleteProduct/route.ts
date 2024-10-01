import { connectToDatabase } from "@/app/lib/db/connect";
import { Product, ProductImage } from "@/app/lib/model/product";
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function DELETE(request: Request) {
  try {
    await connectToDatabase(); // Ensure database connection

    // Parse request body
    const { ids }: { ids: string[] } = await request.json();

    if (!Array.isArray(ids) || ids.length === 0) {
      return NextResponse.json(
        { success: false, message: "No product IDs provided" },
        { status: 400 },
      );
    }

    // Step 1: Retrieve associated image IDs and cloudPublicIDs
    const products = await Product.find({ _id: { $in: ids } }).select(
      "productData.imageId productData.cloudPublicID",
    );

    // Collect the image and Cloudinary public IDs
    const imageIds = products
      .map((product) => product.productData.imageId)
      .filter((id) => id); // Only valid image IDs
    const cloudPublicIDs = products
      .map((product) => product.productData.cloudPublicID)
      .filter((id) => id); // Only valid Cloudinary public IDs

    // Step 2: Delete associated images from your database
    if (imageIds.length > 0) {
      await ProductImage.deleteMany({ _id: { $in: imageIds } });
    }

    // Step 3: Delete images from Cloudinary
    if (cloudPublicIDs.length > 0) {
      const result = await cloudinary.api.delete_resources(cloudPublicIDs, {
        resource_type: "image",
      });
      console.log("Cloudinary deletion result:", result);
    }

    // Step 4: Delete products from your database
    const result = await Product.deleteMany({ _id: { $in: ids } });

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Error deleting products:", error);
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 },
    );
  }
}
