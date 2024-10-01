"use client";
import { useSearch } from "@/context/searchContext";
import React, { ChangeEvent } from "react";

type FilterOption = "All" | "Gold" | "Silver" | "1 Gram";

const FilterDropdown = () => {
  const { dropdownValue, setDropdownValue } = useSearch();

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setDropdownValue(e.target.value as FilterOption);
    // Here you can add logic to filter items based on the selected value
  };

  return (
    <div className="relative max-w-[125px]">
      <select
        id="filter"
        value={dropdownValue}
        onChange={handleChange}
        className="block w-full px-3 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm appearance-none"
      >
        <option value="All">All</option>
        <option value="Gold">Gold</option>
        <option value="Silver">Silver</option>
        <option value="Silver-925">Silver-925</option>
        <option value="1 Gram">1 Gram</option>
      </select>
      <i
        className="fa fa-chevron-down absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500"
        aria-hidden="true"
      ></i>
    </div>
  );
};

export default FilterDropdown;
