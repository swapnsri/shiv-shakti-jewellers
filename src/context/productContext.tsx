"use client";

import { ProductTypes } from "@/app/lib/db";
import { loadStateSession } from "@/app/utils";
import React, { createContext, useContext, useState, useEffect } from "react";

// Fetch products function

interface ProductContextType {
  products: ProductTypes[];
  loading: boolean;
  error: string | null;
  setRecall: any;
  recall: boolean;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

export const ProductProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [recall, setRecall] = useState(true);
  const fetchProducts = async (): Promise<ProductTypes[]> => {
    try {
      const response = await fetch("/admin/products/api/getProducts"); // Adjust the path as needed
      if (!response.ok) {
        throw new Error(`Failed to fetch products: ${response.statusText}`);
      }
      const res = await response.json();
      if (res.result.success) {
        return res.result.data; // Assuming the API returns { success: true, data: products }
      } else {
        return [];
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      return []; // Return an empty array in case of error
    }
  };

  useEffect(() => {
    if (recall) {
      const loadProducts = async () => {
        try {
          const data = await fetchProducts();
          setProducts(data);
        } catch (error) {
          setError("Failed to fetch products");
        } finally {
          setLoading(false);
        }
      };

      loadStateSession("login") && loadProducts();
      setRecall(false);
    }
  }, [recall]);

  return (
    <ProductContext.Provider
      value={{ products, loading, error, setRecall, recall }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = (): ProductContextType => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProducts must be used within a ProductProvider");
  }
  return context;
};
