"use client";
import { useSearch } from "@/context/searchContext";
import useScreenSize from "../hooks/useScreenSize";

export default function Search() {
  const { searchQuery, setSearchQuery } = useSearch();
  const screenSize = useScreenSize();

  return (
    <div className="relative w-full">
      <input
        className="p-[5px] border-2 rounded w-full"
        value={searchQuery}
        placeholder={
          screenSize < 490
            ? "Explore Gold, Diamond, and More..."
            : "Search for Gold Jewellery, Diamond Jewellery and more..."
        }
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <i className="fas fa-search absolute top-2.5 right-3 text-gray-500"></i>
    </div>
  );
}
