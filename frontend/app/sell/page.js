import Link from "next/link";

export default function SellInstructions() {
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
                RealEstate Hub
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
      <div className="max-w-3xl mx-auto bg-white p-8 rounded-lg shadow">
        {/* 1. Introduction for Sellers */}
        <h1 className="text-3xl font-bold mb-2 text-blue-700">For Sellers</h1>
        <p className="text-lg mb-6">
          Ready to sell your property? RealEstate Hub helps you list, connect
          with serious buyers, and close deals faster — all in one place.
        </p>

        {/* 2. Step-by-Step Selling Process */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Step-by-Step Selling Process
        </h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 max-w-2xl mb-6">
          <li className="mb-2">
            <span className="font-semibold">Create an Account:</span> Register
            or log in as a seller.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Complete Your Profile:</span> Add
            your name, contact info, and verification (if any).
          </li>
          <li className="mb-2">
            <span className="font-semibold">Add Property Listing:</span> Upload
            photos, enter details (location, price, type, size, etc.)
          </li>
          <li className="mb-2">
            <span className="font-semibold">Submit for Approval:</span> All
            listings are reviewed for quality & trust.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Respond to Inquiries:</span> Buyers
            will message you. Use in-app chat or contact options.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Schedule Site Visits:</span> Arrange
            safe, in-person or virtual visits.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Close the Deal:</span> Finalize
            offers and complete paperwork securely.
          </li>
        </ol>

        {/* 3. Seller Tips / Best Practices */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Seller Tips & Best Practices
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Use clear, high-resolution images of every room</li>
          <li>Write a compelling title & property description</li>
          <li>Be honest about property condition</li>
          <li>Set a realistic price based on market</li>
          <li>Respond quickly to buyer inquiries</li>
        </ul>

        {/* 4. What You Can List */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">What You Can List</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Residential (apartments, villas)</li>
          <li>Commercial spaces</li>
          <li>Plots/Land</li>
        </ul>

        {/* 5. Safety & Listing Rules */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Safety & Listing Rules
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>No fake listings — they’ll be removed</li>
          <li>Use platform tools to communicate</li>
          <li>Avoid sharing payment/personal info outside the platform</li>
        </ul>

        {/* 6. Need Help? */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">Need Help?</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>
            Visit our{" "}
            <Link href="/help" className="text-blue-600 underline">
              Help Center
            </Link>{" "}
            or use Chat Support
          </li>
          <li>
            Email:{" "}
            <a
              href="mailto:support@realestatehub.com"
              className="text-blue-600 underline"
            >
              support@realestatehub.com
            </a>
          </li>
        </ul>

        {/* 7. Call to Action */}
        <div className="flex justify-center mb-8">
          <Link
            href="/seller/dashboard"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            👉 Start Listing Your Property
          </Link>
        </div>

        {/* Workflow Instructions (original) */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Getting Started: Step-by-Step Workflow
        </h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 max-w-2xl">
          <li className="mb-2">
            Register or log in to your RealEstate Hub account.
          </li>
          <li className="mb-2">Navigate to your seller dashboard.</li>
          <li className="mb-2">
            Click on "Add New Property" and fill in all required details.
          </li>
          <li className="mb-2">Upload high-quality images of your property.</li>
          <li className="mb-2">
            Set a competitive price and provide a detailed description.
          </li>
          <li className="mb-2">Submit your listing for review and approval.</li>
          <li className="mb-2">
            Once approved, manage inquiries and offers from your dashboard.
          </li>
          <li className="mb-2">
            Communicate with potential buyers and schedule viewings.
          </li>
          <li className="mb-2">
            Complete the sale and update the property status.
          </li>
        </ol>
      </div>
    </>
  );
}
