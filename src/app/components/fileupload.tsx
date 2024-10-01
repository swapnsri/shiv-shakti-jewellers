"use client";
import Image from "next/image";
import React, { useState } from "react";

function FileUpload() {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    const selectedFile = event.target.files && event.target.files[0];
    setFile(selectedFile);
  };

  const handleRemoveFile = () => {
    setFile(null);
  };

  return (
    <div className="flex justify-center items-center sm:min-h-screen">
      <div className="sm:h-full relative w-full max-w-md p-6 bg-white border border-gray-300 rounded-lg shadow-lg flex flex-col items-center justify-center">
        {file ? (
          <>
            <div className="relative w-full flex flex-col items-center">
              <p className="mb-2 text-gray-700">Selected file: {file.name}</p>
              {file.type.startsWith("image/") && (
                <Image
                  src={URL.createObjectURL(file)}
                  alt="Preview"
                  width={30}
                  height={30}
                  className="w-full h-auto max-h-64 object-contain rounded-lg mb-2"
                />
              )}
              <button
                type="button"
                onClick={handleRemoveFile}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full p-2 shadow-lg hover:bg-red-600"
              >
                ✕
              </button>
              <input
                id="user-image"
                className="hidden"
                type="file"
                onChange={handleFileChange}
              />
              <label
                htmlFor="user-image"
                className="mt-2 py-2 px-4 bg-[var(--brand-color2)] text-white rounded-lg cursor-pointer hover:bg-[var(--brand-color1)]"
              >
                Replace Image
              </label>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-48 bg-gray-100 border border-gray-300 rounded-lg shadow-lg p-6 text-center">
            <p className="text-gray-600 mb-4">No image selected.</p>
            <input
              id="user-image"
              className="hidden"
              type="file"
              onChange={handleFileChange}
            />
            <label
              htmlFor="user-image"
              className="py-3 px-6 bg-[var(--brand-color2)] text-white rounded-lg cursor-pointer hover:bg-[var(--brand-color1)]"
            >
              Upload Image
            </label>
            <p className="mt-4 text-gray-500">Click to upload your image.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default FileUpload;
