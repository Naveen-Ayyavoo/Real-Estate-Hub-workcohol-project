import Link from "next/link";

export default function BuyInstructions() {
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
        {/* 1. Introduction for Buyers */}
        <h1 className="text-3xl font-bold mb-2 text-blue-700">For Buyers</h1>
        <p className="text-lg mb-6">
          Looking for your dream home or investment property? RealEstate Hub
          helps you explore verified listings, connect with sellers, and make
          confident decisions with ease.
        </p>

        {/* 2. Step-by-Step Buying Process */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Step-by-Step Buying Process
        </h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 max-w-2xl mb-6">
          <li className="mb-2">
            <span className="font-semibold">Create an Account:</span> Sign up or
            log in to start your property search.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Set Your Preferences:</span> Choose
            your desired location, property type, and price range.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Browse Listings:</span> Use filters
            to find the right match quickly.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Save & Shortlist:</span> Mark
            favorite listings for easy access later.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Contact Sellers:</span> Use our
            secure chat system to ask questions or request more info.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Schedule a Visit:</span> Arrange
            physical or virtual tours at your convenience.
          </li>
          <li className="mb-2">
            <span className="font-semibold">Negotiate & Finalize:</span> Make an
            offer, negotiate, and close the deal confidently.
          </li>
        </ol>

        {/* 3. Tips for Smart Buyers */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Tips for Smart Buyers
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Check property images and descriptions thoroughly</li>
          <li>Use maps to explore nearby amenities</li>
          <li>Ask for ownership and legal documents</li>
          <li>Visit during different times of day (if possible)</li>
          <li>Compare prices with similar listings</li>
        </ul>

        {/* 4. Features Built for Buyers */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Features Built for Buyers
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Advanced Search Filters</li>
          <li>Price Range Slider</li>
          <li>Property Comparison (if any)</li>
          <li>Save Listings to Favorites</li>
          <li>Secure Messaging with Sellers</li>
          <li>Verified Property Badges</li>
        </ul>

        {/* 5. Documents to Prepare */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Documents to Prepare
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Identity proof</li>
          <li>Financial pre-approval (loan eligibility)</li>
          <li>Proof of income / employment (for financing)</li>
        </ul>

        {/* 6. Safety & Trust Notes */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Safety & Trust Notes
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Avoid making payments off-platform</li>
          <li>Meet sellers in safe, public locations</li>
          <li>Use in-app messaging to keep communication secure</li>
        </ul>

        {/* 7. Need Help? */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">Need Help?</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>
            Visit our{" "}
            <Link href="/help" className="text-blue-600 underline">
              Help Center
            </Link>{" "}
            or FAQs
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

        {/* 8. Call to Action */}
        <div className="flex justify-center mb-8">
          <Link
            href="/listings"
            className="bg-blue-600 text-white px-6 py-3 rounded-full font-semibold text-lg hover:bg-blue-700 transition-colors"
          >
            👉 Start Exploring Properties
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
          <li className="mb-2">
            Browse available property listings using filters.
          </li>
          <li className="mb-2">View property details and virtual tours.</li>
          <li className="mb-2">
            Contact sellers or agents directly from the listing page.
          </li>
          <li className="mb-2">
            Schedule property viewings and ask questions.
          </li>
          <li className="mb-2">Make offers and negotiate terms.</li>
          <li className="mb-2">
            Complete the purchase process with the help of our team.
          </li>
          <li className="mb-2">
            Move into your new property and leave a review!
          </li>
        </ol>
      </div>
    </>
  );
}
