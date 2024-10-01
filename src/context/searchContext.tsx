"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

interface SearchContextType {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  dropdownValue: string;
  setDropdownValue: (value: string) => void;
}

const SearchContext = createContext<SearchContextType | undefined>(undefined);

export const SearchProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [dropdownValue, setDropdownValue] = useState<string>("All");

  return (
    <SearchContext.Provider
      value={{ searchQuery, setSearchQuery, dropdownValue, setDropdownValue }}
    >
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearch must be used within a SearchProvider");
  }
  return context;
};
