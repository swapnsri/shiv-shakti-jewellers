"use client";

import { Spinner } from "@/app/utils";
import { useProducts } from "@/context/productContext";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import React, { useState, ChangeEvent, FormEvent, useEffect } from "react";

const ProductForm = () => {
  const { products, setRecall } = useProducts();
  const { id } = useParams();
  const router = useRouter();
  const product = products.find((p) => p._id === id)!;
  const [updateProductLoader, setUpdateProductLoader] = useState(false);
  const [deleteProductLoader, setDeleteProductLoader] = useState(false);

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
  });

  useEffect(() => {
    if (product) {
      const { productType, name, description, imageUrl } = product.productData;
      const { gwt, nwt, less, Purity, silver } =
        product.productData.weightDetails;
      const { rate, labour, amount } = product.productData.rateDetails;

      let formData = {
        productType,
        name,
        description,
        imageUrl,
        gwt,
        nwt,
        less,
        Purity,
        silver,
        rate,
        labour,
        amount,
        imageOption: "url",
      };
      setFormData(formData);
    }
  }, [products]);

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
  const deleteProduct = async () => {
    setDeleteProductLoader(true);
    try {
      const response = await fetch("api/deleteProduct", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ids: [id] }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Product deleted successfully:", result.data);
        setTimeout(() => {
          setRecall(true);
        }, 300);
      } else {
        console.error("Error deleting product:", result.error);
      }
    } catch (error) {
      console.error("Error deleting form:", error);
    } finally {
      setDeleteProductLoader(false);
    }
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setUpdateProductLoader(true);
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
      _id: product._id,
    };
    try {
      const response = await fetch("api/updateProduct", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Product updated successfully:", result.data);

        setTimeout(() => {
          setRecall(true);
        }, 300);
        router.push("/");
      } else {
        console.error("Error updating product:", result.error);
      }
    } catch (error) {
      console.error("Error updating form:", error);
    } finally {
      setUpdateProductLoader(false);
    }
  };

  return (
    <div className="flex justify-center">
      <div className="grid p-8 md:grid-cols-2 sm:grid-cols-1 gap-2">
        <div className="w-[100%] max-w-4xl my-8 mx-auto p-6 bg-white rounded-lg shadow-md border border-gray-200">
          <div className="flex justify-between">
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
            <Link
              className="py-4"
              href={"/"}
              onClick={() => {
                deleteProduct();
              }}
            >
              <button className="flex justify-center bg-[var(--brand-color1)]  hover:bg-[var(--brand-color2)] text-white font-bold py-2 px-4 rounded transition duration-300">
                {deleteProductLoader ? <Spinner /> : "Delete this product?"}
              </button>
            </Link>
          </div>
          <h2 className="text-2xl mt-4 font-bold mb-6 text-center text-[var(--brand-color1)]">
            Update Product Details
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
              <label
                htmlFor="name"
                className="mb-1 text-gray-700 col-span-full"
              >
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
                {updateProductLoader ? <Spinner /> : "Update Product"}
              </button>
            </div>
          </form>
        </div>
        <div className="container my-8 rounded-xl">
          <div>
            <div>
              <h1 className="bg-[white] text-center text-xl font-bold rounded-xl rounded-b-none text-[var(--brand-color1-900)]">
                {formData.name}
              </h1>
            </div>
            <div className="details-image px-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-4 rounded-t-xl text-center bg-[var(--brand-color2-200)] py-4 flex flex-col gap-10 justify-center">
                {formData.gwt && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Gross Weight</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.gwt}
                    </p>
                  </h3>
                )}
                {formData.nwt && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Net Weight</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.nwt}
                    </p>
                  </h3>
                )}
                {formData.less && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Less:</strong>{" "}
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.less}
                    </p>
                  </h3>
                )}
                {formData.silver && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Silver </strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.silver}
                    </p>
                  </h3>
                )}
                {formData.Purity && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Purity</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.Purity}
                    </p>
                  </h3>
                )}
                {formData.wstg && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Wastage</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.wstg}
                    </p>
                  </h3>
                )}
                {formData.pcs && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Pieces</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.pcs}
                    </p>
                  </h3>
                )}
                {formData.rate && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Rate</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.rate}
                    </p>
                  </h3>
                )}
                {formData.labour && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Labour</strong>
                    <p className="bg-[white] rounded-xl px-2 break-all">
                      {formData.labour}
                    </p>
                  </h3>
                )}
                {formData.description && (
                  <h3 className="rounded-xl border border-black flex flex-col justify-between">
                    <strong className="px-2">Description:</strong>{" "}
                    <div className="bg-[white] rounded-xl px-2 break-all">
                      {formData.description
                        .split(",")
                        .map((desc: any, index: number) => (
                          <p key={desc + index}>{desc}</p>
                        ))}
                    </div>
                  </h3>
                )}
                <h3 className="rounded-xl border border-black flex flex-col justify-between">
                  <strong className="px-2">Amount:</strong>{" "}
                  <p className="bg-[white] rounded-xl px-2 break-all">
                    {formData.amount}
                  </p>
                </h3>
              </div>
              <div className="relative ">
                <Image
                  alt={formData.name}
                  src={formData.imageUrl}
                  className="rounded-b-xl object-contain rounded !rounded-t-none  w-[100%]"
                  width={300}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductForm;
