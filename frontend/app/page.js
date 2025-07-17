"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MapPin, Building2, DollarSign, Bed, Bath, Star } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export default function HomePage() {
  const [location, setLocation] = useState("");
  const [type, setType] = useState("");
  const [price, setPrice] = useState("");
  const router = useRouter();
  const searchFormRef = useRef(null);
  const [subscriberEmail, setSubscriberEmail] = useState("");

  const featuredProperties = [
    {
      id: 1,
      image: "/placeholder.svg?height=300&width=400",
      location: "Miami, FL",
      price: "$1,200,000",
      beds: 4,
      baths: 3,
      sqft: "2,850 sqft",
    },
    {
      id: 2,
      image: "/placeholder.svg?height=300&width=400",
      location: "Beverly Hills, CA",
      price: "$2,500,000",
      beds: 5,
      baths: 4,
      sqft: "3,500 sqft",
    },
    {
      id: 3,
      image: "/placeholder.svg?height=300&width=400",
      location: "Austin, TX",
      price: "$850,000",
      beds: 3,
      baths: 2,
      sqft: "2,100 sqft",
    },
    {
      id: 4,
      image: "/placeholder.svg?height=300&width=400",
      location: "New York, NY",
      price: "$3,200,000",
      beds: 2,
      baths: 2,
      sqft: "1,800 sqft",
    },
    {
      id: 5,
      image: "/placeholder.svg?height=300&width=400",
      location: "Malibu, CA",
      price: "$5,500,000",
      beds: 4,
      baths: 5,
      sqft: "4,200 sqft",
    },
    {
      id: 6,
      image: "/placeholder.svg?height=300&width=400",
      location: "Chicago, IL",
      price: "$750,000",
      beds: 3,
      baths: 2,
      sqft: "1,900 sqft",
    },
    {
      id: 7,
      image: "/placeholder.svg?height=300&width=400",
      location: "Upstate, NY",
      price: "$1,200,000",
      beds: 4,
      baths: 3,
      sqft: "2,800 sqft",
    },
    {
      id: 8,
      image: "/placeholder.svg?height=300&width=400",
      location: "Lake Tahoe, CA",
      price: "$2,800,000",
      beds: 5,
      baths: 4,
      sqft: "3,600 sqft",
    },
  ];

  const testimonials = [
    {
      name: "Sarah J.",
      rating: 5,
      text: "WorkSquare made finding our dream home a breeze! The search filters were incredibly helpful, and the listings were always up-to-date. Highly recommend!",
    },
    {
      name: "Michael P.",
      rating: 5,
      text: "As a seller, I appreciated the intuitive dashboard and the seamless process of adding my property. My home sold faster than I expected!",
    },
    {
      name: "Emily R.",
      rating: 5,
      text: "The team at WorkSquare provided exceptional support. Their expertise helped me navigate the complex buying process with confidence.",
    },
    {
      name: "David L.",
      rating: 5,
      text: "Fantastic experience! The platform was user-friendly and the virtual tours were a game-changer. Saved us so much time!",
    },
  ];

  const handleSearch = (e) => {
    e.preventDefault();
    toast({ title: "You have to login first" });
    router.push("/login");
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:justify-between items-center h-16">
            <div className="flex items-center space-x-6">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="ml-2 text-xl font-semibold text-gray-900">
                WorkSquare
              </span>
            </div>
            {/* Centered About, Sell, Buy links */}
            <div className="hidden md:flex items-center space-x-4 justify-center flex-1">
              <Link
                href="/help"
                className="px-4 py-2 rounded-full font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors"
              >
                About
              </Link>
              <button
                type="button"
                onClick={() => {
                  toast({ title: "You have to login first" });
                  setTimeout(() => router.push("/login"), 500);
                }}
                className="px-4 py-2 rounded-full font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors"
              >
                Sell
              </button>
              <button
                type="button"
                onClick={() => {
                  toast({ title: "You have to login first" });
                  setTimeout(() => router.push("/login"), 500);
                }}
                className="px-4 py-2 rounded-full font-semibold text-blue-600 bg-blue-50 hover:bg-blue-600 hover:text-white transition-colors "
              >
                Buy
              </button>
            </div>
            <div className="flex items-center space-x-4 mt-2 md:mt-0">
              <Link href="/login" className="text-gray-700 hover:text-blue-600">
                Login
              </Link>
              <Link
                href="/register"
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
              >
                Register
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-96 md:h-[500px] bg-gray-200">
        <Image
          src="/placeholder.svg?height=500&width=1200"
          alt="Hero background"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40"></div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
          <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Find Your Dream Property
          </h1>
          <p className="text-lg md:text-xl text-white mb-8 max-w-2xl">
            Explore the finest properties and connect with trusted experts.
          </p>

          {/* Search Form */}
          <form
            ref={searchFormRef}
            onSubmit={handleSearch}
            className="bg-white rounded-lg p-6 shadow-lg w-full max-w-4xl"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="flex items-center border rounded-md px-3 py-2">
                <MapPin className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full outline-none"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="flex items-center border rounded-md px-3 py-2">
                <Building2 className="w-5 h-5 text-gray-400 mr-2" />
                <select
                  className="w-full outline-none bg-transparent"
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  <option>Property Type</option>
                  <option>House</option>
                  <option>Apartment</option>
                  <option>Condo</option>
                </select>
              </div>
              <div className="flex items-center border rounded-md px-3 py-2">
                <DollarSign className="w-5 h-5 text-gray-400 mr-2" />
                <input
                  type="text"
                  placeholder="Price Range"
                  className="w-full outline-none"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
              >
                Search Properties
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Featured Listings */}
      <section className="py-16 px-4 max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
          Featured Listings
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProperties.map((property) => (
            <div
              key={property.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={property.image || "/placeholder.svg"}
                alt={property.location}
                width={400}
                height={300}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="font-semibold text-gray-900 mb-1">
                  {property.location}
                </h3>
                <p className="text-2xl font-bold text-blue-600 mb-2">
                  {property.price}
                </p>
                <div className="flex items-center text-sm text-gray-600 space-x-4">
                  <span className="flex items-center">
                    <Bed className="w-4 h-4 mr-1" />
                    {property.beds} Beds
                  </span>
                  <span className="flex items-center">
                    <Bath className="w-4 h-4 mr-1" />
                    {property.baths} Baths
                  </span>
                  <span>{property.sqft}</span>
                </div>
                <Link href={`/property/${property.id}`} passHref legacyBehavior>
                  <a className="w-full mt-4 bg-gray-100 text-gray-700 py-2 rounded-md hover:bg-gray-200 transition-colors block text-center">
                    View Details
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-8">
          <Link
            href="/listings"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 font-medium"
          >
            Browse All Listings
          </Link>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Our Clients Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {testimonials.map((testimonial) => (
              <div key={testimonial.name} className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-semibold text-sm">
                      {testimonial.name.charAt(0)}
                    </span>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">
                      {testimonial.name}
                    </h4>
                    <div className="flex text-yellow-400">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-sm">{testimonial.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to Make Your Move?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Whether you're buying, selling, or just exploring, WorkSquare is
            here to guide you every step of the way.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              className="bg-blue-600 text-white px-8 py-3 rounded-md hover:bg-blue-700 font-medium"
              onClick={() => {
                if (searchFormRef.current) {
                  searchFormRef.current.scrollIntoView({ behavior: "smooth" });
                }
              }}
            >
              Start Your Search
            </button>
            <button
              className="border border-blue-600 text-blue-600 px-8 py-3 rounded-md hover:bg-blue-50 font-medium"
              onClick={() => router.push("/register")}
            >
              Register Today
            </button>
          </div>
        </div>
      </section>

      {/* Partners */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Our Trusted Partners
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-8 items-center opacity-60">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex justify-center">
                <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center">
            <div className="flex items-center justify-center mb-4">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <span className="ml-2 text-xl font-semibold">WorkSquare</span>
            </div>
            <div className="mb-8">
              <h3 className="text-lg font-semibold mb-4">
                Stay Updated with WorkSquare
              </h3>
              <div className="flex max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-2 rounded-l-md text-gray-900"
                  value={subscriberEmail}
                  onChange={(e) => setSubscriberEmail(e.target.value)}
                />
                <button
                  className="bg-blue-600 px-6 py-2 rounded-r-md hover:bg-blue-700"
                  onClick={() => {
                    if (subscriberEmail) {
                      toast({ title: "You have subscribed to WorkSquare. Stay tuned for new updates." });
                      setSubscriberEmail("");
                    } else {
                      toast({ title: "Please enter a valid email address." });
                    }
                  }}
                >
                  Subscribe
                </button>
              </div>
            </div>
            <div className="text-sm text-gray-400">
              <p>© 2023 WorkSquare.</p>
              <p className="mt-2">English</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
