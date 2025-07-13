"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import dynamic from "next/dynamic";
import AuthGuard from "@/components/AuthGuard";
import {
  Home,
  User,
  Search,
  Heart,
  Calendar,
  Menu,
  Mail,
  Eye,
  LogOut,
  Settings,
  Plus,
  UserCircle,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

// Dynamically import ProfileSheet to prevent hydration issues
const ProfileSheet = dynamic(() => import("@/components/ui/ProfileSheet"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

function SellerDashboardContent() {
  const [activeTab, setActiveTab] = useState("listings");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    <AuthGuard allowedUserType="seller">
      <div className="min-h-screen bg-gray-50 flex relative">
      {/* Sidebar Toggle Button (when closed) */}
      {!sidebarOpen && (
        <button
          className="fixed top-6 left-2 z-50 bg-white rounded-full shadow p-1 border border-gray-200 transition-all"
          onClick={() => setSidebarOpen(true)}
          aria-label="Open sidebar"
        >
          <Menu className="w-6 h-6 text-gray-700" />
        </button>
      )}
      {/* Overlay when sidebar is open */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-30 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      {/* Sidebar */}
      <div
        className={`${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        } fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out flex flex-col`}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white font-bold text-sm">R</span>
            </div>
            <span className="ml-2 text-xl font-semibold text-gray-900">
              RealEstateHub
            </span>
          </div>
          {/* Sidebar Close Button */}
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-2 bg-gray-100 rounded-full p-1 border border-gray-200"
            aria-label="Close sidebar"
          >
            <ChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
        </div>
        <nav className="mt-6">
          <div className="px-6 space-y-2">
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md"
            >
              <Home className="w-5 h-5 mr-3" />
              Current Listings
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Plus className="w-5 h-5 mr-3" />
              Add New Listing
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Settings className="w-5 h-5 mr-3" />
              Account Settings
            </Link>
            {/* Replace Profile Link with ProfileSheet trigger */}
            <button
              onClick={() => setProfileOpen(true)}
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full"
            >
              <UserCircle className="w-5 h-5 mr-3" />
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
                          <Star key={i} className="w-4 h-4 fill-current" />
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
            <UserCircle className="w-4 h-4" />
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
    </AuthGuard>
  );
}

export default SellerDashboardContent;
