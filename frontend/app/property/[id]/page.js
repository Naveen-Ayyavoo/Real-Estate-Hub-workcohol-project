"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useState } from "react";

const fakeProperties = [
  {
    id: "1",
    title: "Luxury 4-Bedroom House in Miami, FL",
    images: [
      "/placeholder.jpg",
      "/placeholder-user.jpg",
      "/placeholder-logo.png",
    ],
    price: "$1,200,000",
    location: "Miami, FL",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.123456789!2d-80.1917906849731!3d25.7616799836267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7e8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus",
    beds: 4,
    baths: 3,
    sqft: "2,850 sqft",
    pricePerSqft: "$421/sqft",
    propertyType: "Villa",
    yearBuilt: 2018,
    parking: 2,
    facing: "East",
    furnishing: "Furnished",
    propertyId: "MIAMI-001",
    ownership: "Freehold",
    floor: 1,
    totalFloors: 2,
    maintenance: "$200/mo",
    age: "5 years",
    description:
      "A stunning luxury home with modern amenities, a private pool, and beautiful ocean views. This property offers spacious living areas, a gourmet kitchen, and a relaxing backyard oasis. Perfect for families and entertaining guests. Enjoy the best of Miami living!",
    amenities: [
      { icon: "🏫", label: "Schools: 2 min walk" },
      { icon: "🛒", label: "Supermarket: 500m" },
      { icon: "🏥", label: "Hospital: 5 min drive" },
      { icon: "🚆", label: "Metro: 1.2 km" },
    ],
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    agent: {
      name: "John Doe",
      phone: "555-1234",
      email: "john@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.5,
      totalListings: 12,
      whatsapp: "https://wa.me/15551234",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 2,
        image: "/placeholder.jpg",
        title: "Modern Villa, Beverly Hills",
        price: "$2,500,000",
      },
      {
        id: 3,
        image: "/placeholder.jpg",
        title: "Austin Family Home",
        price: "$850,000",
      },
    ],
  },
  // ...other properties
];

