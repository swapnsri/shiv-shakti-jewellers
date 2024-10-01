import mongoose, { Schema } from "mongoose";

const productModel = new mongoose.Schema(
  {
    productData: {
      productType: String,
      name: String,
      description: String,
      weightDetails: {
        gwt: String,
        less: String,
        nwt: String,
        Purity: String,
        silver: String,
      },
      rateDetails: {
        rate: String,
        labour: String,
        amount: String,
      },
      imageId: { type: mongoose.Schema.Types.ObjectId, ref: "Image" },
      cloudPublicID: String,
    },
  },
  { collection: "shivshakti" },
);
export const Product =
  mongoose.models.Product || mongoose.model("Product", productModel);

const userModel = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed password here
  },
  { collection: "cred", timestamps: true }, // Enable timestamps
);

export const UserDetails =
  mongoose.models.UserDetails || mongoose.model("UserDetails", userModel);

const imageSchema = new mongoose.Schema(
  {
    url: { type: String, required: true },
  },
  { timestamps: true },
);

export const ProductImage =
  mongoose.models.Image || mongoose.model("Image", imageSchema);
