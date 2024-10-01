"use client";
import React from "react";

export default function CallAPIButton() {
  const callAPIGET = async () => {
    const response = await fetch("/api/jewelleryOrder");
    const result = await response.json();
    console.log("result", result);
  };
  const callAPIPOST = async () => {
    let payload = {
      name: "Swapnil",
      no: 9312,
      id: "aadhar",
    };
    const response = await fetch("/api/jewelleryOrder", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload), // Adjust this payload as needed
    });
    const result = await response.json();
    console.log("result", result);
  };
  return (
    <div>
      {" "}
      <button onClick={callAPIGET}>Call API</button>
      <button onClick={callAPIPOST}>Call API POT</button>
    </div>
  );
}
