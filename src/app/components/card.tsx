"use client";
import Image, { StaticImageData } from "next/image";
import React, { useEffect, useState } from "react";
type Props = {
  url: StaticImageData | string;
  productType: string;
};
export const Card = ({ url, productType }: Props) => {
  return (
    <>
      <div className="flex flex-col rounded-xl cursor-pointer card w-[135px] sm:w-[176px] shadow-md hover:shadow-2xl transition-shadow duration-300">
        <Image
          src={url}
          alt=""
          width={176}
          height={176}
          className={`rounded-xl rounded-b-none l h-[176px] border-b ${
            productType === "Mangalsutras" ? "" : "object-cover"
          }`}
        />
        <div className="p-4 flex-1 rounded-t-none bg-[var(--brand-color2-100)] rounded-xl">
          <p className="text-[var(--brand-color1)] mt-2 text-lg">
            {productType}
          </p>
          <button className="text-xs">
            Explore
            <i className="fas fa-angle-right ml-[5px]"></i>
          </button>
        </div>
      </div>
    </>
  );
};
