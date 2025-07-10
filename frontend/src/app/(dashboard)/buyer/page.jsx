'use client'
import { useState } from 'react'
import { Search, Filter, Heart, MapPin, Bed, Bath, Square, Bell, TrendingUp } from 'lucide-react'
import DashboardSidebar from '../../components/DashboardSidebar'
import DashboardTopBar from '../../components/DashboardTopBar'
import PropertyCard from '../../components/PropertyCard'

const BuyerDashboard = () => {
  const [properties, setProperties] = useState([
    {
      id: 1,
      title: 'Modern Family Home',
      price: 750000,
      location: 'San Francisco, CA',
      image: '/listing1.jpg',
      bedrooms: 4,
      bathrooms: 3,
      area: 2500,
      tags: ['New', 'Verified'],
      isSaved: false
    },
    {
      id: 2,
      title: 'Downtown Luxury Condo',
      price: 950000,
      location: 'New York, NY',
      image: '/listing2.jpg',
      bedrooms: 2,
      bathrooms: 2,
      area: 1800,
      tags: ['Hot', 'Verified'],
      isSaved: true
    },
    {
      id: 3,
      title: 'Suburban Dream House',
      price: 650000,
      location: 'Austin, TX',
      image: '/listing3.jpg',
      bedrooms: 5,
      bathrooms: 4,
      area: 3200,
      tags: ['New'],
      isSaved: false
    },
    {
      id: 4,
      title: 'Cozy Apartment',
      price: 450000,
      location: 'Seattle, WA',
      image: '/sale1.jpg',
      bedrooms: 2,
      bathrooms: 1,
      area: 1200,
      tags: ['Verified'],
      isSaved: true
    },
    {
      id: 5,
      title: 'Luxury Villa',
      price: 1200000,
      location: 'Miami, FL',
      image: '/sale2.jpg',
      bedrooms: 6,
      bathrooms: 5,
      area: 4500,
      tags: ['Hot', 'New'],
      isSaved: false
    },
    {
      id: 6,
      title: 'City Loft',
      price: 580000,
      location: 'Chicago, IL',
      image: '/sale3.jpg',
      bedrooms: 1,
      bathrooms: 1,
      area: 900,
      tags: ['Verified'],
      isSaved: false
    }
  ])

  const [filters, setFilters] = useState({
    search: '',
    propertyType: '',
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    location: ''
  })

  const [showFilters, setShowFilters] = useState(false)

  const notifications = [
    {
      id: 1,
      message: 'New property matching your criteria in San Francisco',
      time: '2 hours ago',
      type: 'new_match'
    },
    {
      id: 2,
      message: 'Price drop on saved property: Downtown Luxury Condo',
      time: '1 day ago',
      type: 'price_drop'
    },
    {
      id: 3,
      message: 'Seller responded to your inquiry',
      time: '2 days ago',
      type: 'message'
    }
  ]

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }))
  }

  const handleSaveProperty = (propertyId, isSaved) => {
    setProperties(prev =>
      prev.map(property =>
        property.id === propertyId
          ? { ...property, isSaved }
          : property
      )
    )
  }

  const handleViewProperty = (propertyId) => {
    console.log('View property:', propertyId)
    // Navigate to property details
  }

  // Filter properties based on current filters
  const filteredProperties = properties.filter(property => {
    if (filters.search && !property.title.toLowerCase().includes(filters.search.toLowerCase()) &&
        !property.location.toLowerCase().includes(filters.search.toLowerCase())) {
      return false
    }
    if (filters.propertyType && !property.title.toLowerCase().includes(filters.propertyType.toLowerCase())) {
      return false
    }
    if (filters.minPrice && property.price < parseInt(filters.minPrice)) {
      return false
    }
    if (filters.maxPrice && property.price > parseInt(filters.maxPrice)) {
      return false
    }
    if (filters.bedrooms && property.bedrooms < parseInt(filters.bedrooms)) {
      return false
    }
    return true
  })

  const savedProperties = properties.filter(property => property.isSaved)

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar userType="buyer" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top Bar */}
        <DashboardTopBar userName="John Doe" userType="buyer" />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Saved Properties</p>
                  <p className="text-2xl font-bold text-gray-900">{savedProperties.length}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Heart className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Property Views</p>
                  <p className="text-2xl font-bold text-gray-900">24</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">New Matches</p>
                  <p className="text-2xl font-bold text-gray-900">3</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <Bell className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Search and Filters */}
              <div className="bg-white rounded-2xl p-6 shadow-sm mb-6">
                <div className="flex flex-col sm:flex-row gap-4 mb-4">
                  <div className="flex-1 relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search properties or locations..."
                      value={filters.search}
                      onChange={(e) => handleFilterChange('search', e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </div>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-6 py-3 rounded-xl font-medium transition-colors flex items-center gap-2"
                  >
                    <Filter className="w-5 h-5" />
                    Filters
                  </button>
                </div>

                {/* Advanced Filters */}
                {showFilters && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4 border-t border-gray-200">
                    <select
                      value={filters.propertyType}
                      onChange={(e) => handleFilterChange('propertyType', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">All Types</option>
                      <option value="house">House</option>
                      <option value="apartment">Apartment</option>
                      <option value="condo">Condo</option>
                    </select>

                    <input
                      type="number"
                      placeholder="Min Price"
                      value={filters.minPrice}
                      onChange={(e) => handleFilterChange('minPrice', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <input
                      type="number"
                      placeholder="Max Price"
                      value={filters.maxPrice}
                      onChange={(e) => handleFilterChange('maxPrice', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />

                    <select
                      value={filters.bedrooms}
                      onChange={(e) => handleFilterChange('bedrooms', e.target.value)}
                      className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="">Any Bedrooms</option>
                      <option value="1">1+ Bedrooms</option>
                      <option value="2">2+ Bedrooms</option>
                      <option value="3">3+ Bedrooms</option>
                      <option value="4">4+ Bedrooms</option>
                    </select>
                  </div>
                )}
              </div>

              {/* Property Feed */}
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-bold text-gray-900">
                    Available Properties ({filteredProperties.length})
                  </h2>
                  <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option>Sort by: Newest</option>
                    <option>Sort by: Price Low to High</option>
                    <option>Sort by: Price High to Low</option>
                    <option>Sort by: Most Relevant</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredProperties.map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      onSave={handleSaveProperty}
                      onView={handleViewProperty}
                    />
                  ))}
                </div>

                {filteredProperties.length === 0 && (
                  <div className="text-center py-12">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Search className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties found</h3>
                    <p className="text-gray-600">Try adjusting your search criteria or filters</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Notifications */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Updates</h3>
                <div className="space-y-4">
                  {notifications.map((notification) => (
                    <div key={notification.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                      <div className="flex-1">
                        <p className="text-sm text-gray-900">{notification.message}</p>
                        <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Saved Properties Quick View */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Saved Properties</h3>
                <div className="space-y-3">
                  {savedProperties.slice(0, 3).map((property) => (
                    <div key={property.id} className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg flex-shrink-0"></div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate">{property.title}</p>
                        <p className="text-xs text-gray-500">${property.price.toLocaleString()}</p>
                      </div>
                    </div>
                  ))}
                </div>
                {savedProperties.length > 3 && (
                  <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                    View all saved properties
                  </button>
                )}
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors">
                    Schedule Viewing
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors">
                    Contact Agent
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors">
                    Mortgage Calculator
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BuyerDashboard