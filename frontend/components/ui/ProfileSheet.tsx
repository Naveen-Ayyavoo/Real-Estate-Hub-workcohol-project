"use client";
import React, { useEffect, useState, useRef, ChangeEvent, FormEvent } from "react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetClose,
} from "./sheet";
import { toast } from "sonner";

interface UserProfile {
  first_name: string;
  last_name: string;
  phone: string;
  address: string;
  profile_image?: File | string | null;
  alternative_number: string;
  date_of_birth: string;
  gender: "Male" | "Female" | "Other" | "";
}

interface ProfileSheetProps {
  userType: "buyer" | "seller";
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
}

const fetchProfile = async (userType: "buyer" | "seller"): Promise<UserProfile> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No authentication token found");

  const apiUrl = userType === "buyer" ? "/api/buyer/profile/" : "/api/seller/profile/";

  const response = await fetch(apiUrl, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) throw new Error("Failed to fetch profile");

  const data = await response.json();
  let profile = data.data || {};

  if (profile.user) profile = { ...profile, ...profile.user };

  return {
    first_name: profile.first_name || "",
    last_name: profile.last_name || "",
    phone: profile.phone || "",
    address: profile.address || "",
    alternative_number: profile.alternative_number || "",
    date_of_birth: profile.date_of_birth || "",
    gender: profile.gender || "",
    profile_image: profile.profile_image || null,
  };
};

const updateProfile = async (
  userType: "buyer" | "seller",
  profileData: UserProfile
): Promise<UserProfile> => {
  const token = localStorage.getItem("access_token");
  if (!token) throw new Error("No authentication token found");

  const apiUrl = userType === "buyer" ? "/api/buyer/profile/" : "/api/seller/profile/";

  const formData = new FormData();
  Object.entries(profileData).forEach(([key, value]) => {
    if (value !== undefined && value !== null) {
      formData.append(key, value instanceof File ? value : String(value));
    }
  });

  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: { Authorization: `Bearer ${token}` },
    body: formData,
  });

  if (!response.ok) throw new Error("Failed to update profile");

  const data = await response.json();
  let updated = data.data || {};

  if (updated.user) updated = { ...updated, ...updated.user };

  return {
    first_name: updated.first_name || "",
    last_name: updated.last_name || "",
    phone: updated.phone || "",
    address: updated.address || "",
    alternative_number: updated.alternative_number || "",
    date_of_birth: updated.date_of_birth || "",
    gender: updated.gender || "",
    profile_image: updated.profile_image || null,
  };
};

export default function ProfileSheet({ userType, open, onOpenChange, trigger }: ProfileSheetProps) {
  const [profile, setProfile] = useState<UserProfile>({
    first_name: "",
    last_name: "",
    phone: "",
    address: "",
    alternative_number: "",
    date_of_birth: "",
    gender: "",
  });
  const [loading, setLoading] = useState(false);
  const [preview, setPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!open) return;
    setLoading(true);
    fetchProfile(userType)
      .then((data) => {
        setProfile(data);
        if (typeof data.profile_image === "string") {
          setPreview(data.profile_image);
        }
      })
      .catch((err) => toast.error(err.message))
      .finally(() => setLoading(false));
  }, [open, userType]);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setProfile((prev) => ({ ...prev, profile_image: file }));
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updated = await updateProfile(userType, profile);
      setProfile(updated);
      if (typeof updated.profile_image === "string") {
        setPreview(updated.profile_image);
      }
      toast.success("Profile updated successfully!");
      onOpenChange(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      {trigger && <SheetTrigger asChild>{trigger}</SheetTrigger>}
      <SheetContent side="right" className="max-w-xl w-full flex flex-col p-0">
        <SheetHeader className="p-4">
          <SheetTitle>Profile Details</SheetTitle>
        </SheetHeader>
        {loading ? (
          <div className="p-8">Loading...</div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex-1 overflow-y-auto space-y-4 p-4"
            encType="multipart/form-data"
          >
            <div className="flex flex-col items-center mb-4">
              <div className="w-24 h-24 rounded-full bg-gray-200 overflow-hidden mb-2">
                {preview ? (
                  <img src={preview} alt="Profile" className="object-cover w-full h-full" />
                ) : (
                  <span className="text-gray-400 flex items-center justify-center h-full">
                    No Image
                  </span>
                )}
              </div>
              <input
                type="file"
                accept="image/*"
                name="profile_image"
                ref={fileInputRef}
                onChange={handleFileChange}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-blue-600 hover:underline text-sm"
              >
                Change Profile Picture
              </button>
            </div>

            {[
              { name: "first_name", label: "First Name" },
              { name: "last_name", label: "Last Name" },
              { name: "phone", label: "Phone Number" },
              { name: "alternative_number", label: "Alternative Number" },
              { name: "date_of_birth", label: "Date of Birth", type: "date" },
              { name: "address", label: "Address" },
            ].map(({ name, label, type = "text" }) => (
              <div key={name}>
                <label className="block mb-1 font-medium">{label}</label>
                <input
                  type={type}
                  name={name}
                  value={profile[name as keyof UserProfile] as string}
                  onChange={handleChange}
                  className="w-full border px-3 py-2 rounded"
                />
              </div>
            ))}

            <div>
              <label className="block mb-1 font-medium">Gender</label>
              <select
                name="gender"
                value={profile.gender}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium disabled:opacity-50"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        )}
        <SheetClose asChild>
          <button className="absolute right-4 top-4 text-gray-400 hover:text-gray-600">
            <span className="sr-only">Close</span>
          </button>
        </SheetClose>
      </SheetContent>
    </Sheet>
  );
}
