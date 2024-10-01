import { connectToDatabase } from "@/app/lib/db/connect";
import { Product } from "@/app/lib/model/product";
import { NextResponse } from "next/server";

export async function DELETE(request: Request) {
  try {
    await connectToDatabase(); // Ensure database connection

    // Define the filter for documents where the `name` field does not exist
    const filter = { $or: [{ name: { $exists: false } }, { name: "" }] };

    // Delete documents matching the filter

    const result = await Product.deleteMany(filter);

    return NextResponse.json(
      { success: true, deletedCount: result.deletedCount },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error deleting documents:", error);
    return NextResponse.json(
      { success: false, message: "Error deleting documents" },
      { status: 500 },
    );
  }
}
