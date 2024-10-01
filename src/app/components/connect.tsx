"use client";

import { data } from "../utils";
import { useState } from "react";

export default function Connect() {
  const [openDialogue, setOpenDialogue] = useState(false);

  return (
    <div className="bot-icon relative ">
      {/* Main Icon */}
      <div
        onClick={() => setOpenDialogue(!openDialogue)}
        className={`dialog cursor-pointer flex fixed bottom-[40px] right-[28px] w-[50px] h-[50px] p-[10px] bg-white shadow-lg rounded-full justify-center items-center`}
      >
        <i
          className={`text-[24px] text-[var(--brand-color2-700)] fas icon  ${
            openDialogue ? "cross fa-times" : "fa-ellipsis-h"
          }`}
        ></i>
      </div>

      {/* Dialog One */}
      <div
        className={`${
          openDialogue ? "flex" : "hidden"
        } dialog fixed bottom-[100px] right-[28px] w-[50px] h-[50px] p-[10px] bg-white shadow-lg rounded-full justify-center items-center`}
      >
        <a href={`${data[4].url}`} target="_blank" rel="noopener noreferrer">
          <i className="text-[24px] fa fa-phone text-[var(--brand-color2-700)]"></i>
        </a>
      </div>

      {/* Dialog Two */}
      <div
        className={`${
          openDialogue ? "flex" : "hidden"
        } dialog fixed bottom-[160px] right-[28px] w-[50px] h-[50px] p-[10px] bg-white shadow-lg rounded-full justify-center items-center`}
      >
        <a href={data[0].url} target="_blank" rel="noopener noreferrer">
          <i className="text-[24px] fab fa-whatsapp whatsapp-icon text-[var(--brand-color2-700)]"></i>
        </a>
      </div>

      {/* Dialog Three */}
      <div
        className={`${
          openDialogue ? "flex" : "hidden"
        } dialog fixed bottom-[220px] right-[28px] w-[50px] h-[50px] p-[10px] bg-white shadow-lg rounded-full justify-center items-center`}
      >
        <a href={data[3].url} target="_blank" rel="noopener noreferrer">
          <i className="text-[24px] fab fa-instagram instagram-icon text-[var(--brand-color2-700)]"></i>
        </a>
      </div>

      {/* Dialog Four */}
      <div
        className={`${
          openDialogue ? "flex" : "hidden"
        } dialog fixed bottom-[280px] right-[28px] w-[50px] h-[50px] p-[10px] bg-white shadow-lg rounded-full justify-center items-center`}
      >
        <a href={data[5].url} target="_blank" rel="noopener noreferrer">
          <i className="text-[24px] fas fa-map-marker-alt text-[var(--brand-color2-700)]"></i>
        </a>
      </div>

      {/* Dialog Five */}
      <div
        className={`${
          openDialogue ? "flex" : "hidden"
        } dialog fixed bottom-[340px] right-[28px] w-[50px] h-[50px] p-[10px] bg-white shadow-lg rounded-full justify-center items-center`}
      >
        <a href={data[1].url} target="_blank" rel="noopener noreferrer">
          <i className="text-[24px] fab fa-facebook facebook-icon text-[var(--brand-color2-700)]"></i>
        </a>
      </div>
    </div>
  );
}
