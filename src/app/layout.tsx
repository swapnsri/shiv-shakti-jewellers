// app/login/layout.tsx
import React from "react";
import "./globals.css";
import { SearchProvider } from "@/context/searchContext";
import { ProductProvider } from "@/context/productContext";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
          referrerPolicy="no-referrer"
        />
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/regular.min.css"
          referrerPolicy="no-referrer"
        />
      </head>
      <body>
        <ProductProvider>
          <SearchProvider>
            <main>{children}</main>
          </SearchProvider>
        </ProductProvider>
      </body>
    </html>
  );
}
