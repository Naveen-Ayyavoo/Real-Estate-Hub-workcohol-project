import Link from "next/link";

export default function HelpPage() {
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
        {/* 1. Quick Overview */}
        <h1 className="text-3xl font-bold mb-2 text-blue-700">How It Works</h1>
        <p className="text-lg mb-6">
          RealEstate Hub simplifies property transactions by connecting trusted
          buyers and sellers in a secure, transparent platform.
        </p>

        {/* 2. Who Can Use This Platform */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Who Can Use This Platform?
        </h2>
        <div className="mb-6 space-y-2">
          <div className="flex items-center">
            <span className="mr-2">🏠</span>
            <span className="font-medium">Buyers</span> – Search, filter, and
            connect with sellers
          </div>
          <div className="flex items-center">
            <span className="mr-2">🏗️</span>
            <span className="font-medium">Sellers</span> – List properties and
            manage inquiries
          </div>
          <div className="flex items-center">
            <span className="mr-2">🧑‍💼</span>
            <span className="font-medium">Agents</span> – Assist and manage
            listings
          </div>
        </div>

        {/* 3. Platform Features */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">Platform Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            Smart Search Filters
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            Verified Listings
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            Schedule Property Visits
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            Built-in Chat System
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            Secure Document Handling
          </div>
          <div className="flex items-center p-4 bg-blue-50 rounded-lg">
            Mobile-Friendly
          </div>
        </div>

        {/* 4. How to Get Support */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">How to Get Support</h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>
            Visit our{" "}
            <Link href="/help" className="text-blue-600 underline">
              Help Center / FAQs
            </Link>
          </li>
          <li>Contact us via live chat or support email</li>
          <li>
            Follow our{" "}
            <a href="#" className="text-blue-600 underline">
              step-by-step guides
            </a>
          </li>
        </ul>

        {/* 5. User Tips / Best Practices */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          User Tips & Best Practices
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>Complete your profile for better matching</li>
          <li>Use filters to narrow down results</li>
          <li>Always communicate within the platform</li>
        </ul>

        {/* 6. Trust & Safety Guidelines */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Trust & Safety Guidelines
        </h2>
        <ul className="list-disc list-inside mb-6 text-gray-700">
          <li>We verify all listings before publishing.</li>
          <li>User privacy is protected.</li>
          <li>No hidden charges for browsing or inquiry.</li>
        </ul>

        {/* Workflow Instructions */}
        <h2 className="text-2xl font-semibold mb-2 mt-8">
          Getting Started: Step-by-Step Workflow
        </h2>
        <ol className="list-decimal list-inside text-lg text-gray-700 max-w-2xl">
          <li className="mb-2">
            Register for a new account as a buyer or seller.
          </li>
          <li className="mb-2">
            Verify your email address to activate your account.
          </li>
          <li className="mb-2">Log in to your dashboard.</li>
          <li className="mb-2">
            If you are a seller, add your property listing with details and
            images.
          </li>
          <li className="mb-2">
            If you are a buyer, browse listings and use filters to find
            properties.
          </li>
          <li className="mb-2">
            View property details, contact sellers/agents, and schedule
            viewings.
          </li>
          <li className="mb-2">
            Negotiate, make offers, and communicate securely through the
            platform.
          </li>
          <li className="mb-2">Complete the transaction and leave feedback.</li>
          <li className="mb-2">
            For any help, revisit this page or contact our support team.
          </li>
        </ol>
      </div>
    </>
  );
}
