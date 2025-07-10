'use client'
import { Bell, User } from 'lucide-react'

const DashboardTopBar = ({ userName = 'John Doe', userType = 'buyer' }) => {
  const getGreeting = () => {
    const hour = new Date().getHours()
    if (hour < 12) return 'Good morning'
    if (hour < 18) return 'Good afternoon'
    return 'Good evening'
  }

  return (
    <div className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        {/* Greeting */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            {getGreeting()}, {userName}!
          </h1>
          <p className="text-gray-600">
            {userType === 'buyer' 
              ? 'Ready to find your dream home?' 
              : 'Manage your property listings'
            }
          </p>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          {/* Notifications */}
          <button className="relative p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition-colors">
            <Bell className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></span>
          </button>

          {/* Profile */}
          <button className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg transition-colors">
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <span className="font-medium text-gray-900 hidden sm:block">{userName}</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default DashboardTopBar