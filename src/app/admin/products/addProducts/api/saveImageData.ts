import { ProductImage } from "@/app/lib/model/product";

export async function saveImageMetadata(imageUrl: string): Promise<any> {
  const newImage = new ProductImage({ url: imageUrl });
  await newImage.save();
  return newImage._id; // Return the image ID
}
