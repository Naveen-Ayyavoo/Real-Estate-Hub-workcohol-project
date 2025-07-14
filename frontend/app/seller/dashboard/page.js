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

// Dynamically import ProfileSheet to prevent hydration issues
const ProfileSheet = dynamic(() => import("@/components/ui/ProfileSheet"), {
  ssr: false,
  loading: () => <div>Loading...</div>,
});

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
  });
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState(null);

  // Add after form state
  const [selectedImages, setSelectedImages] = useState([]);

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e) => {
    setSelectedImages(Array.from(e.target.files));
  };

  // Add/Edit Modal: if editProperty is set, prefill form and switch to edit mode
  useEffect(() => {
    if (editProperty) {
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
      });
    }
  }, [editProperty]);

  // Handle Add or Edit Property
  const handleAddProperty = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError(null);
    const token = localStorage.getItem("access_token");
    console.log("Access token:", token); // Debug: log the token
    if (!token) {
      setFormLoading(false);
      setFormError(
        "You are not logged in. Please log in as a seller to add a property."
      );
      // Optionally, redirect to login page:
      // window.location.href = "/login";
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
      // If images are selected and this is a create (not edit), upload images
      if (!editProperty && selectedImages.length > 0 && propertyData.id) {
        const formData = new FormData();
        selectedImages.forEach((img) => formData.append("images", img));
        const imgRes = await fetch(
          `http://localhost:8000/api/properties/${propertyData.id}/upload_images/`,
          {
            method: "POST",
            headers: {
              Authorization: `Bearer ${token}`,
            },
            body: formData,
          }
        );
        if (!imgRes.ok) {
          let msg = "Property created, but failed to upload images.";
          try {
            const errData = await imgRes.json();
            msg = errData.detail || errData.message || JSON.stringify(errData);
          } catch {}
          setFormError(msg);
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
      });
      setSelectedImages([]);
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
          {/* Add New Listing Button */}
          <button
            className="mb-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => setAddModalOpen(true)}
          >
            Add New Listing
          </button>
          {/* Add Listing Modal (also used for Edit) */}
          <Modal
            isOpen={addModalOpen}
            onRequestClose={() => {
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
              });
              setSelectedImages([]);
            }}
            contentLabel={editProperty ? "Edit Property" : "Add Property"}
            ariaHideApp={false}
            className="fixed inset-0 flex items-center justify-center z-50"
            overlayClassName="fixed inset-0 bg-black bg-opacity-40 z-40"
          >
            <form
              onSubmit={handleAddProperty}
              className="bg-white p-8 rounded shadow-lg w-full max-w-md max-h-[80vh] overflow-y-auto"
            >
              <h2 className="text-xl font-bold mb-4">
                {editProperty ? "Edit Property" : "Add New Property"}
              </h2>
              <div className="mb-4">
                <label className="block mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Type</label>
                <select
                  name="property_type"
                  value={form.property_type}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Location</label>
                <input
                  type="text"
                  name="location"
                  value={form.location}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Price</label>
                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Description</label>
                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Beds</label>
                <input
                  type="number"
                  name="beds"
                  value={form.beds}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Baths</label>
                <input
                  type="number"
                  name="baths"
                  value={form.baths}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Square Feet</label>
                <input
                  type="number"
                  name="sqft"
                  value={form.sqft}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Negotiable</label>
                <select
                  name="negotiable"
                  value={form.negotiable}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
              </div>
              <div className="mb-4">
                <label className="block mb-1">Features</label>
                <input
                  type="text"
                  name="features"
                  value={form.features}
                  onChange={handleFormChange}
                  className="w-full border px-3 py-2 rounded"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block mb-1">Images</label>
                <input
                  type="file"
                  name="images"
                  accept="image/*"
                  multiple
                  onChange={handleImageChange}
                  className="w-full border px-3 py-2 rounded"
                  disabled={formLoading}
                />
                {selectedImages.length > 0 && (
                  <div className="mt-2 text-xs text-gray-600">
                    {selectedImages.length} image(s) selected
                  </div>
                )}
              </div>
              {formError && (
                <div className="text-red-500 mb-2">{formError}</div>
              )}
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => {
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
                    });
                    setSelectedImages([]);
                  }}
                  className="mr-2 px-4 py-2 rounded border"
                  disabled={formLoading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                  disabled={formLoading}
                >
                  {formLoading
                    ? editProperty
                      ? "Saving..."
                      : "Adding..."
                    : editProperty
                    ? "Save Changes"
                    : "Add Property"}
                </button>
              </div>
            </form>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-6">
              Listings Overview
            </h1>
            {loading ? (
              <div>Loading properties...</div>
            ) : error ? (
              <div className="text-red-500">{error}</div>
            ) : (
              <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Property ID
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Title
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Location
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Price
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Type
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {listings.map((property) => (
                      <tr key={property.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {property.id}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.address || property.location}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.price}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {property.property_type}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                          <div className="flex gap-3">
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
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
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
