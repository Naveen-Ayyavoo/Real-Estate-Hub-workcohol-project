'use client'
import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Search, Home, Users, Shield, Star, ArrowRight, CheckCircle, Phone, Mail, MapPin } from 'lucide-react'
import SearchBar from './components/SearchBar'
import PropertyCard from './components/PropertyCard'

const HomePage = () => {
  const [searchResults, setSearchResults] = useState([])

  // Sample featured properties
  const featuredProperties = [
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
    }
  ]

  const testimonials = [
    {
      id: 1,
      name: 'Sarah Johnson',
      role: 'Home Buyer',
      image: '/team.jpg',
      quote: 'Found my dream home in just 2 weeks! The platform made everything so easy and transparent.'
    },
    {
      id: 2,
      name: 'Mike Chen',
      role: 'Property Seller',
      image: '/team.jpg',
      quote: 'Sold my property 30% faster than expected. Great tools for managing listings and connecting with buyers.'
    },
    {
      id: 3,
      name: 'Emily Davis',
      role: 'First-time Buyer',
      image: '/team.jpg',
      quote: 'The step-by-step guidance helped me navigate the buying process with confidence.'
    }
  ]

  const handleSearch = (searchData) => {
    console.log('Search data:', searchData)
    // Implement search logic here
  }

  const handleSaveProperty = (propertyId, isSaved) => {
    console.log(`Property ${propertyId} ${isSaved ? 'saved' : 'unsaved'}`)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <h1 className="text-2xl font-bold text-blue-600">RealEstate Pro</h1>
            </div>
            <div className="hidden md:flex items-center space-x-8">
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Buy</Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Sell</Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">About</Link>
              <Link href="#" className="text-gray-700 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
            <div className="flex items-center space-x-4">
              <Link
                href="/login"
                className="text-gray-700 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-colors"
              >
                Get Started
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-blue-600 to-blue-800 text-white">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Find Your Perfect Home
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100">
              Discover thousands of properties or list your own with ease
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link
                href="/register?type=buyer"
                className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <Search className="w-5 h-5" />
                Find a Home
              </Link>
              <Link
                href="/register?type=seller"
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors inline-flex items-center justify-center gap-2"
              >
                <Home className="w-5 h-5" />
                List Your Property
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Search Bar */}
      <section className="relative -mt-12 z-30">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Featured Listings */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Properties
            </h2>
            <p className="text-xl text-gray-600">
              Discover our handpicked selection of premium properties
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                onSave={handleSaveProperty}
                onView={(id) => console.log('View property:', id)}
              />
            ))}
          </div>
          <div className="text-center mt-12">
            <Link
              href="/properties"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold transition-colors inline-flex items-center gap-2"
            >
              View All Properties
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              How It Works
            </h2>
            <p className="text-xl text-gray-600">
              Simple steps to find your dream home or sell your property
            </p>
          </div>

          {/* Buyer Steps */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8 text-blue-600">For Buyers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">1. Search Properties</h4>
                <p className="text-gray-600">Browse thousands of verified listings with detailed photos and information</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">2. Connect with Sellers</h4>
                <p className="text-gray-600">Message property owners directly and schedule viewings</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">3. Close the Deal</h4>
                <p className="text-gray-600">Complete your purchase with our secure transaction process</p>
              </div>
            </div>
          </div>

          {/* Seller Steps */}
          <div>
            <h3 className="text-2xl font-bold text-center mb-8 text-green-600">For Sellers</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Home className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">1. List Your Property</h4>
                <p className="text-gray-600">Create a detailed listing with photos and property information</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">2. Connect with Buyers</h4>
                <p className="text-gray-600">Receive inquiries and communicate with potential buyers</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-green-600" />
                </div>
                <h4 className="text-xl font-semibold mb-2">3. Secure Transaction</h4>
                <p className="text-gray-600">Complete the sale with our trusted and secure platform</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of satisfied buyers and sellers
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial) => (
              <div key={testimonial.id} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-700 mb-6 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <Image
                    src={testimonial.image || "/placeholder.svg"}
                    alt={testimonial.name}
                    width={48}
                    height={48}
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Get Started?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Join thousands of users who trust RealEstate Pro for their property needs
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/register?type=buyer"
              className="bg-white text-blue-600 hover:bg-gray-100 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Register as Buyer
            </Link>
            <Link
              href="/register?type=seller"
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 px-8 py-4 rounded-xl font-semibold text-lg transition-colors"
            >
              Register as Seller
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">RealEstate Pro</h3>
              <p className="text-gray-400 mb-4">
                Your trusted partner in finding the perfect home or selling your property.
              </p>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Phone className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Mail className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <MapPin className="w-5 h-5" />
                </a>
              </div>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Buyers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Search Properties</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Saved Searches</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Buying Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Mortgage Calculator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">For Sellers</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">List Property</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing Tools</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Selling Guide</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Market Analysis</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 RealEstate Pro. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default HomePage