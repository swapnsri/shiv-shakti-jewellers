import type { Metadata } from "next";
import Logo from "../../../public/SSJ1.png";
import Image from "next/image";
import Search from "../components/search";
import Connect from "../components/connect";
import Link from "next/link";
import React from "react";
import Options from "./components/options";

export const metadata: Metadata = {
  title: "Shik Shakti Jeweller",
  description:
    "Discover Shik Shakti Jeweller, your premier destination for luxurious and unique jewelry pieces. From timeless gold and diamond creations to custom-made designs, we offer a wide range of high-quality jewelry that caters to every occasion and style. Our commitment to superior craftsmanship, attention to detail, and exceptional customer service ensures that each piece reflects elegance and sophistication. Explore our diverse collection and experience the perfect blend of tradition and modernity. Visit us today to find the perfect piece that resonates with your personal style",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
      <body
        className={`overflow-hidden bg-gradient-to-br from-[#fffdf7] to-[#fffef9]`}
      >
        <header className="p-[15px] flex flex-col items-center justify-center bg-[var(--brand-color2-400)]">
          {/* grid sm:grid-cols-[100px_300px_1fr] md:grid-cols-[100px_600px_1fr] */}
          <div className="gap-2 flex justify-between w-full">
            <div>
              <Link href={"/"}>
                <Image src={Logo} alt="" width={50} />
              </Link>
            </div>
            {/* <div className="flex items-center">
              <Search />
            </div> */}
            <div className="flex items-center ml-[25px]">
              <Options />
            </div>
          </div>
          <div className="flex items-center w-full mt-[10px]">
            <Search />
          </div>
          <div className="">
            <Connect />
          </div>
        </header>
        <div
          className="overflow-auto"
          style={{ height: "calc(100vh - 127px)" }}
        >
          {children}
          <footer className=" my-[20px] text-center flex justify-center w-full">
            © 2024 SSJ. All Rights Reserved
          </footer>
        </div>
      </body>
    </html>
  );
}
