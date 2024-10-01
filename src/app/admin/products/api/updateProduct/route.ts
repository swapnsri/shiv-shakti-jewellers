import { NextResponse } from "next/server";
import { Product, ProductImage } from "@/app/lib/model/product"; // Adjust the import path as needed
import { connectToDatabase } from "@/app/lib/db/connect";
import { ProductTypes } from "@/app/lib/db";

type ProductUpdate = ProductTypes;

export async function PUT(request: Request) {
  const { _id, productData }: ProductUpdate = await request.json();

  if (!_id) {
    return NextResponse.json(
      { success: false, message: "Product ID is required" },
      { status: 400 },
    );
  }

  try {
    await connectToDatabase();

    // Find the product by ID
    const foundProduct = await Product.findById(_id);
    if (!foundProduct) {
      console.log(`Product with ID ${_id} not found.`);
      return NextResponse.json(
        { success: false, message: "Product not found" },
        { status: 404 },
      );
    }
    await ProductImage.findByIdAndUpdate(foundProduct.productData.imageId, {
      url: productData.imageUrl,
    });
    delete productData.imageUrl;
    // Merge the existing product data with the incoming productData deeply
    foundProduct.productData = {
      ...foundProduct.productData,
      ...productData, // Overwrite top-level productData properties
      weightDetails: {
        ...foundProduct.productData.weightDetails,
        ...productData.weightDetails, // Merge weightDetails properties
      },
      rateDetails: {
        ...foundProduct.productData.rateDetails,
        ...productData.rateDetails, // Merge rateDetails properties
      },
    };

    // Save the updated product
    const updatedProduct = await foundProduct.save();

    return NextResponse.json({ success: true, data: [updatedProduct] });
  } catch (error) {
    console.error("Error updating product:", error);
    return NextResponse.json(
      { success: false, message: "Error updating product" },
      { status: 500 },
    );
  }
}
