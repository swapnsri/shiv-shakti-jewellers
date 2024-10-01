"use client";

import { ProductTypes } from "@/app/lib/db";
import { Spinner } from "@/app/utils";
import { useProducts } from "@/context/productContext";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { saveImageMetadata } from "./api/uploadImage/route";

// type FormData = Omit<ProductTypes, "_id">;
const ProductForm: React.FC = () => {
  const { setRecall } = useProducts();
  const router = useRouter();
  const [addProductLoader, setAddProductLoader] = useState(false);
  const [formData, setFormData] = useState<any>({
    productType: "",
    name: "",
    imageUrl: "",
    imageFile: null,
    description: "",
    gwt: "",
    less: "",
    nwt: "",
    Purity: "",
    wstg: "",
    pcs: "",
    rate: "",
    labour: "",
    silver: "",
    amount: "",
    imageOption: "url",
    cloudPublicID: "",
  });
  // useEffect(() => {
  //   fetch("api/deleteWithoutName", {
  //     method: "DELETE",
  //   })
  //     .then((response) => response.json())
  //     .then((data) => console.log("fknjn", data))
  //     .catch((error) => console.error("Error:", error));
  // }, []);
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value, type, files } = e.target as HTMLInputElement &
      HTMLTextAreaElement;

    if (type === "file" && files) {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: files ? files[0] : null,
        imageUrl: "",
      }));
    } else if (name === "imageOption") {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        imageOption: value as "url" | "upload",
      }));
    } else {
      setFormData((prevFormData: any) => ({
        ...prevFormData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setAddProductLoader(true);

    const payload = {
      productData: {
        imageUrl: formData.imageUrl,
        productType: formData.productType,
        name: formData.name,
        description: formData.description,
        weightDetails: {
          gwt: formData.gwt,
          less: formData.less,
          nwt: formData.nwt,
          Purity: formData.Purity,
          silver: formData.silver,
        },
        rateDetails: {
          rate: formData.rate,
          labour: formData.labour,
          amount: formData.amount,
        },
        cloudPublicID: formData.cloudPublicID,
      },
    };
    try {
      const response = await fetch("api/addProduct", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        setTimeout(() => {
          setRecall(true);
        }, 300);
        router.push("/");
      } else {
        console.error("Error inserting product:", result.error);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    } finally {
      setAddProductLoader(false);
    }
  };
  useEffect(() => {
    if (formData.imageOption === "upload" && formData.imageUrl === "") {
      const uploadImage = async () => {
        const formDataToSend = new FormData();
        formDataToSend.append("file", formData.imageFile as Blob);
        try {
          const response = await fetch("addProducts/api/uploadImage", {
            method: "POST",
            body: formDataToSend,
          });

          if (!response.ok) {
            throw new Error("Network response was not ok");
          }

          const result = await response.json();
          setFormData((prevFormData: any) => ({
            ...prevFormData,
            imageUrl: result.data.imageUrl,
            cloudPublicID: result.data.publicId,
          }));
          // Handle success (e.g., show a message or update UI)
        } catch (error) {
          console.error("Error:", error);
          // Handle error (e.g., show an error message)
        }
      };
      formData.imageUrl.length === 0 && uploadImage();
    }
  }, [formData]);
  return (
    <div className="max-w-4xl my-8 mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
      <Link
        className="py-4"
        href={"/"}
        onClick={() =>
          setTimeout(() => {
            setRecall(true);
          }, 300)
        }
      >
        <button className="bg-[var(--brand-color1)]  hover:bg-[var(--brand-color2)] text-white font-bold py-2 px-4 rounded transition duration-300">
          Back
        </button>
      </Link>
      <h2 className="text-2xl font-bold mb-6 text-center text-[var(--brand-color1)]">
        Add Product Details
      </h2>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3"
      >
        {/* Product Type */}
        <div className="flex flex-col">
          <label htmlFor="productType" className="mb-1 text-gray-700">
            Product Type
          </label>
          <input
            type="text"
            id="productType"
            name="productType"
            value={formData.productType}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Product Type"
          />
        </div>

        {/* Name */}
        <div className="flex flex-col">
          <label htmlFor="name" className="mb-1 text-gray-700 col-span-full">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Name"
          />
        </div>

        {/* Image URL / Upload */}
        <div className="flex flex-col col-span-full">
          <span className="mb-1 text-gray-700">Image</span>
          <div className="flex flex-wrap space-x-4 mb-2">
            <label>
              <input
                type="radio"
                name="imageOption"
                value="url"
                checked={formData.imageOption === "url"}
                onChange={handleChange}
                className="mr-2"
              />
              Image URL
            </label>
            <label>
              <input
                type="radio"
                name="imageOption"
                value="upload"
                checked={formData.imageOption === "upload"}
                onChange={handleChange}
                className="mr-2"
              />
              Upload Image
            </label>
          </div>

          {formData.imageOption === "url" && (
            <input
              type="text"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
              placeholder="Enter Image URL"
            />
          )}

          {formData.imageOption === "upload" && (
            <input
              type="file"
              name="imageFile"
              onChange={handleChange}
              className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            />
          )}
        </div>

        {/* Description */}
        <div className="flex flex-col col-span-full">
          <label htmlFor="description" className="mb-1 text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Description - 7x0.130=0.910,6x0.160=0.960"
            rows={2}
          />
        </div>

        {/* Gross Weight */}
        <div className="flex flex-col">
          <label htmlFor="gwt" className="mb-1 text-gray-700">
            Gross Weight
          </label>
          <input
            type="text"
            id="gwt"
            name="gwt"
            value={formData.gwt}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Gross Weight"
          />
        </div>

        {/* Less */}
        <div className="flex flex-col">
          <label htmlFor="less" className="mb-1 text-gray-700">
            Less
          </label>
          <input
            type="text"
            id="less"
            name="less"
            value={formData.less}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Less"
          />
        </div>

        {/* Net Weight */}
        <div className="flex flex-col">
          <label htmlFor="nwt" className="mb-1 text-gray-700">
            Net Weight
          </label>
          <input
            type="text"
            id="nwt"
            name="nwt"
            value={formData.nwt}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Net Weight"
          />
        </div>

        {/* Purity */}
        <div className="flex flex-col">
          <label htmlFor="Purity" className="mb-1 text-gray-700">
            Purity
          </label>
          <input
            type="text"
            id="Purity"
            name="Purity"
            value={formData.Purity}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Purity"
          />
        </div>

        {/* Wastage */}
        <div className="flex flex-col">
          <label htmlFor="wstg" className="mb-1 text-gray-700">
            Wastage
          </label>
          <input
            type="text"
            id="wstg"
            name="wstg"
            value={formData.wstg}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Wastage"
          />
        </div>

        {/* Pieces */}
        <div className="flex flex-col">
          <label htmlFor="pcs" className="mb-1 text-gray-700">
            Pieces
          </label>
          <input
            type="text"
            id="pcs"
            name="pcs"
            value={formData.pcs}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Pieces"
          />
        </div>

        {/* Rate */}
        <div className="flex flex-col">
          <label htmlFor="rate" className="mb-1 text-gray-700">
            Rate
          </label>
          <input
            type="text"
            id="rate"
            name="rate"
            value={formData.rate}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Rate"
          />
        </div>

        {/* Labour */}
        <div className="flex flex-col">
          <label htmlFor="labour" className="mb-1 text-gray-700">
            Labour
          </label>
          <input
            type="text"
            id="labour"
            name="labour"
            value={formData.labour}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Labour"
          />
        </div>

        {/* Silver */}
        <div className="flex flex-col">
          <label htmlFor="silver" className="mb-1 text-gray-700">
            Silver
          </label>
          <input
            type="text"
            id="silver"
            name="silver"
            value={formData.silver}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Silver"
          />
        </div>

        {/* Amount */}
        <div className="flex flex-col">
          <label htmlFor="amount" className="mb-1 text-gray-700">
            Amount
          </label>
          <input
            type="text"
            id="amount"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="p-2 border rounded-md border-gray-300 focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
            placeholder="Amount"
          />
        </div>

        {/* Submit Button */}
        <div className="col-span-full">
          <button
            type="submit"
            className="flex justify-center w-full py-2 px-4 bg-[var(--brand-color1-500)] text-white rounded-md hover:bg-[var(--brand-color1-700)] focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
          >
            {addProductLoader ? <Spinner /> : "Submit"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
