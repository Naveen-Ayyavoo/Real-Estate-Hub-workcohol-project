'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Home, Heart, MessageSquare, Settings, LogOut, Plus, BarChart3, List, Menu, X } from 'lucide-react'

const DashboardSidebar = ({ userType = 'buyer' }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  const buyerLinks = [
    { href: '/buyer', label: 'Dashboard', icon: Home },
    { href: '/buyer/saved', label: 'Saved Properties', icon: Heart },
    { href: '/buyer/messages', label: 'Messages', icon: MessageSquare },
    { href: '/buyer/settings', label: 'Profile Settings', icon: Settings },
  ]

  const sellerLinks = [
    { href: '/seller', label: 'Dashboard', icon: Home },
    { href: '/seller/listings', label: 'My Listings', icon: List },
    { href: '/seller/add-property', label: 'Add Property', icon: Plus },
    { href: '/seller/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/seller/messages', label: 'Messages', icon: MessageSquare },
    { href: '/seller/settings', label: 'Profile Settings', icon: Settings },
  ]

  const links = userType === 'seller' ? sellerLinks : buyerLinks

  const isActive = (href) => pathname === href

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 bg-white rounded-lg shadow-lg"
      >
        {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Overlay */}
      {isOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-40 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">
              RealEstate Pro
            </h2>
            <p className="text-sm text-gray-600 capitalize">{userType} Dashboard</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {links.map((link) => {
              const Icon = link.icon
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-3 rounded-xl transition-colors
                    ${isActive(link.href)
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-50'
                    }
                  `}
                >
                  <Icon className="w-5 h-5" />
                  {link.label}
                </Link>
              )
            })}
          </nav>

          {/* Logout */}
          <div className="p-4 border-t border-gray-200">
            <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-xl transition-colors w-full">
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

export default DashboardSidebar