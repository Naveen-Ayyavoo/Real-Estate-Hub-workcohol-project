"use client"
import { useEffect, useState } from "react"
import AuthGuard from "@/components/AuthGuard"

function ProfilePageContent() {
  const [profile, setProfile] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [form, setForm] = useState({})

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true)
      setError("")
      try {
        const token = localStorage.getItem("access_token")
        const res = await fetch("/api/profile/", {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (data.success || data.status === "success") {
          setProfile(data.data)
          setForm(data.data)
        } else {
          setError(data.message || "Failed to fetch profile")
        }
      } catch (e) {
        setError("Failed to fetch profile")
      }
      setLoading(false)
    }
    fetchProfile()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")
    setSuccess("")
    try {
      const token = localStorage.getItem("access_token")
      const res = await fetch("/api/profile/", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      })
      const data = await res.json()
      if (data.success || data.status === "success") {
        setSuccess("Profile updated successfully!")
        setProfile(data.data)
      } else {
        setError(data.message || "Failed to update profile")
      }
    } catch (e) {
      setError("Failed to update profile")
    }
  }

  if (loading) return <div className="p-8">Loading...</div>
  if (error) return <div className="p-8 text-red-600">{error}</div>

  return (
    <AuthGuard>
    <div className="max-w-xl mx-auto p-8">
      <h1 className="text-2xl font-bold mb-6">My Profile</h1>
      {success && <div className="mb-4 text-green-600">{success}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Full Name</label>
          <input
            type="text"
            name="full_name"
            value={form.full_name || ""}
            onChange={handleChange}
            className="w-full border px-3 py-2 rounded"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Email</label>
          <input
            type="email"
            name="email"
            value={form.email || ""}
            disabled
            className="w-full border px-3 py-2 rounded bg-gray-100"
          />
        </div>
        {profile && profile.user_type === "seller" && (
          <>
            <div>
              <label className="block mb-1 font-medium">Agency Name</label>
              <input
                type="text"
                name="agency_name"
                value={form.agency_name || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block mb-1 font-medium">License Number</label>
              <input
                type="text"
                name="license_number"
                value={form.license_number || ""}
                onChange={handleChange}
                className="w-full border px-3 py-2 rounded"
              />
            </div>
          </>
        )}
        {profile && profile.user_type === "buyer" && (
          <div>
            <label className="block mb-1 font-medium">Preferences</label>
            <textarea
              name="preferences"
              value={form.preferences || ""}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded"
            />
          </div>
        )}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 font-medium"
        >
          Save Changes
        </button>
      </form>
    </div>
    </AuthGuard>
  )
}

export default ProfilePageContent;