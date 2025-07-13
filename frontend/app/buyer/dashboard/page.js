"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileSheet from "@/components/ui/ProfileSheet";

export default function BuyerDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const recommendedProperties = [
    {
      id: 1,
      image: "/placeholder.svg?height=200&width=300",
      price: "$750,000",
      address: "123 Elm St, Sunnyville",
      beds: 4,
      baths: 3,
      sqft: "2,400 sqft",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=200&width=300",
      price: "$980,000",
      address: "789 Cityscape Towers, Metropolis",
      beds: 2,
      baths: 2,
      sqft: "1,500 sqft",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=200&width=300",
      price: "$420,000",
      address: "456 Garden Ln, Quiet Oaks",
      beds: 3,
      baths: 2.5,
      sqft: "1,600 sqft",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=200&width=300",
      price: "$310,000",
      address: "101 Forest Path, Mountaincrest",
      beds: 2,
      baths: 1,
      sqft: "1,200 sqft",
    },
  ];

  const appointments = [
    {
      address: "123 Maple Dr, Suburbia",
      date: "Nov 10 at 10:00 AM",
      agent: "John Doe",
      status: "Confirmed",
    },
    {
      address: "456 Oak Ave, City Center",
      date: "Nov 12 at 02:30 PM",
      agent: "Jane Smith",
      status: "Pending",
    },
    {
      address: "789 Pine Ln, Green Valley",
      date: "Nov 15 at 11:00 AM",
      agent: "Michael Brown",
      status: "Confirmed",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="ml-2 text-lg font-semibold text-gray-900">
              RealEstate Hub
            </span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <nav className="mt-6">
          <div className="px-6 space-y-2">
            <Link
              href="/buyer/dashboard"
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z"
                />
              </svg>
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              Browse
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                />
              </svg>
              Saved Properties
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <svg
                className="w-5 h-5 mr-3"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7"
                />
              </svg>
              Appointments
            </Link>
            {/* Replace Profile Link with ProfileSheet trigger */}
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full"
            >
              <svg
                className="w-5 h-5 mr-3"
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
              Profile
            </button>
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="lg:hidden mr-4"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search properties..."
                  className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <svg
                  className="w-5 h-5 text-gray-400 absolute left-3 top-2.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                  />
                </svg>
              </button>
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white font-semibold text-sm">S</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <main className="p-6">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              Buyer Dashboard
            </h1>
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900 mb-1">
                  Welcome Back, Sarah!
                </h2>
                <p className="text-gray-600">
                  Here's a quick overview of your property activities and market
                  insights.
                </p>
              </div>
              <button
                className="flex items-center text-blue-600 hover:text-blue-700"
                onClick={() => (window.location.href = "/profile")}
              >
                <svg
                  className="w-5 h-5 mr-1"
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
                My Profile
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-blue-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Saved Properties</p>
                  <p className="text-2xl font-bold text-gray-900">12</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-purple-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 0h6m-6 0l-1 12a2 2 0 002 2h6a2 2 0 002-2L16 7"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Upcoming Appointments</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-green-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-green-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Recently Viewed</p>
                  <p className="text-2xl font-bold text-gray-900">5</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center">
                <div className="p-2 bg-yellow-100 rounded-lg">
                  <svg
                    className="w-6 h-6 text-yellow-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                    />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm text-gray-600">Market Insights</p>
                  <p className="text-2xl font-bold text-gray-900">Stable</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Recommended Properties */}
            <div className="lg:col-span-2">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    Recommended Properties
                  </h3>
                  <p className="text-gray-600">
                    Based on your preferences and recent activity.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {recommendedProperties.map((property) => (
                  <div
                    key={property.id}
                    className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <Image
                      src={property.image || "/placeholder.svg"}
                      alt={property.address}
                      width={300}
                      height={200}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <p className="text-2xl font-bold text-blue-600 mb-1">
                        {property.price}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">
                        {property.address}
                      </p>
                      <div className="flex items-center text-sm text-gray-600 space-x-4 mb-4">
                        <span>{property.beds} Beds</span>
                        <span>{property.baths} Baths</span>
                        <span>{property.sqft}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <button className="text-blue-600 hover:text-blue-700 font-medium">
                          View Details
                        </button>
                        <button className="p-2 text-gray-400 hover:text-red-500">
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center mt-6">
                <button className="text-blue-600 hover:text-blue-700 font-medium">
                  Browse All Properties
                </button>
              </div>
            </div>

            {/* Right Sidebar */}
            <div className="space-y-8">
              {/* Upcoming Appointments */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Upcoming Appointments
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Your scheduled property viewings.
                </p>

                <div className="space-y-4">
                  {appointments.map((appointment, index) => (
                    <div
                      key={index}
                      className="border-l-4 border-blue-500 pl-4"
                    >
                      <h4 className="font-medium text-gray-900">
                        {appointment.address}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {appointment.date}
                      </p>
                      <p className="text-sm text-gray-600">
                        Agent: {appointment.agent}
                      </p>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded-full ${
                          appointment.status === "Confirmed"
                            ? "bg-green-100 text-green-800"
                            : "bg-yellow-100 text-yellow-800"
                        }`}
                      >
                        {appointment.status}
                      </span>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 text-blue-600 hover:text-blue-700 font-medium">
                  View All Appointments
                </button>
              </div>

              {/* Market Trends */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Market Trends: Avg. Price
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Average property price in your area.
                </p>

                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">$800k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">$600k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">$400k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">$200k</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">$0k</span>
                  </div>
                </div>

                <div className="h-32 bg-gradient-to-r from-blue-100 to-blue-200 rounded-lg flex items-end justify-center">
                  <div className="flex items-end space-x-2 pb-4">
                    {["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map(
                      (month, index) => (
                      <div key={month} className="text-center">
                          <div
                            className="w-4 bg-blue-600 rounded-t"
                            style={{ height: `${20 + index * 8}px` }}
                          ></div>
                          <span className="text-xs text-gray-600 mt-1 block">
                            {month}
                          </span>
                      </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      {/* Place ProfileSheet at the root of the component */}
      <ProfileSheet
        userType="buyer"
        open={profileOpen}
        onOpenChange={setProfileOpen}
      />
    </div>
  );
}
