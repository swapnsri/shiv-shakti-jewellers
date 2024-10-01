import { connectToDatabase } from "@/app/lib/db/connect";
import { Product, ProductImage } from "@/app/lib/model/product";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function GET() {
  let data: any = [];
  try {
    console.log("connecting to database");

    await connectToDatabase();
    console.log("connected to database");
    const products = await Product.find().exec();
    const productsWithImages = await Promise.all(
      products.map(async (product) => {
        let imageUrl =
          "https://images.pexels.com/photos/744662/pexels-photo-744662.jpeg?auto=compress&cs=tinysrgb&w=800"; // Default image URL in case of no image
        if (product.productData.imageId) {
          const image = await ProductImage.findById(
            product.productData.imageId,
          ).exec();
          imageUrl = image ? image.url : imageUrl;
        }

        return {
          ...product.toObject(),
          productData: {
            ...product.productData,
            imageUrl,
          },
        };
      }),
    );

    data = { success: true, data: productsWithImages };
  } catch (error) {
    data = { success: false };
  }

  return NextResponse.json({
    result: data,
  });
}
