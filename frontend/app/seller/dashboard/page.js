"use client";
import { useState, useEffect } from "react";
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
import Modal from "react-modal";
import AddEditListingForm from "@/components/ui/AddEditListingForm";
import MiniImageCarousel from "@/components/ui/MiniImageCarousel";

// Dynamically import ProfileSheet to prevent hydration issues
const ProfileSheet = dynamic(() => import("@/components/ui/ProfileSheet"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

// Helper to ensure image URLs are absolute
const getAbsoluteUrl = (url) => {
  if (!url) return "/placeholder.svg";
  if (url.startsWith("http")) return url;
  return `http://localhost:8000${url}`;
};

// Helper to generate room labels and keys (duplicated from AddEditListingForm for mapping)
const generateRoomLabels = (beds, baths) => {
  const labels = [
    { key: "living_room", label: "Living Room" },
    { key: "kitchen", label: "Kitchen" },
    { key: "dining_room", label: "Dining Room" },
    { key: "exterior", label: "Exterior" },
    { key: "other", label: "Other" },
  ];
  for (let i = 1; i <= beds; i++) {
    labels.push({ key: `bedroom_${i}`, label: `Bedroom ${i}` });
  }
  for (let i = 1; i <= baths; i++) {
    labels.push({ key: `bathroom_${i}`, label: `Bathroom ${i}` });
  }
  return labels;
};

function SellerDashboardContent() {
  const [activeTab, setActiveTab] = useState("listings");
  const [profileOpen, setProfileOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Dynamic listings from backend
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Add state for view/edit/delete modals
  const [viewProperty, setViewProperty] = useState(null);
  const [editProperty, setEditProperty] = useState(null);
  const [deleteProperty, setDeleteProperty] = useState(null);

  // Fetch listings from backend
  const fetchListings = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(
        "http://localhost:8000/api/properties/?ordering=-created_at"
      );
      if (!res.ok) throw new Error("Failed to fetch properties");
      const data = await res.json();
      setListings(data.results || data);
    } catch (err) {
      setError(err.message || "Error fetching properties");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchListings();
  }, []);

  // Add Listing Modal State
  const [addModalOpen, setAddModalOpen] = useState(false);

  // --- Room-based form state ---
  const [form, setForm] = useState({
    title: "",
    property_type: "house",
    location: "",
    price: "",
    description: "",
    beds: "",
    baths: "",
    sqft: "",
    negotiable: false,
    features: "",
    roomImageUrls: {}, // key: roomKey, value: image URL string (for edit mode)
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedRoomFiles, setSelectedRoomFiles] = useState({}); // key: roomKey, value: File

  // Handle form field changes
  const handleFormChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prevForm) => ({
      ...prevForm,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Handle Add/Edit Modal: if editProperty is set, prefill form and switch to edit mode
  useEffect(() => {
    if (editProperty) {
      // Map backend images to roomImageUrls by order (first image to first room, etc.)
      const allRoomLabels = generateRoomLabels(
        Number(editProperty.beds) || 0,
        Number(editProperty.baths) || 0
      );
      const roomImageUrls = {};
      if (Array.isArray(editProperty.images)) {
        editProperty.images.forEach((img, idx) => {
          const roomKey = allRoomLabels[idx]?.key;
          if (roomKey) {
            roomImageUrls[roomKey] = getAbsoluteUrl(
              typeof img === "string" ? img : img.image
            );
          }
        });
      }
      setAddModalOpen(true);
      setForm({
        title: editProperty.title || "",
        property_type: editProperty.property_type || "house",
        location: editProperty.address || editProperty.location || "",
        price: editProperty.price || "",
        description: editProperty.description || "",
        beds: editProperty.beds || "",
        baths: editProperty.baths || "",
        sqft: editProperty.sqft || "",
        negotiable: editProperty.negotiable ?? false,
        features: editProperty.features || "",
        roomImageUrls, // <-- set here
      });
      setSelectedRoomFiles({});
    }
  }, [editProperty]);

  // Handle Add or Edit Property (room-based images)
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    const token = localStorage.getItem("access_token");
    if (!token) {
      setFormLoading(false);
      setFormError(
        "You are not logged in. Please log in as a seller to add a property."
      );
      return;
    }
    try {
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      };
      const url = editProperty
        ? `http://localhost:8000/api/properties/${editProperty.id}/`
        : "http://localhost:8000/api/properties/";
      const method = editProperty ? "PATCH" : "POST";
      const res = await fetch(url, {
        method,
        headers,
        body: JSON.stringify({
          title: form.title,
          property_type: form.property_type,
          address: form.location,
          location: form.location,
          price: form.price,
          description: form.description,
          beds: form.beds,
          baths: form.baths,
          sqft: form.sqft,
          negotiable: form.negotiable,
          features: form.features,
        }),
      });
      if (!res.ok) {
        let msg = "Failed to save property";
        try {
          const errData = await res.json();
          if (errData.errors && typeof errData.errors === "object") {
            msg = Object.entries(errData.errors)
              .map(
                ([field, messages]) =>
                  `${field}: ${
                    Array.isArray(messages) ? messages.join(", ") : messages
                  }`
              )
              .join("; ");
          } else if (typeof errData === "object") {
            msg = Object.entries(errData)
              .map(
                ([key, val]) =>
                  `${key}: ${Array.isArray(val) ? val.join(", ") : val}`
              )
              .join("; ");
          } else {
            msg = errData.detail || errData.message || JSON.stringify(errData);
          }
        } catch {}
        throw new Error(msg);
      }
      const propertyData = await res.json();

      // --- Room-based image upload stub ---
      // Here you would upload each selectedRoomFiles[roomKey] to your backend,
      // and update the property with the returned image URLs.
      // For now, we'll just log the files for demonstration.
      if (Object.keys(selectedRoomFiles).length > 0 && propertyData.id) {
        // Example: Loop through each room and upload
        for (const [roomKey, file] of Object.entries(selectedRoomFiles)) {
          if (file) {
            // TODO: Replace with actual API call to upload image for this room
            // Example:
            // const formData = new FormData();
            // formData.append("image", file);
            // await fetch(`http://localhost:8000/api/properties/${propertyData.id}/upload_room_image/${roomKey}/`, { ... })
            // For now, just log:
            console.log(`Would upload image for ${roomKey}:`, file);
          }
        }
      }

      setAddModalOpen(false);
      setEditProperty(null);
      setForm({
        title: "",
        property_type: "house",
        location: "",
        price: "",
        description: "",
        beds: "",
        baths: "",
        sqft: "",
        negotiable: false,
        features: "",
        roomImageUrls: {},
      });
      setSelectedRoomFiles({});
      fetchListings();
    } catch (err) {
      setFormError(err.message || "Error saving property");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle Delete Property
  const handleDeleteProperty = async () => {
    if (!deleteProperty) return;
    setFormLoading(true);
    setFormError(null);
    const token = localStorage.getItem("access_token");
    if (!token) {
      setFormLoading(false);
      setFormError(
        "You are not logged in. Please log in as a seller to delete a property."
      );
      return;
    }
    try {
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      const res = await fetch(
        `http://localhost:8000/api/properties/${deleteProperty.id}/`,
        {
          method: "DELETE",
          headers,
        }
      );
      if (!res.ok) {
        let msg = "Failed to delete property";
        try {
          const errData = await res.json();
          msg = errData.detail || errData.message || JSON.stringify(errData);
        } catch {}
        throw new Error(msg);
      }
      setDeleteProperty(null);
      fetchListings();
    } catch (err) {
      setFormError(err.message || "Error deleting property");
    } finally {
      setFormLoading(false);
    }
  };

  // Handle cancel (reset form and close modal)
  const handleCancel = () => {
    setAddModalOpen(false);
    setEditProperty(null);
    setForm({
      title: "",
      property_type: "house",
      location: "",
      price: "",
      description: "",
      beds: "",
      baths: "",
      sqft: "",
      negotiable: false,
      features: "",
      roomImageUrls: {},
    });
    setSelectedRoomFiles({});
  };

  return (
    <AuthGuard allowedUserType="seller">
      <div className="min-h-screen bg-gray-50 flex relative">
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
              <button
                onClick={() => setAddModalOpen(true)}
                className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md w-full"
              >
                <Plus className="w-5 h-5 mr-3" />
                Add New Listing
              </button>
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
          {/* Listings Overview Header with Hamburger Menu */}
          <div className="mb-8 flex items-center">
            <button
              className="mr-4 bg-white rounded-full shadow p-1 border border-gray-200 transition-all"
              onClick={() => setSidebarOpen(true)}
              aria-label="Open sidebar"
            >
              <Menu className="w-6 h-6 text-gray-700" />
            </button>
            <h1 className="text-2xl font-bold text-gray-900 mb-0">
              Listings Overview
            </h1>
          </div>
          {/* Add Listing Modal (also used for Edit) */}
          <Modal
            isOpen={addModalOpen}
            onRequestClose={handleCancel}
            contentLabel={editProperty ? "Edit Property" : "Add Property"}
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
          >
            <AddEditListingForm
              form={form}
              setForm={setForm}
              formLoading={formLoading}
              formError={formError}
              selectedRoomFiles={selectedRoomFiles}
              setSelectedRoomFiles={setSelectedRoomFiles}
              handleFormChange={handleFormChange}
              handleSubmit={handleAddProperty}
              onCancel={handleCancel}
              editMode={!!editProperty}
            />
          </Modal>
          {/* View Property Modal */}
          <Modal
            isOpen={!!viewProperty}
            onRequestClose={() => setViewProperty(null)}
            contentLabel="View Property"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
          >
            {viewProperty && (
              <div className="bg-white p-8 rounded shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto">
                <h2 className="text-xl font-bold mb-4">Property Details</h2>
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
                  <strong>Price:</strong> {viewProperty.price}
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
            )}
          </Modal>

          {/* Delete Confirmation Modal */}
          <Modal
            isOpen={!!deleteProperty}
            onRequestClose={() => setDeleteProperty(null)}
            contentLabel="Delete Property"
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
          >
            {deleteProperty && (
              <div className="bg-white p-8 rounded shadow-lg w-full max-w-md">
                <h2 className="text-xl font-bold mb-4 text-red-600">
                  Delete Property
                </h2>
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{deleteProperty.title}</strong>?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={() => setDeleteProperty(null)}
                    className="mr-2 px-4 py-2 rounded border"
                    disabled={formLoading}
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleDeleteProperty}
                    className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                    disabled={formLoading}
                  >
                    {formLoading ? "Deleting..." : "Delete"}
                  </button>
                </div>
              </div>
            )}
          </Modal>
          {/* Listings Overview */}
          <div className="mb-8">
            {loading ? (
              <div>Loading properties...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {listings.map((property) => {
                  // Robustly map images for the card
                  let cardImages = [];
                  if (
                    Array.isArray(property.images) &&
                    property.images.length > 0
                  ) {
                    cardImages = property.images
                      .map((img) =>
                        typeof img === "string"
                          ? getAbsoluteUrl(img)
                          : img && img.image
                          ? getAbsoluteUrl(img.image)
                          : null
                      )
                      .filter(Boolean);
                  }
                  if (cardImages.length === 0 && property.main_image) {
                    cardImages = [getAbsoluteUrl(property.main_image)];
                  }
                  if (cardImages.length === 0) {
                    cardImages = ["/placeholder.svg"];
                  }
                  return (
                    <div key={property.id} className="flex">
                      <div className="rounded-lg border bg-white shadow-sm flex flex-col w-full">
                        <div className="p-4 border-b">
                          <MiniImageCarousel
                            images={cardImages}
                            alt={property.title || "Property"}
                            width={320}
                            height={180}
                            interval={2500}
                          />
                        </div>
                        <div className="p-4 flex-1 flex flex-col justify-between">
                          <div>
                            <h2 className="text-lg font-semibold mb-1">
                              {property.title}
                            </h2>
                            <div className="text-sm text-gray-500 mb-1">
                              {property.address || property.location}
                            </div>
                            <div className="text-base font-bold text-blue-700 mb-1">
                              {property.price}
                            </div>
                            <div className="text-xs text-gray-400 mb-2">
                              {property.property_type}
                            </div>
                          </div>
                          <div className="flex gap-2 mt-4">
                            <button
                              className="px-3 py-1 rounded bg-blue-100 text-blue-700 font-medium hover:bg-blue-200 transition"
                              onClick={() => setViewProperty(property)}
                              type="button"
                            >
                              View
                            </button>
                            <button
                              className="px-3 py-1 rounded bg-yellow-100 text-yellow-700 font-medium hover:bg-yellow-200 transition"
                              onClick={() => setEditProperty(property)}
                              type="button"
                            >
                              Edit
                            </button>
                            <button
                              className="px-3 py-1 rounded bg-red-100 text-red-700 font-medium hover:bg-red-200 transition"
                              onClick={() => setDeleteProperty(property)}
                              type="button"
                            >
                              Delete
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Place ProfileSheet at the root of the component */}
            <ProfileSheet
              userType="seller"
              open={profileOpen}
              onOpenChange={setProfileOpen}
            />
          </div>
        </div>
      </div>
    </AuthGuard>
  );
}

export default SellerDashboardContent;
