"use client";
import { useState } from "react";
import AuthGuard from "@/components/AuthGuard";

const SECTIONS = [
  { key: "account", label: "Account & Security" },
  { key: "notifications", label: "Notifications" },
  { key: "preferences", label: "Preferences" },
  { key: "property", label: "Property Settings" },
  { key: "roles", label: "User Roles" },
  { key: "privacy", label: "Privacy & Permissions" },
  { key: "business", label: "Business Settings" },
  { key: "app", label: "App Settings" },
  { key: "support", label: "Help & Support" },
  { key: "legal", label: "Legal" },
];

function SectionContent({ section }) {
  switch (section) {
    case "account":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Account & Security</h2>
          <ul className="space-y-4">
            <li>Edit Profile (Name, Email, Phone Number, Profile Picture)</li>
            <li>Change Password</li>
            <li>Two-Factor Authentication (2FA)</li>
            <li>Linked Accounts (Google, Facebook login)</li>
            <li>Manage Devices / Active Sessions</li>
            <li>Delete Account</li>
          </ul>
        </div>
      );
    case "notifications":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Notifications</h2>
          <ul className="space-y-4">
            <li>Push Notification Preferences</li>
            <li>Email Preferences</li>
            <li>SMS Alerts Settings</li>
            <li>In-App Notification Toggle</li>
          </ul>
        </div>
      );
    case "preferences":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Preferences</h2>
          <ul className="space-y-4">
            <li>Language Selection</li>
            <li>Currency Preference</li>
            <li>Default Location / Area of Interest</li>
            <li>Property View Preferences</li>
          </ul>
        </div>
      );
    case "property":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Property Settings</h2>
          <ul className="space-y-4">
            <li>Saved Searches & Alerts</li>
            <li>Favorite Properties</li>
            <li>Hidden / Blocked Properties or Sellers</li>
            <li>Property Listing Preferences (if user is a seller)</li>
          </ul>
        </div>
      );
    case "roles":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">User Roles</h2>
          <ul className="space-y-4">
            <li>Switch Role (Buyer ↔ Seller)</li>
            <li>
              Seller Settings (property listing templates, default pricing
              rules)
            </li>
            <li>Buyer Settings (requirements/preferences)</li>
          </ul>
        </div>
      );
    case "privacy":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Privacy & Permissions</h2>
          <ul className="space-y-4">
            <li>Who can see my listings/profile</li>
            <li>Allow direct contact or not</li>
            <li>Data sharing preferences</li>
            <li>Location access toggle</li>
          </ul>
        </div>
      );
    case "business":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Business Settings</h2>
          <ul className="space-y-4">
            <li>Manage Agency Profile</li>
            <li>Add or Remove Team Members</li>
            <li>Lead Assignment Rules</li>
            <li>Business Verification</li>
          </ul>
        </div>
      );
    case "app":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">App Settings</h2>
          <ul className="space-y-4">
            <li>Theme (Light/Dark mode)</li>
            <li>Auto-update toggle</li>
            <li>Clear Cache/Data</li>
            <li>Version Info</li>
          </ul>
        </div>
      );
    case "support":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Help & Support</h2>
          <ul className="space-y-4">
            <li>FAQ / Help Center</li>
            <li>Contact Support</li>
            <li>Report a Bug</li>
            <li>App Feedback</li>
          </ul>
        </div>
      );
    case "legal":
      return (
        <div>
          <h2 className="text-xl font-bold mb-4">Legal</h2>
          <ul className="space-y-4">
            <li>Terms & Conditions</li>
            <li>Privacy Policy</li>
            <li>Licenses</li>
          </ul>
        </div>
      );
    default:
      return null;
  }
}

export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState(SECTIONS[0].key);
  return (
    <AuthGuard>
      <div className="min-h-screen flex bg-gray-50">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-6 hidden md:block">
          <nav className="space-y-2">
            {SECTIONS.map((section) => (
              <button
                key={section.key}
                className={`w-full text-left px-4 py-2 rounded-md font-medium transition-colors ${
                  activeSection === section.key
                    ? "bg-blue-600 text-white"
                    : "text-gray-700 hover:bg-gray-100"
                }`}
                onClick={() => setActiveSection(section.key)}
              >
                {section.label}
              </button>
            ))}
          </nav>
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-8">
          <SectionContent section={activeSection} />
        </main>
      </div>
    </AuthGuard>
  );
}
