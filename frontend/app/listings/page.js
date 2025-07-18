import Link from "next/link";
import Image from "next/image";
import PropertyCard from "@/components/ui/PropertyCard";

const allProperties = [
  {
    id: 1,
    image: "/property_images/img 1.jpg",
    location: "Miami, FL",
    price: "$1,200,000",
    beds: 4,
    baths: 3,
    sqft: "2,850 sqft",
  },
  {
    id: 2,
    image: "/property_images/img 2.jpg",
    location: "Beverly Hills, CA",
    price: "$2,500,000",
    beds: 5,
    baths: 4,
    sqft: "3,500 sqft",
  },
  {
    id: 3,
    image: "/property_images/img 3.jpg",
    location: "Austin, TX",
    price: "$850,000",
    beds: 3,
    baths: 2,
    sqft: "2,100 sqft",
  },
  {
    id: 4,
    image: "/property_images/img 4.jpg",
    location: "New York, NY",
    price: "$3,200,000",
    beds: 2,
    baths: 2,
    sqft: "1,800 sqft",
  },
  {
    id: 5,
    image: "/property_images/img 5.jpg",
    location: "Malibu, CA",
    price: "$5,500,000",
    beds: 4,
    baths: 5,
    sqft: "4,200 sqft",
  },
  {
    id: 6,
    image: "/property_images/img 6.jpg",
    location: "Chicago, IL",
    price: "$750,000",
    beds: 3,
    baths: 2,
    sqft: "1,900 sqft",
  },
  {
    id: 7,
    image: "/property_images/img 7.jpg",
    location: "Upstate, NY",
    price: "$1,200,000",
    beds: 4,
    baths: 3,
    sqft: "2,800 sqft",
  },
  {
    id: 8,
    image: "/property_images/img 8.jpg",
    location: "Lake Tahoe, CA",
    price: "$2,800,000",
    beds: 5,
    baths: 4,
    sqft: "3,600 sqft",
  },
];

export default function ListingsPage() {
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
              <Link
                href="/"
                className="text-gray-700 hover:text-blue-600 font-medium"
              >
                BACK
              </Link>
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
      {/* Add your listings content below this nav */}
      <div className="min-h-screen bg-white px-4 py-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-900 mb-12">
          All Listings
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {allProperties.map((property) => (
            <PropertyCard
              key={property.id}
              id={property.id}
              images={[property.image]}
              location={property.location}
              price={property.price}
              beds={property.beds}
              baths={property.baths}
              sqft={property.sqft}
              detailsLink={`/property/${property.id}`}
            />
          ))}
        </div>
      </div>
    </>
  );
}
