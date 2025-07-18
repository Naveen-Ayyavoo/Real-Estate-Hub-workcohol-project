"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { XIcon, Bed, Bath, Ruler, CameraIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState, useCallback } from "react";

export default function AddEditListingForm({
  form,
  setForm,
  formLoading,
  formError,
  selectedRoomFiles,
  setSelectedRoomFiles,
  handleFormChange,
  handleSubmit,
  onCancel,
  editMode = false,
  propertyImages,
  setPropertyImages,
}) {
  console.log("AddEditListingForm form state:", form); // DEBUG: Log form state
  // Remove all code related to room images (roomImagePreviews, selectedRoomFiles, room-based image upload, and their UI)
  // Only keep the general property images upload and preview

  // Ensure handlePropertyImagesChange is defined
  const handlePropertyImagesChange = (e) => {
    setPropertyImages(Array.from(e.target.files));
  };

  return (
    <Card className="w-full max-w-3xl mx-auto my-8 relative">
      {/* X Cancel Button */}
      <Button
        type="button"
        variant="ghost"
        size="icon"
        className="absolute top-4 right-4 z-10"
        onClick={onCancel}
        aria-label="Close"
      >
        <XIcon className="h-6 w-6" />
      </Button>
      <CardHeader>
        <CardTitle className="text-2xl font-bold">
          {editMode ? "Edit Property" : "Add New Property"}
        </CardTitle>
        <CardDescription>
          {editMode
            ? "Update the details of your property listing."
            : "Fill in the details to list a new property."}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              type="text"
              name="title"
              value={form.title}
              onChange={handleFormChange}
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              type="text"
              name="address"
              value={form.address || ""}
              onChange={handleFormChange}
              required
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="city">City</Label>
              <Input
                id="city"
                type="text"
                name="city"
                value={form.city || ""}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="state">State</Label>
              <Input
                id="state"
                type="text"
                name="state"
                value={form.state || ""}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="zip_code">Zip Code</Label>
              <Input
                id="zip_code"
                type="text"
                name="zip_code"
                value={form.zip_code || ""}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="property_type">Type</Label>
              <Select
                name="property_type"
                value={form.property_type}
                onValueChange={(value) =>
                  handleFormChange({ target: { name: "property_type", value } })
                }
                required
              >
                <SelectTrigger id="property_type">
                  <SelectValue placeholder="Select property type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="condo">Condo</SelectItem>
                  <SelectItem value="townhouse">Townhouse</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                type="text"
                name="location"
                value={form.location}
                onChange={handleFormChange}
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="price">Price</Label>
              <Input
                id="price"
                type="number"
                name="price"
                value={form.price}
                onChange={handleFormChange}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="negotiable">Negotiable</Label>
              <Select
                name="negotiable"
                value={String(form.negotiable)} // Convert boolean to string for select
                onValueChange={(value) =>
                  handleFormChange({
                    target: { name: "negotiable", value: value === "true" },
                  })
                }
                required
              >
                <SelectTrigger id="negotiable">
                  <SelectValue placeholder="Select option" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="true">Yes</SelectItem>
                  <SelectItem value="false">No</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              name="description"
              value={form.description}
              onChange={handleFormChange}
              rows={4}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="beds">Beds</Label>
              <div className="relative">
                <Input
                  id="beds"
                  type="number"
                  name="beds"
                  value={form.beds}
                  onChange={handleFormChange}
                  required
                  className="pl-10"
                />
                <Bed className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="baths">Baths</Label>
              <div className="relative">
                <Input
                  id="baths"
                  type="number"
                  name="baths"
                  value={form.baths}
                  onChange={handleFormChange}
                  required
                  className="pl-10"
                />
                <Bath className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="sqft">Square Feet</Label>
              <div className="relative">
                <Input
                  id="sqft"
                  type="number"
                  name="sqft"
                  value={form.sqft}
                  onChange={handleFormChange}
                  required
                  className="pl-10"
                />
                <Ruler className="absolute left-2 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="features">Features (comma-separated)</Label>
            <Input
              id="features"
              type="text"
              name="features"
              value={form.features}
              onChange={handleFormChange}
              placeholder="e.g., Pool, Garage, Balcony"
              required
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="video">Video Tour URL (YouTube or similar)</Label>
            <Input
              id="video"
              type="url"
              name="video"
              value={form.video || ""}
              onChange={handleFormChange}
              placeholder="https://www.youtube.com/watch?v=..."
            />
          </div>

          {/* General Property Images Upload */}
          <div className="grid gap-2">
            <Label htmlFor="property-images">Property Images</Label>
            <Input
              id="property-images"
              type="file"
              multiple
              accept="image/*"
              onChange={handlePropertyImagesChange}
            />
            <div className="flex flex-wrap gap-2 mt-2">
              {/* Existing images from backend */}
              {Array.isArray(form.existingImages) &&
                form.existingImages.map((imgUrl, idx) => (
                  <div key={"existing-" + idx} className="relative">
                    <Image
                      src={imgUrl}
                      alt="Property image"
                      width={80}
                      height={60}
                      className="rounded border"
                    />
                  </div>
                ))}
              {/* New images selected for upload */}
              {propertyImages.map((file, idx) => (
                <div key={"new-" + idx} className="relative">
                  <Image
                    src={URL.createObjectURL(file)}
                    alt={file.name}
                    width={80}
                    height={60}
                    className="rounded border"
                  />
                  <button
                    type="button"
                    className="absolute top-0 right-0 bg-white bg-opacity-80 rounded-full p-1 text-xs"
                    onClick={() => {
                      setPropertyImages(
                        propertyImages.filter((_, i) => i !== idx)
                      );
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Add after location fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="mapEmbed">Map Embed URL</Label>
              <Input
                id="mapEmbed"
                type="url"
                name="mapEmbed"
                value={form.mapEmbed || ""}
                onChange={handleFormChange}
                placeholder="https://www.google.com/maps/embed?..."
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="pricePerSqft">Price per Sqft</Label>
              <Input
                id="pricePerSqft"
                type="text"
                name="pricePerSqft"
                value={form.pricePerSqft || ""}
                onChange={handleFormChange}
                placeholder="$421/sqft"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="yearBuilt">Year Built</Label>
              <Input
                id="yearBuilt"
                type="number"
                name="yearBuilt"
                value={form.yearBuilt || ""}
                onChange={handleFormChange}
                min="1800"
                max={new Date().getFullYear()}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="parking">Parking</Label>
              <Input
                id="parking"
                type="number"
                name="parking"
                value={form.parking || ""}
                onChange={handleFormChange}
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="facing">Facing</Label>
              <Input
                id="facing"
                type="text"
                name="facing"
                value={form.facing || ""}
                onChange={handleFormChange}
                placeholder="East, West, North, South"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="furnishing">Furnishing</Label>
              <Input
                id="furnishing"
                type="text"
                name="furnishing"
                value={form.furnishing || ""}
                onChange={handleFormChange}
                placeholder="Furnished, Semi-Furnished, Unfurnished"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="propertyId">Property ID</Label>
              <Input
                id="propertyId"
                type="text"
                name="propertyId"
                value={form.propertyId || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ownership">Ownership</Label>
              <Input
                id="ownership"
                type="text"
                name="ownership"
                value={form.ownership || ""}
                onChange={handleFormChange}
                placeholder="Freehold, Leasehold, Condo"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="floor">Floor</Label>
              <Input
                id="floor"
                type="number"
                name="floor"
                value={form.floor || ""}
                onChange={handleFormChange}
                min="0"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="totalFloors">Total Floors</Label>
              <Input
                id="totalFloors"
                type="number"
                name="totalFloors"
                value={form.totalFloors || ""}
                onChange={handleFormChange}
                min="1"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="maintenance">Maintenance</Label>
              <Input
                id="maintenance"
                type="text"
                name="maintenance"
                value={form.maintenance || ""}
                onChange={handleFormChange}
                placeholder="$200/mo"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="age">Property Age</Label>
              <Input
                id="age"
                type="text"
                name="age"
                value={form.age || ""}
                onChange={handleFormChange}
                placeholder="5 years"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="amenities">Amenities (comma separated)</Label>
              <Input
                id="amenities"
                type="text"
                name="amenities"
                value={form.amenities || ""}
                onChange={handleFormChange}
                placeholder="Swimming Pool, Gym, Park"
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="brochure">Brochure (PDF)</Label>
            <Input
              id="brochure"
              type="file"
              name="brochure"
              accept="application/pdf"
              onChange={(e) =>
                setForm({ ...form, brochure: e.target.files[0] })
              }
            />
            {form.brochure && (
              <span className="text-xs">{form.brochure.name}</span>
            )}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="agentName">Agent Name (optional)</Label>
              <Input
                id="agentName"
                type="text"
                name="agentName"
                value={form.agentName || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agentPhone">Agent Phone (optional)</Label>
              <Input
                id="agentPhone"
                type="text"
                name="agentPhone"
                value={form.agentPhone || ""}
                onChange={handleFormChange}
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <Label htmlFor="agentEmail">Agent Email (optional)</Label>
              <Input
                id="agentEmail"
                type="email"
                name="agentEmail"
                value={form.agentEmail || ""}
                onChange={handleFormChange}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="agentPhoto">Agent Photo (optional)</Label>
              <Input
                id="agentPhoto"
                type="file"
                name="agentPhoto"
                accept="image/*"
                onChange={(e) =>
                  setForm({ ...form, agentPhoto: e.target.files[0] })
                }
              />
              {form.agentPhoto && (
                <span className="text-xs">{form.agentPhoto.name}</span>
              )}
            </div>
          </div>

          {formError && (
            <div className="text-destructive text-sm">{formError}</div>
          )}

          <div className="flex justify-end gap-2 mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={onCancel}
              disabled={formLoading}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={formLoading}>
              {formLoading
                ? editMode
                  ? "Saving..."
                  : "Adding..."
                : editMode
                ? "Save Changes"
                : "Add Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
