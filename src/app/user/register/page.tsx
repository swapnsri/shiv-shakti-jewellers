"use client";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { loadStateSession, saveStateSession, Spinner } from "../../utils";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [errorMessage, setErrorMessage] = useState("");
  const [viewPassword, setViewPassword] = useState(false);
  const [loader, setLoader] = useState(false);
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setErrorMessage("Password does not match");
      return;
    }
    try {
      setLoader(true);
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErrorMessage(data.message || "Registeration failed");
        return;
      }

      // Handle successful login (e.g., redirect to a dashboard page)
      saveStateSession("register", true);
      // Example: router.push('/dashboard');
    } catch (error) {
      console.error("An error occurred during login:", error);
      setErrorMessage("An error occurred during login");
      saveStateSession("register", false);
    } finally {
      setLoader(false);
    }
  };
  useEffect(() => {
    if (loadStateSession("register")) {
      router.push("/");
    }
  }, [loader]);
  return (
    <div className="min-h-screen flex items-center justify-center bg-[var(--brand-color1-50)]">
      <div className="max-w-md w-full bg-white p-8 border border-[var(--brand-color1-200)] rounded shadow">
        <h2 className="text-2xl font-bold mb-6 text-center text-[var(--brand-color1-800)]">
          Register
        </h2>
        {errorMessage && (
          <p className="text-red-500 text-center mb-4">{errorMessage}</p>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-sm font-medium text-[var(--brand-color1-800)] mb-1"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-3 py-2 border border-[var(--brand-color1-300)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium text-[var(--brand-color1-800)] mb-1"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type={viewPassword ? "text" : "password"}
              id="password"
              className="w-full px-3 py-2 border border-[var(--brand-color1-300)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              style={{ top: "23px" }} // Adjust top position to align with the input field
            >
              <i
                className={`fas ${viewPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          <div className="mb-6 relative">
            <label
              className="block text-sm font-medium text-[var(--brand-color1-800)] mb-1"
              htmlFor="confirmpassword"
            >
              Confirm Password
            </label>
            <input
              type={viewPassword ? "text" : "password"}
              id="confirmpassword"
              className="w-full px-3 py-2 border border-[var(--brand-color1-300)] rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-500)]"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={() => setViewPassword(!viewPassword)}
              className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-500 focus:outline-none"
              style={{ top: "23px" }} // Adjust top position to align with the input field
            >
              <i
                className={`fas ${viewPassword ? "fa-eye-slash" : "fa-eye"}`}
              ></i>
            </button>
          </div>
          <button
            type="submit"
            className="flex justify-center w-full py-2 px-4 bg-[var(--brand-color1)] hover:bg-[var(--brand-color1-500)] text-white font-bold rounded focus:outline-none focus:ring-2 focus:ring-[var(--brand-color1-700)]"
          >
            {loader ? <Spinner /> : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
