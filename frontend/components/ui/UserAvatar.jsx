import { useEffect, useState } from "react";
import Image from "next/image";

export default function UserAvatar({ size = 8 }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const token = typeof window !== "undefined" && localStorage.getItem("access_token");
        if (!token) {
          setProfile(null);
          setLoading(false);
          return;
        }
        // Try to get from localStorage first
        const cached = localStorage.getItem("user_profile");
        if (cached) {
          setProfile(JSON.parse(cached));
          setLoading(false);
          return;
        }
        // Fallback: fetch from API
        const res = await fetch("/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        if (data.data) {
          setProfile(data.data);
          localStorage.setItem("user_profile", JSON.stringify(data.data));
        } else {
          setProfile(null);
        }
      } catch {
        setProfile(null);
      }
      setLoading(false);
    }
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className={`w-${size} h-${size} bg-gray-200 rounded-full animate-pulse`} />
    );
  }

  if (profile && profile.profile_image) {
    return (
      <Image
        src={profile.profile_image}
        alt="Profile"
        width={size * 8}
        height={size * 8}
        className={`w-${size} h-${size} rounded-full object-cover`}
      />
    );
  }

  if (profile && profile.full_name) {
    return (
      <div className={`w-${size} h-${size} bg-blue-600 rounded-full flex items-center justify-center`}>
        <span className="text-white font-semibold text-sm">
          {profile.full_name.charAt(0).toUpperCase()}
        </span>
      </div>
    );
  }

  // Not logged in or no profile
  return (
    <div className={`w-${size} h-${size} bg-gray-300 rounded-full flex items-center justify-center`}>
      <span className="text-white font-semibold text-sm">?</span>
    </div>
  );
} 