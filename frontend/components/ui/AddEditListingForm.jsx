"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { XIcon, Bed, Bath, Ruler, CameraIcon } from "lucide-react"
import Image from "next/image"
import { useEffect, useState, useCallback } from "react"

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
}) {
  console.log('AddEditListingForm form state:', form); // DEBUG: Log form state
  // Derived state for all image previews (combining existing URLs and new files)
  const [roomImagePreviews, setRoomImagePreviews] = useState([])

  // Helper to generate room labels and keys
  const generateRoomLabels = useCallback((beds, baths) => {
    const labels = [
      { key: "living_room", label: "Living Room" },
      { key: "kitchen", label: "Kitchen" },
      { key: "dining_room", label: "Dining Room" },
      { key: "exterior", label: "Exterior" },
      { key: "other", label: "Other" },
    ]
    for (let i = 1; i <= beds; i++) {
      labels.push({ key: `bedroom_${i}`, label: `Bedroom ${i}` })
    }
    for (let i = 1; i <= baths; i++) {
      labels.push({ key: `bathroom_${i}`, label: `Bathroom ${i}` })
    }
    return labels
  }, [])

  // Clean up invalid room keys when beds/baths change
  useEffect(() => {
    const allRoomLabels = generateRoomLabels(Number(form.beds) || 0, Number(form.baths) || 0)
    const currentValidRoomKeys = new Set(allRoomLabels.map((item) => item.key))

    // Clean up selectedRoomFiles
    setSelectedRoomFiles((prevFiles) => {
      let changed = false
      const updatedFiles = {}
      for (const key in prevFiles) {
        if (currentValidRoomKeys.has(key)) {
          updatedFiles[key] = prevFiles[key]
        } else {
          changed = true
          if (prevFiles[key]) {
            URL.revokeObjectURL(URL.createObjectURL(prevFiles[key]))
          }
        }
      }
      return changed ? updatedFiles : prevFiles
    })

    // Clean up form.roomImageUrls
    setForm((prevForm) => {
      let changed = false
      const updatedUrls = {}
      for (const key in prevForm.roomImageUrls) {
        if (currentValidRoomKeys.has(key)) {
          updatedUrls[key] = prevForm.roomImageUrls[key]
        } else {
          changed = true
        }
      }
      return changed ? { ...prevForm, roomImageUrls: updatedUrls } : prevForm
    })
  }, [form.beds, form.baths, generateRoomLabels, setForm, setSelectedRoomFiles])

  // Update previews when form.roomImageUrls or selectedRoomFiles change
  useEffect(() => {
    const newPreviews = []
    const allRoomLabels = generateRoomLabels(Number(form.beds) || 0, Number(form.baths) || 0)
    allRoomLabels.forEach(({ key, label }) => {
      const newFile = selectedRoomFiles[key]
      let existingUrl = form.roomImageUrls?.[key]
      // Ensure existingUrl is a valid, absolute URL if present
      if (existingUrl && !existingUrl.startsWith('http') && existingUrl !== '/placeholder.svg') {
        existingUrl = `http://localhost:8000${existingUrl}`
      }
      if (newFile) {
        newPreviews.push({ roomKey: key, label, src: URL.createObjectURL(newFile), isNew: true })
      } else if (existingUrl && existingUrl !== '/placeholder.svg') {
        newPreviews.push({ roomKey: key, label, src: existingUrl, isNew: false })
      }
      // Only use placeholder if there is truly no image
    })
    setRoomImagePreviews(newPreviews)
    // Cleanup URLs for new files when component unmounts or dependencies change
    return () => {
      newPreviews.forEach((preview) => {
        if (preview.isNew) {
          URL.revokeObjectURL(preview.src)
        }
      })
    }
  }, [form.beds, form.baths, form.roomImageUrls, selectedRoomFiles, generateRoomLabels])

  // Handler for individual room image file input
  const handleRoomImageChange = (roomKey, event) => {
    const file = event.target.files?.[0] || null
    setSelectedRoomFiles((prev) => ({ ...prev, [roomKey]: file }))
    // If a new file is selected, clear any existing URL for this room in the form state
    if (file) {
      setForm((prevForm) => ({
        ...prevForm,
        roomImageUrls: { ...prevForm.roomImageUrls, [roomKey]: null },
      }))
    }
  }

  // Handler to remove an image from a specific room slot
  const handleRemoveRoomImage = (roomKey, isNew) => {
    if (isNew) {
      setSelectedRoomFiles((prev) => {
        const newState = { ...prev }
        if (newState[roomKey]) {
          URL.revokeObjectURL(URL.createObjectURL(newState[roomKey])) // Revoke URL for the file being removed
        }
        delete newState[roomKey]
        return newState
      })
    } else {
      setForm((prevForm) => {
        const updatedRoomImageUrls = { ...prevForm.roomImageUrls }
        delete updatedRoomImageUrls[roomKey]
        return { ...prevForm, roomImageUrls: updatedRoomImageUrls }
      })
    }
  }

  const allRoomLabels = generateRoomLabels(Number(form.beds) || 0, Number(form.baths) || 0)

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
        <CardTitle className="text-2xl font-bold">{editMode ? "Edit Property" : "Add New Property"}</CardTitle>
        <CardDescription>
          {editMode ? "Update the details of your property listing." : "Fill in the details to list a new property."}
        </CardDescription>
      </CardHeader>
      <CardContent className="max-h-[70vh] overflow-y-auto">
        <form onSubmit={handleSubmit} className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input id="title" type="text" name="title" value={form.title} onChange={handleFormChange} required />
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
              <Input id="price" type="number" name="price" value={form.price} onChange={handleFormChange} required />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="negotiable">Negotiable</Label>
              <Select
                name="negotiable"
                value={String(form.negotiable)} // Convert boolean to string for select
                onValueChange={(value) =>
                  handleFormChange({ target: { name: "negotiable", value: value === "true" } })
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

          {/* Room-Specific Images */}
          <div className="grid gap-4">
            <h3 className="text-lg font-semibold">Room Images</h3>
            <p className="text-sm text-muted-foreground">Upload images for specific rooms and areas of the property.</p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
              {allRoomLabels.map(({ key, label }) => {
                const preview = roomImagePreviews.find((p) => p.roomKey === key)
                const currentSrc = preview?.src || "/placeholder.svg"
                const isNewFile = preview?.isNew || false

                return (
                  <div
                    key={key}
                    className="relative group aspect-square rounded-md overflow-hidden border bg-muted/20 flex flex-col items-center justify-center p-2"
                  >
                    {/* Hidden file input */}
                    <input
                      id={`image-${key}`}
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleRoomImageChange(key, e)}
                      disabled={formLoading}
                      className="hidden"
                    />
                    {/* Clickable label */}
                    <label
                      htmlFor={`image-${key}`}
                      className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                      tabIndex={0}
                      aria-label={`Upload image for ${label}`}
                    >
                      {currentSrc && currentSrc !== "/placeholder.svg" ? (
                        <>
                          <Image
                            src={currentSrc}
                            alt={`${label} image`}
                            layout="fill"
                            objectFit="cover"
                            className="transition-transform duration-200 group-hover:scale-105"
                          />
                          <Button
                            type="button"
                            variant="destructive"
                            size="icon"
                            className="absolute top-1 right-1 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-20"
                            onClick={(e) => {
                              e.stopPropagation()
                              handleRemoveRoomImage(key, isNewFile)
                            }}
                          >
                            <XIcon className="h-4 w-4" />
                            <span className="sr-only">Remove image for {label}</span>
                          </Button>
                        </>
                      ) : (
                        <div className="flex flex-col items-center justify-center text-center text-muted-foreground">
                          <CameraIcon className="h-8 w-8 mb-2" />
                          <span className="text-sm font-medium">{label}</span>
                          <span className="text-xs">Click to upload</span>
                        </div>
                      )}
                    </label>
                  </div>
                )
              })}
            </div>
          </div>

          {formError && <div className="text-destructive text-sm">{formError}</div>}

          <div className="flex justify-end gap-2 mt-4">
            <Button type="button" variant="outline" onClick={onCancel} disabled={formLoading}>
              Cancel
            </Button>
            <Button type="submit" disabled={formLoading}>
              {formLoading ? (editMode ? "Saving..." : "Adding...") : editMode ? "Save Changes" : "Add Property"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
