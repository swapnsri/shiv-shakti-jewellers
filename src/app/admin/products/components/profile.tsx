"use client";
import { removeAllState } from "@/app/utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function Profile() {
  const [showOption, setShowOptions] = useState(false);
  const router = useRouter();
  return (
    <div className="relative">
      <div
        className="cursor-pointer"
        onClick={() => setShowOptions(!showOption)}
      >
        <i className="fas fa-user"></i>
      </div>
      {showOption ? (
        <div
          className="absolute rounded-xl w-[105px] shadow-2xl p-2 top-[160%] border bg-white flex justify-center"
          style={{ left: "calc(100% - 96px)" }}
        >
          <div
            className="cursor-pointer hover:bg-gray-200 p-2  rounded-xl  h-[40px] flex justify-center items-center gap-[10px] "
            onClick={() => {
              removeAllState();
              router.push("/");
            }}
          >
            <i className="fas fa-sign-out-alt text-xl"></i>
            <span>logout</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
