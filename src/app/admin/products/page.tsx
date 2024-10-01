"use client";

import React, { useEffect, useState } from "react";
import { ProductTypes } from "../../lib/db"; // Ensure this path is correct for your Product type
import ProductCard from "./card";
import Link from "next/link";
import { useSearch } from "@/context/searchContext";
import { useProducts } from "@/context/productContext";
import { Spinner } from "@/app/utils";

export default function Products() {
  const { searchQuery, dropdownValue } = useSearch();
  const { products, loading, error, setRecall } = useProducts(); // Fetch products from context
  const [filteredDProducts, setFilteredDProducts] =
    useState<ProductTypes[]>(products);
  const [filteredProducts, setFilteredProducts] =
    useState<ProductTypes[]>(products);

  useEffect(() => {
    // Filter products based on dropdown value
    const filterOnDropDown =
      dropdownValue !== "All"
        ? products.filter(
            (product) =>
              product.productData.productType.toLowerCase() ===
              dropdownValue.toLowerCase(),
          )
        : products;
    setFilteredDProducts(filterOnDropDown);
  }, [dropdownValue, products]); // Make sure to include products in dependencies to update filteredProducts when products change
  useEffect(() => {
    setRecall(true);
  }, []);
  useEffect(() => {
    // Handle search query with debounce
    const handleSearch = () => {
      const filterOnSearch = searchQuery
        ? filteredDProducts.filter((product) =>
            product.productData.name
              .toLowerCase()
              .includes(searchQuery.toLowerCase()),
          )
        : filteredDProducts;

      setFilteredProducts(filterOnSearch);
    };

    const debounceTimer = setTimeout(handleSearch, 300);

    return () => clearTimeout(debounceTimer);
  }, [searchQuery, filteredDProducts, dropdownValue, products]); // Include relevant dependencies

  if (loading) {
    return (
      <div
        style={{ height: "calc(100vh - 160px)" }}
        className="text-xl text-[var(--brand-color2-700)] flex flex-col justify-center items-center"
      >
        <div className="text-xl text-[var(--brand-color2-700)] mb-1">
          <Spinner />
        </div>
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center">
      <Link className="py-4" href={"products/addProducts"}>
        <button className="bg-[var(--brand-color1)]  hover:bg-[var(--brand-color2)] text-white font-bold py-2 px-4 rounded transition duration-300">
          Add Product
        </button>
      </Link>
      <div
        className={`pt-0 products-container grid ${
          filteredProducts.length === 0
            ? ""
            : "xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 "
        } gap-4 p-[24px]`}
      >
        {filteredProducts.length === 0 ? (
          <div
            style={{ height: "calc(100vh - 224px)" }}
            className="flex justify-center items-center"
          >
            {" "}
            <p>No products available.</p>
          </div>
        ) : (
          filteredProducts.map((product) => (
            <Link key={product._id} href={`/admin/products/${product._id}`}>
              <ProductCard
                key={product._id} // Use `_id` as key
                imageURL={
                  product.productData.imageUrl ||
                  "https://res.cloudinary.com/dowztlao4/image/upload/v1725116539/DALL_E_2024-08-21_22.59.10_-_A_delicate_gold_nose_pin_designed_specifically_for_nose_wear._The_nose_pin_is_small_with_a_traditional_Indian_style_featuring_a_smooth_circular_gol_jwjteh.webp"
                }
                name={product.productData.name}
                description={
                  product.productData.description || "No description available"
                } // Handle optional values
                labour={product.productData.rateDetails.labour}
                Purity={product.productData.weightDetails.Purity}
                silver={product.productData.weightDetails.silver}
                amount={product.productData.rateDetails.amount}
                nwt={product.productData.weightDetails.nwt}
                gwt={product.productData.weightDetails.gwt}
                less={product.productData.weightDetails.less}
              />
            </Link>
          ))
        )}
      </div>
    </div>
  );
}
