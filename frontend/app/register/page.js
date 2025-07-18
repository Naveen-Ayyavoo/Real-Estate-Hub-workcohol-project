"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import apiService from "@/lib/api";
import { Eye as EyeIcon, EyeOff as EyeOffIcon } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function RegisterPage() {
  const [accountType, setAccountType] = useState("buyer");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirm_password: "",
  });
  const [passwordValidation, setPasswordValidation] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    special: false,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData({ ...formData, password });

    setPasswordValidation({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password),
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <Image
          src="/property_images/register.webp"
          alt="Register background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      </div>

      {/* Right Side - Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          {/* Logo */}
          <div className="flex items-center mb-8">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold">R</span>
            </div>
          </div>

          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Create Your WorkSquare Account
            </h1>
            <p className="text-gray-600">
              Join us today to manage your properties or find your dream home.
            </p>
          </div>

          {/* Account Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Account Type
            </label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                type="button"
                onClick={() => setAccountType("buyer")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  accountType === "buyer"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                    />
                  </svg>
                  <span className="font-medium text-gray-900">
                    Buyer Account
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  Discover and save properties, manage viewings.
                </p>
              </button>

              <button
                type="button"
                onClick={() => setAccountType("seller")}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  accountType === "seller"
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="flex items-center mb-2">
                  <svg
                    className="w-5 h-5 text-blue-600 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                  <span className="font-medium text-gray-900">
                    Seller Account
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  List properties and manage inquiries efficiently.
                </p>
              </button>
            </div>
          </div>

          <form
            className="space-y-4"
            onSubmit={async (e) => {
              e.preventDefault();

              // Validate passwords match
              if (formData.password !== formData.confirm_password) {
                toast({ title: "Passwords do not match!" });
                return;
              }

              // Validate password requirements
              const isPasswordValid =
                Object.values(passwordValidation).every(Boolean);
              if (!isPasswordValid) {
                toast({ title: "Please meet all password requirements!" });
                return;
              }

              try {
                const data = await apiService.register({
                  first_name: formData.firstName,
                  last_name: formData.lastName,
                  email: formData.email,
                  password: formData.password,
                  confirm_password: formData.confirm_password,
                  user_type: accountType,
                });

                if (data.status === "success") {
                  toast({ title: "Registration successful! Please login." });
                  window.location.href = "/login";
                } else {
                  // Handle specific error messages
                  let errorMessage = data.message || "Registration failed!";
                  if (data.errors && data.errors.email) {
                    errorMessage = data.errors.email;
                  }
                  toast({ title: errorMessage });
                }
              } catch (error) {
                console.error("Registration error:", error);
                toast({ title: error.message || "Registration failed!" });
              }
            }}
          >
            {/* Name Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="John"
                  value={formData.firstName}
                  onChange={(e) =>
                    setFormData({ ...formData, firstName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Last Name
                </label>
                <input
                  type="text"
                  placeholder="Doe"
                  value={formData.lastName}
                  onChange={(e) =>
                    setFormData({ ...formData, lastName: e.target.value })
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                placeholder="john.doe@example.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={formData.password}
                  onChange={handlePasswordChange}
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>

              {/* Password Requirements */}
              {formData.password && (
                <div className="mt-2 space-y-1">
                  <div
                    className={`flex items-center text-sm ${
                      passwordValidation.length
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span className="mr-2">○</span>8 or more characters
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      passwordValidation.uppercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span className="mr-2">○</span>
                    Contains an uppercase letter (A-Z)
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      passwordValidation.lowercase
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span className="mr-2">○</span>
                    Contains a lowercase letter (a-z)
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      passwordValidation.number
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span className="mr-2">○</span>
                    Contains a number (0-9)
                  </div>
                  <div
                    className={`flex items-center text-sm ${
                      passwordValidation.special
                        ? "text-green-600"
                        : "text-red-500"
                    }`}
                  >
                    <span className="mr-2">○</span>
                    Contains a special character (!@#$...)
                  </div>
                </div>
              )}
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm your password"
                  value={formData.confirm_password}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      confirm_password: e.target.value,
                    })
                  }
                  className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOffIcon className="h-5 w-5 text-gray-500" />
                  ) : (
                    <EyeIcon className="h-5 w-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 font-medium transition-colors"
            >
              Register Account
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600">Already have an account? </span>
            <Link
              href="/login"
              className="text-blue-600 hover:text-blue-700 font-medium"
            >
              Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
