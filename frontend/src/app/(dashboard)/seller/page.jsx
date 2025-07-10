'use client'
import { useState } from 'react'
import { Plus, Eye, Edit, Trash2, TrendingUp, DollarSign, Home, MessageSquare, BarChart3 } from 'lucide-react'
import DashboardSidebar from '../../components/DashboardSidebar'
import DashboardTopBar from '../../components/DashboardTopBar'
import PropertyCard from '../../components/PropertyCard'

const SellerDashboard = () => {
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
      status: 'active',
      views: 45,
      inquiries: 8,
      createdAt: '2024-01-15'
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
      status: 'active',
      views: 67,
      inquiries: 12,
      createdAt: '2024-01-10'
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
      status: 'pending',
      views: 23,
      inquiries: 5,
      createdAt: '2024-01-20'
    }
  ])

  const [showAddProperty, setShowAddProperty] = useState(false)

  const analytics = {
    totalListings: properties.length,
    activeListings: properties.filter(p => p.status === 'active').length,
    totalViews: properties.reduce((sum, p) => sum + p.views, 0),
    totalInquiries: properties.reduce((sum, p) => sum + p.inquiries, 0),
    averagePrice: Math.round(properties.reduce((sum, p) => sum + p.price, 0) / properties.length)
  }

  const recentInquiries = [
    {
      id: 1,
      propertyTitle: 'Modern Family Home',
      buyerName: 'Sarah Johnson',
      message: 'Interested in scheduling a viewing this weekend.',
      time: '2 hours ago'
    },
    {
      id: 2,
      propertyTitle: 'Downtown Luxury Condo',
      buyerName: 'Mike Chen',
      message: 'What is the HOA fee for this property?',
      time: '5 hours ago'
    },
    {
      id: 3,
      propertyTitle: 'Suburban Dream House',
      buyerName: 'Emily Davis',
      message: 'Is the property still available?',
      time: '1 day ago'
    }
  ]

  const handleEditProperty = (propertyId) => {
    console.log('Edit property:', propertyId)
    // Navigate to edit form
  }

  const handleDeleteProperty = (propertyId) => {
    if (window.confirm('Are you sure you want to delete this property?')) {
      setProperties(prev => prev.filter(p => p.id !== propertyId))
    }
  }

  const handleViewProperty = (propertyId) => {
    console.log('View property:', propertyId)
    // Navigate to property details
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'bg-green-100 text-green-800'
      case 'pending':
        return 'bg-yellow-100 text-yellow-800'
      case 'sold':
        return 'bg-blue-100 text-blue-800'
      default:
        return 'bg-gray-100 text-gray-800'
    }
  }

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <DashboardSidebar userType="seller" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden lg:ml-64">
        {/* Top Bar */}
        <DashboardTopBar userName="Jane Smith" userType="seller" />

        {/* Dashboard Content */}
        <div className="flex-1 overflow-auto p-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Listings</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalListings}</p>
                </div>
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Home className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Views</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalViews}</p>
                </div>
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Inquiries</p>
                  <p className="text-2xl font-bold text-gray-900">{analytics.totalInquiries}</p>
                </div>
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <MessageSquare className="w-6 h-6 text-purple-600" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg. Price</p>
                  <p className="text-2xl font-bold text-gray-900">${analytics.averagePrice.toLocaleString()}</p>
                </div>
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              {/* Add Property Button */}
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">My Properties</h2>
                <button
                  onClick={() => setShowAddProperty(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  Add New Property
                </button>
              </div>

              {/* Properties List */}
              <div className="space-y-6">
                {properties.map((property) => (
                  <div key={property.id} className="bg-white rounded-2xl shadow-sm overflow-hidden">
                    <div className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{property.title}</h3>
                            <span className={`px-2 py-1 text-xs font-medium rounded-full capitalize ${getStatusColor(property.status)}`}>
                              {property.status}
                            </span>
                          </div>
                          <p className="text-gray-600 mb-2">{property.location}</p>
                          <p className="text-2xl font-bold text-blue-600">${property.price.toLocaleString()}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => handleViewProperty(property.id)}
                            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                            title="View Property"
                          >
                            <Eye className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleEditProperty(property.id)}
                            className="p-2 text-gray-600 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                            title="Edit Property"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProperty(property.id)}
                            className="p-2 text-gray-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                            title="Delete Property"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>

                      {/* Property Stats */}
                      <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{property.views}</p>
                          <p className="text-sm text-gray-600">Views</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">{property.inquiries}</p>
                          <p className="text-sm text-gray-600">Inquiries</p>
                        </div>
                        <div className="text-center">
                          <p className="text-2xl font-bold text-gray-900">
                            {Math.round((property.inquiries / property.views) * 100) || 0}%
                          </p>
                          <p className="text-sm text-gray-600">Conversion</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                {properties.length === 0 && (
                  <div className="text-center py-12 bg-white rounded-2xl">
                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Home className="w-8 h-8 text-gray-400" />
                    </div>
                    <h3 className="text-lg font-medium text-gray-900 mb-2">No properties listed yet</h3>
                    <p className="text-gray-600 mb-6">Start by adding your first property listing</p>
                    <button
                      onClick={() => setShowAddProperty(true)}
                      className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-colors"
                    >
                      Add Your First Property
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Performance Chart */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Performance</h3>
                  <BarChart3 className="w-5 h-5 text-gray-400" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Views this month</span>
                      <span className="font-medium">+23%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-blue-600 h-2 rounded-full" style={{ width: '75%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Inquiries</span>
                      <span className="font-medium">+15%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-green-600 h-2 rounded-full" style={{ width: '60%' }}></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Conversion rate</span>
                      <span className="font-medium">+8%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div className="bg-purple-600 h-2 rounded-full" style={{ width: '45%' }}></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Recent Inquiries */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Inquiries</h3>
                <div className="space-y-4">
                  {recentInquiries.map((inquiry) => (
                    <div key={inquiry.id} className="p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-start justify-between mb-2">
                        <p className="text-sm font-medium text-gray-900">{inquiry.buyerName}</p>
                        <p className="text-xs text-gray-500">{inquiry.time}</p>
                      </div>
                      <p className="text-xs text-gray-600 mb-1">{inquiry.propertyTitle}</p>
                      <p className="text-sm text-gray-700">{inquiry.message}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-4 text-sm text-blue-600 hover:text-blue-700 font-medium">
                  View all messages
                </button>
              </div>

              {/* Quick Actions */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => setShowAddProperty(true)}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-xl font-medium transition-colors flex items-center justify-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add Property
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors">
                    View Analytics
                  </button>
                  <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-4 rounded-xl font-medium transition-colors">
                    Export Data
                  </button>
                </div>
              </div>

              {/* Market Insights */}
              <div className="bg-white rounded-2xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">Market Insights</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Avg. Days on Market</span>
                    <span className="text-sm font-medium">32 days</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Market Trend</span>
                    <span className="text-sm font-medium text-green-600">+5.2%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-600">Competition</span>
                    <span className="text-sm font-medium">Medium</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SellerDashboard