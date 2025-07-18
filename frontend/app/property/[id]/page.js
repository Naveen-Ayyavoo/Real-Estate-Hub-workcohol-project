"use client";

import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import MiniImageCarousel from "@/components/ui/MiniImageCarousel";

// Static demo properties with rich details
const demoProperties = [
  {
    id: "1",
    title: "Luxury 4-Bedroom House in Miami, FL",
    images: [
      "/property_images/img 1.jpg",
      "/property_images/img 2.jpg",
      "/property_images/img 3.jpg",
    ],
    price: "$1,200,000",
    location: "Miami, FL",
    mapEmbed:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3582.123456789!2d-80.1917906849731!3d25.7616799836267!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x88d9b7e8b8b8b8b8%3A0x8b8b8b8b8b8b8b8b!2sMiami%2C%20FL!5e0!3m2!1sen!2sus!4v1680000000000!5m2!1sen!2sus",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,850 sqft",
    pricePerSqft: "$421/sqft",
    property_type: "Villa",
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
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Modern Miami Mansion Tour
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
        image: "/media/profiles/bedroom_1.jpg",
        title: "Modern Villa, Beverly Hills",
        price: "$2,500,000",
      },
      {
        id: 3,
        image: "/media/profiles/bathroom_2.jpg",
        title: "Austin Family Home",
        price: "$850,000",
      },
    ],
  },
  {
    id: "2",
    title: "Modern Villa in Beverly Hills, CA",
    images: ["/property_images/img 4.jpg", "/property_images/img 5.jpg"],
    price: "$2,500,000",
    location: "Beverly Hills, CA",
    mapEmbed: "https://www.google.com/maps?q=Beverly+Hills,+CA&output=embed",
    bedrooms: 5,
    bathrooms: 4,
    area: "3,500 sqft",
    property_type: "Villa",
    yearBuilt: 2020,
    parking: 3,
    facing: "West",
    furnishing: "Semi-Furnished",
    propertyId: "BH-002",
    ownership: "Leasehold",
    floor: 2,
    totalFloors: 2,
    maintenance: "$300/mo",
    age: "3 years",
    description:
      "A modern villa with a beautiful garden, smart home features, and a rooftop terrace. Located in the heart of Beverly Hills.",
    amenities: [
      { icon: "🏊", label: "Swimming Pool" },
      { icon: "🏋️", label: "Gym Nearby" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Beverly Hills Luxury Home Tour
    agent: {
      name: "Jane Smith",
      phone: "555-5678",
      email: "jane@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.8,
      totalListings: 20,
      whatsapp: "https://wa.me/15555678",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 1,
        image: "/property_images/hero-house.jpg",
        title: "Luxury 4-Bedroom House in Miami, FL",
        price: "$1,200,000",
      },
    ],
  },
  {
    id: "3",
    title: "Cozy Family Home in Austin, TX",
    images: ["/property_images/img 6.jpg", "/property_images/img 7.jpg"],
    price: "$850,000",
    location: "Austin, TX",
    mapEmbed: "https://www.google.com/maps?q=Austin,+TX&output=embed",
    bedrooms: 3,
    bathrooms: 2,
    area: "2,100 sqft",
    property_type: "House",
    yearBuilt: 2015,
    parking: 2,
    facing: "South",
    furnishing: "Unfurnished",
    propertyId: "AUS-003",
    ownership: "Freehold",
    floor: 1,
    totalFloors: 1,
    maintenance: "$150/mo",
    age: "8 years",
    description:
      "A cozy family home with a spacious backyard, modern kitchen, and close to top schools. Perfect for growing families.",
    amenities: [
      { icon: "🏫", label: "Top Schools Nearby" },
      { icon: "🌳", label: "Parks & Trails" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Austin Family Home Tour
    agent: {
      name: "Emily Clark",
      phone: "555-9012",
      email: "emily@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.7,
      totalListings: 8,
      whatsapp: "https://wa.me/15559012",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 1,
        image: "/property_images/hero-house.jpg",
        title: "Luxury 4-Bedroom House in Miami, FL",
        price: "$1,200,000",
      },
    ],
  },
  {
    id: "4",
    title: "Chic Apartment in New York, NY",
    images: ["/property_images/img 8.jpg", "/property_images/img 9.jpg"],
    price: "$3,200,000",
    location: "New York, NY",
    mapEmbed: "https://www.google.com/maps?q=New+York,+NY&output=embed",
    bedrooms: 2,
    bathrooms: 2,
    area: "1,800 sqft",
    property_type: "Apartment",
    yearBuilt: 2019,
    parking: 1,
    facing: "North",
    furnishing: "Furnished",
    propertyId: "NY-004",
    ownership: "Condo",
    floor: 10,
    totalFloors: 20,
    maintenance: "$500/mo",
    age: "4 years",
    description:
      "A chic apartment with skyline views, luxury amenities, and 24/7 concierge. Located in the heart of Manhattan.",
    amenities: [
      { icon: "🏙️", label: "City View" },
      { icon: "🛗", label: "Elevator" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // NYC Apartment Tour
    agent: {
      name: "Michael Lee",
      phone: "555-3456",
      email: "michael@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.9,
      totalListings: 15,
      whatsapp: "https://wa.me/15553456",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 2,
        image: "/media/profiles/bedroom_1.jpg",
        title: "Modern Villa, Beverly Hills",
        price: "$2,500,000",
      },
    ],
  },
  {
    id: "5",
    title: "Beachfront Mansion in Malibu, CA",
    images: ["/property_images/img 10.jpg", "/property_images/img 11.jpg"],
    price: "$5,500,000",
    location: "Malibu, CA",
    mapEmbed: "https://www.google.com/maps?q=Malibu,+CA&output=embed",
    bedrooms: 4,
    bathrooms: 5,
    area: "4,200 sqft",
    property_type: "Mansion",
    yearBuilt: 2017,
    parking: 4,
    facing: "West",
    furnishing: "Furnished",
    propertyId: "MAL-005",
    ownership: "Freehold",
    floor: 2,
    totalFloors: 2,
    maintenance: "$800/mo",
    age: "6 years",
    description:
      "A stunning beachfront mansion with private access to the ocean, infinity pool, and home theater. Ultimate luxury living.",
    amenities: [
      { icon: "🌊", label: "Private Beach" },
      { icon: "🎬", label: "Home Theater" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Malibu Beachfront Mansion Tour
    agent: {
      name: "Sophia Turner",
      phone: "555-7890",
      email: "sophia@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.6,
      totalListings: 10,
      whatsapp: "https://wa.me/15557890",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 4,
        image: "/media/profiles/bathroom_3.jpg",
        title: "Chic Apartment in New York, NY",
        price: "$3,200,000",
      },
    ],
  },
  {
    id: "6",
    title: "Urban Retreat in Chicago, IL",
    images: ["/property_images/img 12.jpg", "/property_images/img 13.jpg"],
    price: "$750,000",
    location: "Chicago, IL",
    mapEmbed: "https://www.google.com/maps?q=Chicago,+IL&output=embed",
    bedrooms: 3,
    bathrooms: 2,
    area: "1,900 sqft",
    property_type: "Condo",
    yearBuilt: 2016,
    parking: 2,
    facing: "East",
    furnishing: "Semi-Furnished",
    propertyId: "CHI-006",
    ownership: "Condo",
    floor: 5,
    totalFloors: 10,
    maintenance: "$250/mo",
    age: "7 years",
    description:
      "A modern condo with city views, open floor plan, and access to a fitness center. Great for young professionals.",
    amenities: [
      { icon: "🏋️", label: "Fitness Center" },
      { icon: "🚇", label: "Near Metro" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Chicago Condo Tour
    agent: {
      name: "David Kim",
      phone: "555-2345",
      email: "david@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.4,
      totalListings: 6,
      whatsapp: "https://wa.me/15552345",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 5,
        image: "/media/profiles/bathroom_2_4L0ihkx.jpg",
        title: "Beachfront Mansion in Malibu, CA",
        price: "$5,500,000",
      },
    ],
  },
  {
    id: "7",
    title: "Country Estate in Upstate, NY",
    images: ["/property_images/img 14.jpg", "/property_images/img 15.jpg"],
    price: "$1,200,000",
    location: "Upstate, NY",
    mapEmbed: "https://www.google.com/maps?q=Upstate+NY&output=embed",
    bedrooms: 4,
    bathrooms: 3,
    area: "2,800 sqft",
    property_type: "Estate",
    yearBuilt: 2012,
    parking: 3,
    facing: "South",
    furnishing: "Furnished",
    propertyId: "NY-007",
    ownership: "Freehold",
    floor: 1,
    totalFloors: 2,
    maintenance: "$180/mo",
    age: "11 years",
    description:
      "A peaceful country estate with acres of land, a barn, and a guest house. Perfect for those seeking tranquility.",
    amenities: [
      { icon: "🌳", label: "Large Garden" },
      { icon: "🐴", label: "Barn" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Upstate NY Country Estate Tour
    agent: {
      name: "Olivia Brown",
      phone: "555-6789",
      email: "olivia@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.3,
      totalListings: 5,
      whatsapp: "https://wa.me/15556789",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 6,
        image: "/property_images/hero-house.jpg",
        title: "Urban Retreat in Chicago, IL",
        price: "$750,000",
      },
    ],
  },
  {
    id: "8",
    title: "Lakefront Villa in Lake Tahoe, CA",
    images: ["/property_images/img 16.jpg", "/property_images/img 17.jpg"],
    price: "$2,800,000",
    location: "Lake Tahoe, CA",
    mapEmbed: "https://www.google.com/maps?q=Lake+Tahoe,+CA&output=embed",
    bedrooms: 5,
    bathrooms: 4,
    area: "3,600 sqft",
    property_type: "Villa",
    yearBuilt: 2014,
    parking: 3,
    facing: "North",
    furnishing: "Furnished",
    propertyId: "LT-008",
    ownership: "Leasehold",
    floor: 2,
    totalFloors: 2,
    maintenance: "$400/mo",
    age: "9 years",
    description:
      "A beautiful lakefront villa with private dock, hot tub, and panoramic water views. Ideal for vacations and entertaining.",
    amenities: [
      { icon: "🚤", label: "Private Dock" },
      { icon: "🛁", label: "Hot Tub" },
    ],
    video: "https://www.youtube.com/embed/HiKP3G-TfN0", // Lake Tahoe Villa Tour
    agent: {
      name: "Liam Wilson",
      phone: "555-4321",
      email: "liam@example.com",
      photo: "/placeholder-user.jpg",
      rating: 4.5,
      totalListings: 7,
      whatsapp: "https://wa.me/15554321",
    },
    brochure: "/placeholder.pdf",
    related: [
      {
        id: 7,
        image: "/media/profiles/bedroom_1.jpg",
        title: "Country Estate in Upstate, NY",
        price: "$1,200,000",
      },
    ],
  },
];

export default function PropertyDetailsPage({ params }) {
  const { id } = React.use(params);
  const demoProperty = demoProperties.find((p) => p.id === id);
  const [property, setProperty] = useState(demoProperty || null);
  const [loading, setLoading] = useState(!demoProperty);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (demoProperty) return;
    if (!id) return;
    setLoading(true);
    setError(null);
    fetch(`http://localhost:8000/api/properties/${id}/`)
      .then((res) => {
        if (!res.ok) throw new Error("Property not found");
        return res.json();
      })
      .then((data) => {
        setProperty(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Error fetching property");
        setLoading(false);
      });
  }, [id, demoProperty]);

  if (loading) return <div className="p-8 text-center">Loading...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!property)
    return <div className="p-8 text-center">Property not found.</div>;

  // Prepare images for carousel
  let images = [];
  if (Array.isArray(property.images) && property.images.length > 0) {
    images = property.images
      .map((img) =>
        typeof img === "string"
          ? img
          : img && img.image
          ? img.image.startsWith("http")
            ? img.image
            : `http://localhost:8000${img.image}`
          : null
      )
      .filter(Boolean);
  }
  if (images.length === 0 && property.main_image) {
    images = [property.main_image];
  }
  if (images.length === 0) {
    images = ["/placeholder.svg"];
  }

  // Render a rich detail view for demo properties
  if (demoProperty) {
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
              <MiniImageCarousel
                images={images}
                alt={property.title}
                width={400}
                height={300}
              />
            </div>
            {/* 2. Map Embed */}
            {property.mapEmbed && (
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
            )}
            {/* 3. Key Highlights */}
            <div className="flex flex-wrap gap-4 mb-4">
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                🛏️ {property.bedrooms} Beds
              </span>
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                🛁 {property.bathrooms} Baths
              </span>
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                📐 {property.area}
              </span>
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                🏷️ {property.pricePerSqft}
              </span>
              <span className="bg-blue-50 px-3 py-1 rounded-full">
                🏢 {property.property_type}
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
              <p>{property.description}</p>
            </div>
            {/* 6. Nearby Amenities */}
            {property.amenities && (
              <div className="mb-4">
                <h2 className="text-lg font-semibold mb-1">Nearby Amenities</h2>
                <div className="flex flex-wrap gap-3">
                  {property.amenities.map((a, i) => (
                    <span
                      key={i}
                      className="bg-green-50 px-3 py-1 rounded-full"
                    >
                      {a.icon} {a.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
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
            {/* 8. Related Properties */}
            {property.related && (
              <div className="mt-8">
                <h2 className="text-lg font-semibold mb-4">
                  Related Properties
                </h2>
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
            )}
          </div>
          {/* Sidebar: Contact, Agent, Brochure, Save/Share */}
          <div className="space-y-6">
            {/* 9. Agent Profile Card */}
            {property.agent && (
              <div className="bg-white rounded-lg shadow p-6 flex flex-col items-center">
                <Image
                  src={property.agent.photo}
                  alt={property.agent.name}
                  width={64}
                  height={64}
                  className="rounded-full mb-2"
                />
                <div className="font-semibold">{property.agent.name}</div>
                <div className="text-yellow-500">
                  ★ {property.agent.rating} / 5
                </div>
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
            )}
            {/* 10. Download Brochure */}
            {property.brochure && (
              <a
                href={property.brochure}
                download
                className="block w-full text-center bg-gray-100 py-2 rounded hover:bg-gray-200 font-medium"
              >
                Download Brochure (PDF)
              </a>
            )}
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
            <MiniImageCarousel
              images={images}
              alt={property.title}
              width={400}
              height={300}
            />
          </div>
          {/* 2. Key Highlights */}
          <div className="flex flex-wrap gap-4 mb-4">
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🛏️ {property.bedrooms || property.beds} Beds
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🛁 {property.bathrooms || property.baths} Baths
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              📐 {property.area || property.sqft}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              💲 {property.price}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🏢 {property.property_type}
            </span>
            <span className="bg-blue-50 px-3 py-1 rounded-full">
              🏙️ {property.city}, {property.state}
            </span>
          </div>
          {/* 3. Description */}
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-1">Description</h2>
            <p>{property.description}</p>
          </div>
        </div>
        {/* 4. Sidebar with more info */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-bold mb-4">Property Details</h2>
          <div className="mb-2">
            <strong>Title:</strong> {property.title}
          </div>
          <div className="mb-2">
            <strong>Type:</strong> {property.property_type}
          </div>
          <div className="mb-2">
            <strong>Location:</strong> {property.address || property.location}
          </div>
          <div className="mb-2">
            <strong>Price:</strong> {property.price}
          </div>
          <div className="mb-2">
            <strong>Beds:</strong> {property.bedrooms || property.beds}
          </div>
          <div className="mb-2">
            <strong>Baths:</strong> {property.bathrooms || property.baths}
          </div>
          <div className="mb-2">
            <strong>Square Feet:</strong> {property.area || property.sqft}
          </div>
          <div className="mb-2">
            <strong>Status:</strong> {property.status}
          </div>
          <div className="mb-2">
            <strong>Negotiable:</strong> {property.negotiable ? "Yes" : "No"}
          </div>
          <div className="mb-2">
            <strong>Features:</strong>{" "}
            {property.features && typeof property.features === "object"
              ? JSON.stringify(property.features)
              : property.features}
          </div>
        </div>
      </div>
    </>
  );
}
