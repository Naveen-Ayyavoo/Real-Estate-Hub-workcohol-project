"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileSheet from "@/components/ui/ProfileSheet";

export default function SellerDashboard() {
  const [activeTab, setActiveTab] = useState("listings");
  const [profileOpen, setProfileOpen] = useState(false);

  const listings = [
    {
      id: "001",
      image: "/placeholder.svg?height=60&width=60",
      location: "New York",
      owner: { name: "John", avatar: "/placeholder.svg?height=32&width=32" },
      rating: 5,
      status: ["available", "in review", "featured"],
      actions: ["Edit", "Delete", "View Details"],
    },
    {
      id: "002",
      image: "/placeholder.svg?height=60&width=60",
      location: "Colorado",
      owner: { name: "Sarah", avatar: "/placeholder.svg?height=32&width=32" },
      rating: 5,
      status: ["sold", "ready for test"],
      actions: ["Edit", "Delete", "View Details"],
    },
    {
      id: "003",
      image: "/placeholder.svg?height=60&width=60",
      location: "Los Angeles",
      owner: { name: "Mike", avatar: "/placeholder.svg?height=32&width=32" },
      rating: 5,
      status: ["available", "critical"],
      actions: ["Edit", "Delete", "View Details"],
    },
  ];

  const [newListing, setNewListing] = useState({
    title: "",
    description: "",
    price: "",
    negotiable: false,
    bedrooms: "",
    bathrooms: "",
    area: "",
    garages: "",
    yearBuilt: "",
    propertyType: "",
    features: {
      swimmingPool: false,
      gym: false,
      airConditioned: false,
      laundryRoom: false,
      garden: false,
      parking: false,
      security247: false,
      petFriendly: false,
      studyRoom: false,
      balcony: false,
    },
  });

  const handleFeatureChange = (feature) => {
    setNewListing((prev) => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: !prev.features[feature],
      },
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                RealEstateHub
              </span>
            </div>
            <div className="flex items-center space-x-8">
              <button
                onClick={() => setActiveTab("notifications")}
                className={`px-4 py-2 ${
                  activeTab === "notifications"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                notifications
              </button>
              <button
                onClick={() => setActiveTab("account")}
                className={`px-4 py-2 ${
                  activeTab === "account"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                account settings
              </button>
              <button
                onClick={() => setActiveTab("logout")}
                className={`px-4 py-2 ${
                  activeTab === "logout"
                    ? "text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600"
                }`}
              >
                logout
              </button>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center">
                <svg
                  className="w-4 h-4 mr-2"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3v-1m6-4h10"
                  />
                </svg>
                Logout
              </button>
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
                    d="M15 17h5l-5 5-5-5h5v-5a7.5 7.5 0 1 0-15 0v5h5l-5 5-5-5h5V7a12.5 12.5 0 1 1 25 0v10z"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="mt-6">
            <div className="px-6 space-y-2">
              <Link
                href="#"
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
                    d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
                Current Listings
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
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
                Add New Listing
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
                    d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                Account Settings
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
        <div className="flex-1 p-8">
          {/* Listings Overview */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Listings Overview
            </h1>

            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Property ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Image
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Location
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Owner
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Rating
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Status
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {listings.map((listing) => (
                    <tr key={listing.id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {listing.id}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <Image
                          src={listing.image || "/placeholder.svg"}
                          alt="Property"
                          width={60}
                          height={60}
                          className="rounded-lg bg-gray-100"
                        />
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                        {listing.location}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <Image
                            src={listing.owner.avatar || "/placeholder.svg"}
                            alt={listing.owner.name}
                            width={32}
                            height={32}
                            className="rounded-full"
                          />
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex text-yellow-400">
                          {[...Array(listing.rating)].map((_, i) => (
                            <svg
                              key={i}
                              className="w-4 h-4 fill-current"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex flex-wrap gap-1">
                          {listing.status.map((status, index) => (
                            <span
                              key={index}
                              className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${
                                status === "available"
                                  ? "bg-green-100 text-green-800"
                                  : status === "sold"
                                    ? "bg-gray-100 text-gray-800"
                                    : status === "featured"
                                      ? "bg-blue-100 text-blue-800"
                                      : status === "in review"
                                        ? "bg-yellow-100 text-yellow-800"
                                        : status === "critical"
                                          ? "bg-red-100 text-red-800"
                                          : "bg-purple-100 text-purple-800"
                              }`}
                            >
                              {status}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <button className="bg-blue-600 text-white px-3 py-1 rounded text-sm hover:bg-blue-700">
                          Edit
                        </button>
                        <button className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700">
                          Delete
                        </button>
                        <button className="bg-gray-600 text-white px-3 py-1 rounded text-sm hover:bg-gray-700">
                          View Details
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Add New Listing Form */}
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">
              Add New Listing
            </h2>

            <form className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left Column - Form Fields */}
                <div className="space-y-4">
                  <div>
                    <input
                      type="text"
                      placeholder="Property title"
                      value={newListing.title}
                      onChange={(e) =>
                        setNewListing({ ...newListing, title: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <textarea
                      placeholder="Description"
                      rows={3}
                      value={newListing.description}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          description: e.target.value,
                        })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="flex items-center space-x-4">
                    <input
                      type="text"
                      placeholder="Price"
                      value={newListing.price}
                      onChange={(e) =>
                        setNewListing({ ...newListing, price: e.target.value })
                      }
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="flex items-center">
                      <input
                        type="checkbox"
                        checked={newListing.negotiable}
                        onChange={(e) =>
                          setNewListing({
                            ...newListing,
                            negotiable: e.target.checked,
                          })
                        }
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-700">Negotiable</span>
                    </label>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Bedrooms"
                      value={newListing.bedrooms}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          bedrooms: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Bathrooms"
                      value={newListing.bathrooms}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          bathrooms: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Area (sq ft)"
                      value={newListing.area}
                      onChange={(e) =>
                        setNewListing({ ...newListing, area: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Garages"
                      value={newListing.garages}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          garages: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Uniqueness & Features */}
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-3">
                      Uniqueness & Features
                    </h3>
                    <textarea
                      placeholder="Add unique description"
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Feature Checkboxes */}
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                      swimmingPool: "Swimming Pool",
                      gym: "Gym",
                      airConditioned: "Air Conditioned",
                      laundryRoom: "Laundry Room",
                      garden: "Garden",
                      parking: "Parking",
                      security247: "24/7 Security",
                      petFriendly: "Pet Friendly",
                      studyRoom: "Study Room",
                      balcony: "Balcony",
                    }).map(([key, label]) => (
                      <label key={key} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={newListing.features[key]}
                          onChange={() => handleFeatureChange(key)}
                          className="mr-2"
                        />
                        <span className="text-sm text-gray-700">{label}</span>
                      </label>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="Year Built"
                      value={newListing.yearBuilt}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          yearBuilt: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <input
                      type="text"
                      placeholder="Property Type"
                      value={newListing.propertyType}
                      onChange={(e) =>
                        setNewListing({
                          ...newListing,
                          propertyType: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Right Column - Images */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">
                    Images
                  </h3>
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=120&width=120"
                          alt="House View"
                          width={120}
                          height={120}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">House View</p>
                        <p className="text-xs text-gray-500">Modern design</p>
                        <p className="text-xs text-gray-400">
                          Uploaded: 2 mins ago
                        </p>
                        <button className="mt-1 px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=120&width=120"
                          alt="Living Room"
                          width={120}
                          height={120}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Living Room</p>
                        <p className="text-xs text-gray-500">Warm ambiance</p>
                        <p className="text-xs text-gray-400">
                          Uploaded: 5 mins ago
                        </p>
                        <button className="mt-1 px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                          Edit
                        </button>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center">
                        <Image
                          src="/placeholder.svg?height=120&width=120"
                          alt="Backyard"
                          width={120}
                          height={120}
                          className="rounded-lg"
                        />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium">Backyard</p>
                        <p className="text-xs text-gray-500">Relaxing view</p>
                        <p className="text-xs text-gray-400">
                          Uploaded: 8 mins ago
                        </p>
                        <button className="mt-1 px-3 py-1 text-xs border border-blue-600 text-blue-600 rounded hover:bg-blue-50">
                          Edit
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 space-y-2">
                    <button className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700">
                      Browse Images
                    </button>
                    <button className="w-full bg-gray-600 text-white py-2 rounded-md hover:bg-gray-700">
                      Upload
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-8 py-2 rounded-md hover:bg-blue-700 font-medium"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* User Profile Section */}
      <div className="fixed bottom-6 left-6">
        <div className="flex items-center bg-white rounded-lg shadow-lg p-3">
          <Image
            src="/placeholder.svg?height=40&width=40"
            alt="Amanda"
            width={40}
            height={40}
            className="rounded-full"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-900">Amanda</p>
            <button
              className="text-xs text-blue-600 hover:text-blue-700"
              onClick={() => (window.location.href = "/profile")}
            >
              View profile
            </button>
          </div>
          <button className="ml-4 p-1 text-gray-400 hover:text-gray-600">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* Place ProfileSheet at the root of the component */}
      <ProfileSheet
        userType="seller"
        open={profileOpen}
        onOpenChange={setProfileOpen}
      />
    </div>
  );
}