export default function PropertyDetailsPage({ params }) {
  const unwrappedParams = React.use(params);
  const [showFullDesc, setShowFullDesc] = useState(false);
  const id = unwrappedParams?.id?.toString() || "1";
  const property = fakeProperties.find((p) => p.id === id) || fakeProperties[0];

  return (
    <>
      <nav className="bg-white shadow-sm border-b mb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                WorkSquare
              </span>
            </div>
            <div className="flex items-center space-x-6">
              <a
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                BACK
              </a>
              <a href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </a>
              <a
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Register
              </a>
            </div>
          </div>
        </div>
      </nav>
      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* 1. Image Gallery/Carousel */}
        <div className="md:col-span-2">
          <div className="mb-4">
            <div className="flex overflow-x-auto space-x-4">
              {property.images.map((img, idx) => (
                <Image
                  key={idx}
                  src={img}
                  alt={property.title}
                  width={400}
                  height={300}
                  className="rounded-lg object-cover"
                />
              ))}
            </div>
          </div>
          {/* 2. Map Embed */}
          <div className="mb-4">
            <iframe
              src={property.mapEmbed}
              width="100%"
              height="250"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Property Location"
              className="rounded-lg w-full"
            ></iframe>
          </div>
          {/* 3. Key Highlights */}
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🛏️ {property.beds} Beds
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🛁 {property.baths} Baths
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              📐 {property.sqft}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🏷️ {property.pricePerSqft}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🏢 {property.propertyType}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🕒 {property.yearBuilt}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🚗 {property.parking} Parking
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              💡 {property.facing}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🏠 {property.furnishing}
            </span>
          </div>
          {/* 4. Additional Info */}
          <div className="mb-4 grid grid-cols-2 gap-4">
            <div>
              <span className="font-semibold">Property ID:</span>{" "}
              {property.propertyId}
            </div>
            <div>
              <span className="font-semibold">Ownership:</span>{" "}
              {property.ownership}
            </div>
            <div>
              <span className="font-semibold">Floor:</span> {property.floor}
            </div>
            <div>
              <span className="font-semibold">Total Floors:</span>{" "}
              {property.totalFloors}
            </div>
            <div>
              <span className="font-semibold">Maintenance:</span>{" "}
              {property.maintenance}
            </div>
            <div>
              <span className="font-semibold">Property Age:</span>{" "}
              {property.age}
            </div>
          </div>
          {/* 5. Expandable Description */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            <p>
              {showFullDesc || property.description.length < 180
                ? property.description
                : property.description.slice(0, 180) + "..."}
              {property.description.length > 180 && (
                <button
                  className="ml-2 text-blue-600 underline"
                  onClick={() => setShowFullDesc((v) => !v)}
                >
                  {showFullDesc ? "Show Less" : "Read More"}
                </button>
              )}
            </p>
          </div>
          {/* 6. Nearby Amenities */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Nearby Amenities</h2>
            <div className="flex flex-wrap gap-3">
              {property.amenities.map((a, i) => (
                <span key={i} className="bg-green-50 px-3 py-1 rounded-full">
                  {a.icon} {a.label}
                </span>
              ))}
            </div>
          </div>
          {/* 7. Video Tour */}
          {property.video && (
            <div className="mb-4">
              <h2 className="text-lg font-semibold mb-1">Video Tour</h2>
              <div className="aspect-w-16 aspect-h-9 w-full rounded-lg overflow-hidden">
                <iframe
                  src={property.video}
                  title="Property Video Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-64 rounded-lg"
                ></iframe>
              </div>
            </div>
          )}
          {/* 12. Related Properties */}
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-4">Related Properties</h2>
            <div className="flex space-x-4 overflow-x-auto">
              {property.related.map((rel) => (
                <div
                  key={rel.id}
                  className="min-w-[220px] bg-white rounded-lg shadow p-2"
                >
                  <Image
                    src={rel.image}
                    alt={rel.title}
                    width={200}
                    height={120}
                    className="rounded-md object-cover"
                  />
                  <div className="mt-2 font-semibold">{rel.title}</div>
                  <div className="text-blue-600 font-bold">{rel.price}</div>
                  <Link
                    href={`/property/${rel.id}`}
                    className="text-blue-600 underline text-sm"
                  >
                    View
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
        {/* Sidebar: Contact, Agent, Brochure, Save/Share */}
        <div className="space-y-6">
          {/* 8. Contact Form */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-2">Contact Agent</h2>
            <form className="space-y-3">
              <input
                type="text"
                placeholder="Name"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="email"
                placeholder="Email"
                className="w-full border rounded px-3 py-2"
              />
              <input
                type="tel"
                placeholder="Phone"
                className="w-full border rounded px-3 py-2"
              />
              <textarea
                placeholder="Message"
                className="w-full border rounded px-3 py-2"
                rows={3}
              ></textarea>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
              >
                Send Inquiry
              </button>
            </form>
          </div>
          {/* 9. Agent Profile Card */}
          <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
            <Image
              src={property.agent.photo}
              alt={property.agent.name}
              width={64}
              height={64}
              className="rounded-full mb-2"
            />
            <div className="font-semibold">{property.agent.name}</div>
            <div className="text-yellow-500">★ {property.agent.rating} / 5</div>
            <div className="text-sm text-gray-500 mb-2">
              {property.agent.totalListings} listings
            </div>
            <a
              href={`mailto:${property.agent.email}`}
              className="text-blue-600 underline text-sm mb-1"
            >
              Email Agent
            </a>
            <a
              href={property.agent.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 underline text-sm"
            >
              WhatsApp
            </a>
          </div>
          {/* 10. Download Brochure */}
          <a
            href={property.brochure}
            download
            className="block w-full text-center bg-gray-100 py-2 rounded hover:bg-gray-200 font-medium"
          >
            Download Brochure (PDF)
          </a>
          {/* 11. Save/Share */}
          <div className="flex justify-between items-center">
            <button className="flex items-center space-x-1 text-blue-600 hover:underline">
              <span>💙</span> <span>Save</span>
            </button>
            <div className="flex space-x-2">
              <button className="text-gray-500 hover:text-blue-600">
                Share
              </button>
              <button className="text-gray-500 hover:text-blue-600">
                WhatsApp
              </button>
              <button className="text-gray-500 hover:text-blue-600">
                Email
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
