'use client'
import { useState } from 'react'
import { Heart, MapPin, Bed, Bath, Square } from 'lucide-react'
import Image from 'next/image'

const PropertyCard = ({ property, showSaveButton = true, onSave, onEdit, onDelete, onView }) => {
  const [isSaved, setIsSaved] = useState(property.isSaved || false)

  const handleSave = () => {
    setIsSaved(!isSaved)
    if (onSave) onSave(property.id, !isSaved)
  }

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Image Container */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={property.image || '/hero-house.jpg'}
          alt={property.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        {/* Tags */}
        <div className="absolute top-3 left-3 flex gap-2">
          {property.tags?.map((tag, index) => (
            <span
              key={index}
              className={`px-2 py-1 text-xs font-semibold rounded-full ${
                tag === 'New' ? 'bg-green-500 text-white' :
                tag === 'Hot' ? 'bg-red-500 text-white' :
                tag === 'Verified' ? 'bg-blue-500 text-white' :
                'bg-gray-800 text-white'
              }`}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Save Button */}
        {showSaveButton && (
          <button
            onClick={handleSave}
            className="absolute top-3 right-3 p-2 bg-white/90 hover:bg-white rounded-full transition-colors"
            aria-label={isSaved ? 'Remove from saved' : 'Save property'}
          >
            <Heart
              className={`w-4 h-4 ${
                isSaved ? 'fill-red-500 text-red-500' : 'text-gray-600'
              }`}
            />
          </button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
            {property.title}
          </h3>
          <span className="text-xl font-bold text-blue-600">
            {formatPrice(property.price)}
          </span>
        </div>

        <div className="flex items-center text-gray-600 mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span className="text-sm line-clamp-1">{property.location}</span>
        </div>

        {/* Property Details */}
        <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
          {property.bedrooms && (
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              <span>{property.bedrooms} bed</span>
            </div>
          )}
          {property.bathrooms && (
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              <span>{property.bathrooms} bath</span>
            </div>
          )}
          {property.area && (
            <div className="flex items-center">
              <Square className="w-4 h-4 mr-1" />
              <span>{property.area} sqft</span>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {onView && (
            <button
              onClick={() => onView(property.id)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-xl font-medium transition-colors"
            >
              View Details
            </button>
          )}
          {onEdit && (
            <button
              onClick={() => onEdit(property.id)}
              className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-700 py-2 px-4 rounded-xl font-medium transition-colors"
            >
              Edit
            </button>
          )}
          {onDelete && (
            <button
              onClick={() => onDelete(property.id)}
              className="px-4 py-2 bg-red-100 hover:bg-red-200 text-red-600 rounded-xl font-medium transition-colors"
            >
              Delete
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

export default PropertyCard