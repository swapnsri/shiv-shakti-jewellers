import React from "react";
import { data } from "../utils";

export default function Contact() {
  return (
    <div>
      <div className="connect text-center mt-[20px]">
        <h4 className="text-4xl text-[var(--brand-color1)] mb-[20px]">
          Contact Us
        </h4>
        <p>Our support is always here, ready to help at your convenience</p>
      </div>
      <div className="connect-mediums flex justify-center mt-10">
        <div className="social-links grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-fit gap-10">
          {data.map((item) => (
            <div
              className="border-2 border-black rounded-xl p-6 sm:p-10 w-[300px] sm:w-[370px] bg-[var(--brand-color2)]"
              key={item.channel}
            >
              <a
                className="flex items-center justify-between"
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
              >
                <div>
                  <div>{item.text}</div>
                  <div className="text-4xl">{item.channel}</div>
                  <button className="bg-[var(--brand-color1)] p-2 rounded mt-5 text-red-50">
                    Connect
                    <i className={`fas fa-arrow-right ml-2 `}></i>
                  </button>
                </div>
                <i className={`text-5xl sm:text-7xl ${item.iconClass}`}></i>
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
