"use client";
import { useState, useEffect, useMemo } from "react";
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
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";
import { Heart as HeartIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import PropertyCard, { formatPrice } from "@/components/ui/PropertyCard";
import UserAvatar from "@/components/ui/UserAvatar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";

// Dynamically import ProfileSheet to prevent hydration issues
const ProfileSheet = dynamic(() => import("@/components/ui/ProfileSheet"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

// Move featuredProperties outside the component
const featuredProperties = [
  {
    id: 1,
    image: "/placeholder.svg?height=300&width=400",
    location: "Miami, FL",
    price: "$1,200,000",
    beds: 4,
    baths: 3,
    sqft: "2,850 sqft",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=300&width=400",
    location: "Beverly Hills, CA",
    price: "$2,500,000",
    beds: 5,
    baths: 4,
    sqft: "3,500 sqft",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=300&width=400",
    location: "Austin, TX",
    price: "$850,000",
    beds: 3,
    baths: 2,
    sqft: "2,100 sqft",
  },
  {
    id: 4,
    image: "/placeholder.svg?height=300&width=400",
    location: "New York, NY",
    price: "$3,200,000",
    beds: 2,
    baths: 2,
    sqft: "1,800 sqft",
  },
  {
    id: 5,
    image: "/placeholder.svg?height=300&width=400",
    location: "Malibu, CA",
    price: "$5,500,000",
    beds: 4,
    baths: 5,
    sqft: "4,200 sqft",
  },
  {
    id: 6,
    image: "/placeholder.svg?height=300&width=400",
    location: "Chicago, IL",
    price: "$750,000",
    beds: 3,
    baths: 2,
    sqft: "1,900 sqft",
  },
  {
    id: 7,
    image: "/placeholder.svg?height=300&width=400",
    location: "Upstate, NY",
    price: "$1,200,000",
    beds: 4,
    baths: 3,
    sqft: "2,800 sqft",
  },
  {
    id: 8,
    image: "/placeholder.svg?height=300&width=400",
    location: "Lake Tahoe, CA",
    price: "$2,800,000",
    beds: 5,
    baths: 4,
    sqft: "3,600 sqft",
  },
];

function BuyerDashboardContent() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [viewProperty, setViewProperty] = useState(null);
  const [savedProperties, setSavedProperties] = useState([]);
  const [searchType, setSearchType] = useState("");
  const [filteredProperties, setFilteredProperties] = useState([]);
  const router = useRouter();

  // Dynamic properties from backend
  const [recommendedProperties, setRecommendedProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProperties = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch(
          "http://localhost:8000/api/properties/?ordering=-created_at"
        );
        if (!res.ok) throw new Error("Failed to fetch properties");
        const data = await res.json();
        setRecommendedProperties(data.results || data);
      } catch (err) {
        setError(err.message || "Error fetching properties");
      } finally {
        setLoading(false);
      }
    };
    fetchProperties();
  }, []);

  const mergedProperties = useMemo(() => {
    const backend = recommendedProperties.map(p => ({ ...p, _isBackend: true }));
    const featured = featuredProperties
      .filter(fp => !recommendedProperties.some(rp => rp.id === fp.id))
      .map(p => ({ ...p, _isBackend: false }));

    const merged = [...backend, ...featured];
    merged.sort((a, b) => {
      // Backend properties first
      if (a._isBackend && !b._isBackend) return -1;
      if (!a._isBackend && b._isBackend) return 1;
      // Then by created date or id
      if (a.created && b.created) {
        return new Date(b.created) - new Date(a.created);
      }
      if (a.created && !b.created) return -1;
      if (!a.created && b.created) return 1;
      return (b.id || 0) - (a.id || 0);
    });
    return merged;
  }, [recommendedProperties, featuredProperties]);

  useEffect(() => {
    if (searchType.trim()) {
      setFilteredProperties(
        mergedProperties.filter((p) =>
          p.property_type?.toLowerCase().includes(searchType.trim().toLowerCase())
        )
      );
    } else {
      setFilteredProperties(mergedProperties);
    }
  }, [searchType, mergedProperties]);

  console.log('filteredProperties:', filteredProperties);
  console.log('mergedProperties:', mergedProperties);

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
    <AuthGuard allowedUserType="buyer">
      <DashboardNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        searchValue={searchType}
        setSearchValue={setSearchType}
        dashboardType="buyer"
      >
        {/* All main content (stats, property cards, etc.) goes here */}
        <div className="p-6">
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
                  Here's a quick overview of your property activities and
                  market insights.
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
                  <p className="text-sm text-gray-600">
                    Upcoming Appointments
                  </p>
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

              {loading ? (
                <div>Loading properties...</div>
              ) : error ? (
                <div className="text-red-500">{error}</div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      image={property.main_image || property.image || "/placeholder.svg"}
                      location={property.address || property.location}
                      price={property.price ? `$${property.price}` : "N/A"}
                      beds={property.beds}
                      baths={property.baths}
                      sqft={property.sqft ? `${property.sqft} sqft` : "N/A"}
                      detailsLink={`/property/${property.id}`}
                    />
                  ))}
                </div>
              )}

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
        </div>
        {/* View Property Modal */}
        {viewProperty && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div
              className="fixed inset-0 bg-black bg-opacity-40 z-40"
              onClick={() => setViewProperty(null)}
            />
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto z-50">
              <h2 className="text-xl font-bold mb-4">Property Details</h2>
              <Image
                src={viewProperty.main_image || "/placeholder.svg"}
                alt={viewProperty.title || "Property"}
                width={300}
                height={200}
                className="rounded-lg mb-2"
              />
              <div className="mb-2">
                <strong>Title:</strong> {viewProperty.title}
              </div>
              <div className="mb-2">
                <strong>Type:</strong> {viewProperty.property_type}
              </div>
              <div className="mb-2">
                <strong>Location:</strong>{" "}
                {viewProperty.address || viewProperty.location}
              </div>
              <div className="mb-2">
                <strong>Price:</strong> {formatPrice(viewProperty.price)}
              </div>
              <div className="mb-2">
                <strong>Description:</strong> {viewProperty.description}
              </div>
              <div className="mb-2">
                <strong>Beds:</strong> {viewProperty.beds}
              </div>
              <div className="mb-2">
                <strong>Baths:</strong> {viewProperty.baths}
              </div>
              <div className="mb-2">
                <strong>Square Feet:</strong> {viewProperty.sqft}
              </div>
              <div className="mb-2">
                <strong>Negotiable:</strong>{" "}
                {viewProperty.negotiable ? "Yes" : "No"}
              </div>
              <div className="mb-2">
                <strong>Features:</strong> {viewProperty.features}
              </div>
              <div className="flex justify-end mt-4">
                <button
                  onClick={() => setViewProperty(null)}
                  className="px-4 py-2 rounded border"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
        {/* Place ProfileSheet at the root of the component */}
        <ProfileSheet
          userType="buyer"
          open={profileOpen}
          onOpenChange={setProfileOpen}
        />
      </DashboardNavbar>
    </AuthGuard>
  );
}

export default BuyerDashboardContent;
