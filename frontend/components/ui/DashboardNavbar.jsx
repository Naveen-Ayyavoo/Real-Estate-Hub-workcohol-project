import Link from "next/link";
import { Menu, ChevronLeft, Home, Search, Heart, Calendar, UserCircle, Mail } from "lucide-react";
import UserAvatar from "@/components/ui/UserAvatar";

export default function DashboardNavbar({
  sidebarOpen,
  setSidebarOpen,
  profileOpen,
  setProfileOpen,
  searchValue,
  setSearchValue,
  children,
  dashboardType = "buyer", // or "seller"
}) {
  return (
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
            <span className="ml-2 text-lg font-semibold text-gray-900">
              RealEstate Hub
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
              href={`/${dashboardType}/dashboard`}
              className="flex items-center px-4 py-2 text-white bg-blue-600 rounded-md"
            >
              <Home className="w-5 h-5 mr-3" />
              Dashboard
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Search className="w-5 h-5 mr-3" />
              Browse
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Heart className="w-5 h-5 mr-3" />
              Saved Properties
            </Link>
            <Link
              href="#"
              className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-md"
            >
              <Calendar className="w-5 h-5 mr-3" />
              Appointments
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
      <div className="flex-1 lg:ml-0">
        {/* Header */}
        <header className="bg-white shadow-sm border-b">
          <div className="flex items-center justify-between h-16 px-6">
            <div className="flex items-center">
              <button
                onClick={() => setSidebarOpen(true)}
                className="mr-4"
                aria-label="Open sidebar"
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                Home
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Search properties..."
                    className="pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchValue}
                    onChange={(e) => setSearchValue && setSearchValue(e.target.value)}
                  />
                </form>
                <Search className="w-5 h-5 text-gray-400 absolute left-3 top-2.5" />
              </div>
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Mail className="w-6 h-6" />
              </button>
              <div className="flex items-center">
                <UserAvatar size={8} />
              </div>
            </div>
          </div>
        </header>
        {children}
      </div>
    </div>
  );
} 