import { Model } from "mongoose";
import { connectToDatabase } from "./connect";
export async function deleteMultipleProducts(
  Product: Model<any, {}, {}, {}, any, any>,
) {
  try {
    await connectToDatabase();

    // Define the filter for documents you want to delete

    // Use deleteMany to delete all matching documents
    const filter = { name: { $exists: false } };
    const testQuery = await Product.find(filter); // Use find instead of deleteMany to test
    console.log("Matching documents for filter:", testQuery);
    // const result = await Product.deleteMany(filter);
    // console.log(`${result.deletedCount} documents were deleted.`);

    // mongoose.connection.close();
  } catch (error) {
    console.error("Error deleting documents:", error);
  }
}
