"use client";
import { useState } from "react";

interface FormData {
  fullName: string;
  email: string;
  phoneNumber: string;
  jewelryType: string;
  material: string;
  size: string;
  finish: string;
  budget: string;
  completionDate: string;
  specialRequests: string;
  image: File | null;
  shippingAddress: string;
  agreeToTerms: boolean;
}

export default function JewelryOrderForm() {
  const [formData, setFormData] = useState<FormData>({
    fullName: "",
    email: "",
    phoneNumber: "",
    jewelryType: "",
    material: "",
    size: "",
    finish: "",
    budget: "",
    completionDate: "",
    specialRequests: "",
    image: null,
    shippingAddress: "",
    agreeToTerms: false,
  });

  const [step, setStep] = useState(1);
  const [isOtherJewelryType, setIsOtherJewelryType] = useState(false);
  const [isOtherMaterial, setIsOtherMaterial] = useState(false);
  const [isOtherFinish, setIsOtherFinish] = useState(false);
  const [showSnackbar, setShowSnackbar] = useState(false);
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type, checked, files } = e.target as any;
    if (type === "checkbox") {
      setFormData({ ...formData, [name]: checked });
    } else if (type === "file") {
      setFormData({ ...formData, [name]: files ? files[0] : null });
    } else {
      setFormData({ ...formData, [name]: value });
    }

    // Check for "Other" selection
    if (name === "jewelryType" && value === "Other") {
      setIsOtherJewelryType(true);
      setFormData({ ...formData, [name]: "" }); // Reset the value when selecting "Other"
    }

    if (name === "material" && value === "Other") {
      setIsOtherMaterial(true);
      setFormData({ ...formData, [name]: "" });
    }

    if (name === "finish" && value === "Other") {
      setIsOtherFinish(true);
      setFormData({ ...formData, [name]: "" });
    }
  };
  // Validation function
  const validateForm = (): boolean => {
    // Define required fields based on steps
    const requiredFields: { [key: number]: string[] } = {
      1: ["fullName", "email", "phoneNumber", "jewelryType"],
      2: ["material", "size", "finish"],
      3: ["budget", "completionDate", "shippingAddress", "agreeToTerms"],
    };

    // Collect all required fields from all steps
    const allRequiredFields = [
      ...requiredFields[1],
      ...requiredFields[2],
      ...requiredFields[3],
    ];

    // Check if any required fields are empty
    for (const field of allRequiredFields) {
      const value = formData[field as keyof FormData];

      // Check if field value is empty or not filled
      if (typeof value === "string") {
        if (value.trim() === "") {
          console.log(`Field ${field} is empty.`);
          return false;
        }
      } else if (Array.isArray(value)) {
        if (value.length === 0) {
          console.log(`Field ${field} is empty.`);
          return false;
        }
      } else if (typeof value === "boolean") {
        if (field === "agreeToTerms" && !value) {
          console.log(`Field ${field} is not checked.`);
          return false;
        }
      } else if (value === null || value === undefined) {
        console.log(`Field ${field} is null or undefined.`);
        return false;
      }
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Handle form submission, e.g., send data to your backend
    if (!validateForm()) {
      setShowSnackbar(true); // Show snackbar if validation fails
      return;
    }
    console.log(formData);

    // Reset snackbar
    setShowSnackbar(false);
    const data = new FormData();

    // Append all form fields to FormData
    data.append("fullName", formData.fullName);
    data.append("email", formData.email);
    data.append("phoneNumber", formData.phoneNumber);
    data.append("jewelryType", formData.jewelryType);
    data.append("material", formData.material);
    data.append("size", formData.size);
    data.append("finish", formData.finish);
    data.append("budget", formData.budget);
    data.append("completionDate", formData.completionDate);
    data.append("specialRequests", formData.specialRequests);
    data.append("shippingAddress", formData.shippingAddress);
    data.append("agreeToTerms", formData.agreeToTerms.toString());

    // Append the uploaded image file
    if (formData.image) {
      data.append("image", formData.image);
    }
    console.log("data", data);
  };

  const handleNextStep = () => setStep(step + 1);
  const handlePrevStep = () => setStep(step - 1);

  return (
    <div className="flex flex-col justify-center max-w-4xl mx-auto p-8 bg-white shadow-lg rounded-lg bg-gray-100 border border-gray-300">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Custom Jewelry Order Form
      </h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        {step === 1 && (
          <div className="space-y-6">
            <div className="flex flex-col">
              <input
                placeholder="Full Name"
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                required
              />
            </div>

            <div className="flex flex-col">
              <input
                placeholder="Email"
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                required
              />
            </div>

            <div className="flex flex-col">
              <input
                placeholder="Contact Number"
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
              />
            </div>

            <div className="flex flex-col">
              {isOtherJewelryType ? (
                <>
                  <input
                    placeholder="Specify Jewelry Type"
                    type="text"
                    id="jewelryType"
                    name="jewelryType"
                    value={formData.jewelryType}
                    onChange={handleChange}
                    className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                  />
                  <button
                    type="button"
                    onClick={() => setIsOtherJewelryType(false)}
                    className="mt-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Back to Dropdown
                  </button>
                </>
              ) : (
                <select
                  id="jewelryType"
                  name="jewelryType"
                  value={formData.jewelryType}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                  required
                >
                  <option value="">Type of Jewelry</option>
                  <option value="ring">Ring</option>
                  <option value="necklace">Necklace</option>
                  <option value="bracelet">Bracelet</option>
                  <option value="earrings">Earrings</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-6 bg-[var(--brand-color2)] text-white font-bold rounded-lg hover:bg-[var(--brand-color1)] focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div className="flex flex-col">
              {isOtherMaterial ? (
                <>
                  <input
                    placeholder="Specify Material"
                    type="text"
                    id="material"
                    name="material"
                    value={formData.material}
                    onChange={handleChange}
                    className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsOtherMaterial(false)}
                    className="mt-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Back to Dropdown
                  </button>
                </>
              ) : (
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                  required
                >
                  <option value="">Select Material</option>
                  <option value="gold">Gold</option>
                  <option value="silver">Silver</option>
                  <option value="platinum">Platinum</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>

            <div className="flex flex-col">
              <input
                placeholder="Size (e.g., Ring Size, Necklace Length)"
                type="text"
                id="size"
                name="size"
                value={formData.size}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
              />
            </div>

            <div className="flex flex-col">
              {isOtherFinish ? (
                <>
                  <input
                    placeholder="Specify Finish"
                    type="text"
                    id="finish"
                    name="finish"
                    value={formData.finish}
                    onChange={handleChange}
                    className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setIsOtherFinish(false)}
                    className="mt-2 p-2 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    Back to Dropdown
                  </button>
                </>
              ) : (
                <select
                  id="finish"
                  name="finish"
                  value={formData.finish}
                  onChange={handleChange}
                  className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                  required
                >
                  <option value="">Select Finish</option>
                  <option value="polished">Polished</option>
                  <option value="matte">Matte</option>
                  <option value="brushed">Brushed</option>
                  <option value="Other">Other</option>
                </select>
              )}
            </div>

            <div className="flex flex-col gap-5">
              <button
                type="button"
                onClick={handlePrevStep}
                className="py-3 px-6 bg-[var(--brand-color2)] text-white font-bold rounded-lg hover:bg-[var(--brand-color1)] focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Previous
              </button>
              <button
                type="button"
                onClick={handleNextStep}
                className="py-3 px-6 bg-[var(--brand-color2)] text-white font-bold rounded-lg hover:bg-[var(--brand-color1)] focus:outline-none focus:ring-2 focus:ring-gray-500"
              >
                Next
              </button>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div className="flex flex-col">
              <input
                placeholder="Budget"
                type="number"
                id="budget"
                name="budget"
                value={formData.budget}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
              />
            </div>

            <div className="flex flex-col">
              <input
                placeholder="Preferred Completion Date"
                type="date"
                id="completionDate"
                name="completionDate"
                value={formData.completionDate}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
              />
            </div>

            <div className="flex flex-col">
              <textarea
                placeholder="Special Requests"
                id="specialRequests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
              />
            </div>

            <div className="flex flex-col">
              <textarea
                placeholder="Shipping Address"
                id="shippingAddress"
                name="shippingAddress"
                value={formData.shippingAddress}
                onChange={handleChange}
                className="mt-2 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-color1"
                required
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="agreeToTerms"
                name="agreeToTerms"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="mr-2 h-5 w-5 text-brand-color1 border-gray-300 rounded focus:ring-2 focus:ring-brand-color1"
                required
              />
              <label
                htmlFor="agreeToTerms"
                className="text-gray-700 font-semibold"
              >
                I agree to the terms and conditions
              </label>
            </div>

            <button
              type="button"
              onClick={handlePrevStep}
              className="w-full py-3 mt-6 bg-[var(--brand-color2)] text-white font-bold rounded-lg hover:bg-[var(--brand-color1)] focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Previous
            </button>

            <button
              type="submit"
              className="w-full py-3 mt-6 bg-[var(--brand-color2)] text-white font-bold rounded-lg hover:bg-[var(--brand-color1)] focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Submit Order
            </button>
          </div>
        )}
      </form>
      {showSnackbar && (
        <div className="fixed bottom-0 left-0 right-0 mx-auto mb-4 w-64 py-3 text-center text-white bg-red-500 rounded-md">
          Please fill in all required fields before submitting.
        </div>
      )}
    </div>
  );
}
