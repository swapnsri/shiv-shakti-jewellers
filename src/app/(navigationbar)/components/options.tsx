"use client";
import HamburgerIcon from "@/app/components/hamburgerIcon";
import useScreenSize from "@/app/hooks/useScreenSize";
import { data } from "@/app/utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Options() {
  const pathname = usePathname();
  const router = useRouter();
  const screenSize = useScreenSize();
  const [hamIconClicked, setHamIconClicked] = useState(false);
  const handleClick = (data: boolean) => {
    setHamIconClicked(data);
  };
  return (
    <div className="options relative">
      {screenSize < 500 ? (
        <>
          <HamburgerIcon
            onHamburgerClick={handleClick}
            hamIconClicked={hamIconClicked}
          />
          {hamIconClicked ? (
            <div className="absolute top-[98px] z-30 right-[-15px] bg-white w-[100vw] ">
              <div
                onClick={() => setHamIconClicked(false)}
                className="options-container flex flex-col items-center gap-8 p-6 h-[100vh] w-[100vw] bg-white text-center text-[20px]"
              >
                <div
                  onClick={() => router.push("/home")}
                  className={`cursor-pointer ${
                    pathname.includes("home")
                      ? "text-[var(--brand-color1-900)]"
                      : ""
                  }`}
                >
                  Home
                </div>
                <div
                  onClick={() => router.push("/about-us")}
                  className={`cursor-pointer ${
                    pathname.includes("about")
                      ? "text-[var(--brand-color1-900)]"
                      : ""
                  }`}
                >
                  About Us
                </div>
                <div
                  onClick={() => router.push("/faqs")}
                  className={`cursor-pointer ${
                    pathname.includes("faqs")
                      ? "text-[var(--brand-color1-900)]"
                      : ""
                  }`}
                >
                  FAQs
                </div>
                <div
                  className="cursor-pointer"
                  onClick={() => {
                    window.open(data[0].url, "_blank", "noopener,noreferrer");
                  }}
                >
                  9839204135
                </div>
              </div>
            </div>
          ) : null}
        </>
      ) : (
        <div className="flex items-center gap-8">
          <div
            onClick={() => router.push("/home")}
            className={`cursor-pointer ${
              pathname.includes("home") ? "text-[var(--brand-color1-50)]" : ""
            }`}
          >
            Home
          </div>
          <div
            onClick={() => router.push("/about-us")}
            className={`cursor-pointer ${
              pathname.includes("about") ? "text-[var(--brand-color1-50)]" : ""
            }`}
          >
            About Us
          </div>
          <div
            onClick={() => router.push("/faqs")}
            className={`cursor-pointer ${
              pathname.includes("faqs") ? "text-[var(--brand-color1-50)]" : ""
            }`}
          >
            FAQs
          </div>
          <div
            className="cursor-pointer"
            onClick={() => {
              window.open(data[0].url, "_blank", "noopener,noreferrer");
            }}
          >
            9839204135
          </div>
        </div>
      )}
    </div>
  );
}
