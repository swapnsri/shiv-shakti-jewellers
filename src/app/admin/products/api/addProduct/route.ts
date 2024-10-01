import { connectToDatabase } from "@/app/lib/db/connect";
import { Product } from "@/app/lib/model/product";
import { NextRequest, NextResponse } from "next/server";
import { saveImageMetadata } from "../../addProducts/api/uploadImage/route";

export async function POST(req: NextRequest) {
  await connectToDatabase();

  try {
    // Extract JSON data from request
    const data = await req.json();
    const imageId = await saveImageMetadata(data.productData.imageUrl);
    delete data.productData.imageUrl;
    const productInfo = {
      productData: { ...data.productData, imageId },
    };
    const newProduct = new Product(productInfo);
    await newProduct.save();

    return NextResponse.json(
      { success: true, data: newProduct },
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
