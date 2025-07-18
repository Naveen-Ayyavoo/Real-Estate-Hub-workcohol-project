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
import UserAvatar from "@/components/ui/UserAvatar";
import DashboardNavbar from "@/components/ui/DashboardNavbar";
import { formatPrice } from "@/components/ui/PropertyCard";
import PropertyCard from "@/components/ui/PropertyCard";
import { useSearchParams } from "next/navigation";

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
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
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
    existingImages: [], // For general property images
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);
  const [selectedRoomFiles, setSelectedRoomFiles] = useState({}); // key: roomKey, value: File
  const [propertyImages, setPropertyImages] = useState([]);

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
      // Prefill existingImages for general property images
      let existingImages = [];
      if (Array.isArray(editProperty.images)) {
        existingImages = editProperty.images
          .map((img) =>
            typeof img === "string"
              ? getAbsoluteUrl(img)
              : img && img.image
              ? getAbsoluteUrl(img.image)
              : null
          )
          .filter(Boolean);
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
        existingImages, // <-- set here
      });
      setSelectedRoomFiles({});
      setPropertyImages([]); // Clear new images
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
      // 1. Create the property (without images)
      const res = await fetch("http://localhost:8000/api/properties/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title: form.title,
          property_type: form.property_type,
          address: form.location,
          location: form.location,
          price: form.price,
          description: form.description,
          bedrooms: form.beds,
          beds: form.beds,
          bathrooms: form.baths,
          baths: form.baths,
          area: form.sqft,
          sqft: form.sqft,
          negotiable: form.negotiable,
          features: form.features,
        }),
      });
      if (!res.ok) throw new Error("Failed to create property");
      const propertyData = await res.json();

      // 2. Upload images (if any)
      if (propertyData.id && propertyImages.length > 0) {
        const formData = new FormData();
        propertyImages.forEach((file) => formData.append("images", file));
        await fetch(
          `http://localhost:8000/api/properties/${propertyData.id}/upload_images/`,
          {
            method: "POST",
            headers: { Authorization: `Bearer ${token}` },
            body: formData,
          }
        );
      }

      // 3. Fetch the property again to get images
      let updatedProperty = propertyData;
      if (propertyData.id) {
        const updatedRes = await fetch(
          `http://localhost:8000/api/properties/${propertyData.id}/`
        );
        if (updatedRes.ok) {
          updatedProperty = await updatedRes.json();
        }
      }

      // 4. Add updatedProperty to your listings state
      setListings((prev) => [updatedProperty, ...prev]);

      // Reset form and close modal
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
        existingImages: [],
      });
      setSelectedRoomFiles({});
      setPropertyImages([]);
      fetchListings(); // Optionally refresh all listings
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
      existingImages: [],
    });
    setSelectedRoomFiles({});
  };

  const [searchType, setSearchType] = useState("");

  return (
    <AuthGuard allowedUserType="seller">
      <DashboardNavbar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        profileOpen={profileOpen}
        setProfileOpen={setProfileOpen}
        searchValue={searchType}
        setSearchValue={setSearchType}
        dashboardType="seller"
      >
        {/* All main content (listings overview, modals, etc.) goes here */}
        {tab === "add-listing" ? (
          <div className="max-w-2xl mx-auto mt-8">
            <h2 className="text-2xl font-bold mb-4">Add New Listing</h2>
            <AddEditListingForm
              form={form}
              setForm={setForm}
              formLoading={formLoading}
              formError={formError}
              selectedRoomFiles={selectedRoomFiles}
              setSelectedRoomFiles={setSelectedRoomFiles}
              handleFormChange={handleFormChange}
              handleSubmit={handleAddProperty}
              onCancel={() => {
                window.history.replaceState(null, "", "/seller/dashboard");
              }}
              editMode={!!editProperty}
              propertyImages={propertyImages}
              setPropertyImages={setPropertyImages}
            />
          </div>
        ) : tab === "my-listings" ? (
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              My Listings
            </h1>
            {loading ? (
              <div>Loading properties...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {listings.map((property, idx) => {
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
                    cardImages = [`/property_images/img ${(idx % 20) + 1}.jpg`];
                  }
                  return (
                    <PropertyCard
                      key={property.id}
                      id={property.id}
                      image={cardImages[0]}
                      location={property.address || property.location}
                      price={property.price}
                      beds={property.beds}
                      baths={property.baths}
                      sqft={property.sqft}
                      actions={
                        <>
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
                        </>
                      }
                    />
                  );
                })}
              </div>
            )}
          </div>
        ) : (
          <>
            {/* Listings Overview Header with Hamburger Menu */}
            <div className="mb-8 flex items-center justify-between">
              <h1 className="text-2xl font-bold text-gray-900 mb-0">
                Listings Overview
              </h1>
              {/* Removed Add Listing button here */}
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
                propertyImages={propertyImages}
                setPropertyImages={setPropertyImages}
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
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {listings.map((property, idx) => {
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
                    // Add demo images if still empty
                    if (cardImages.length === 0) {
                      cardImages = [
                        `/property_images/img ${(idx % 20) + 1}.jpg`,
                      ];
                    }
                    return (
                      <PropertyCard
                        key={property.id}
                        id={property.id}
                        image={cardImages[0]}
                        location={property.address || property.location}
                        price={property.price}
                        beds={property.beds}
                        baths={property.baths}
                        sqft={property.sqft}
                        actions={
                          <>
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
                          </>
                        }
                      />
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
          </>
        )}
      </DashboardNavbar>
    </AuthGuard>
  );
}

export default SellerDashboardContent;
