import Link from "next/link"

export default function Footer() {
  return (
    <footer className="w-full bg-gray-800 text-white py-8 px-6 md:px-8">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-4">RealEstateApp</h3>
          <p className="text-gray-400">Your trusted partner in real estate.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <Link href="/buyer" className="text-gray-400 hover:text-white" prefetch={false}>
                Buyers
              </Link>
            </li>
            <li>
              <Link href="/seller" className="text-gray-400 hover:text-white" prefetch={false}>
                Sellers
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>
                About Us
              </Link>
            </li>
            <li>
              <Link href="#" className="text-gray-400 hover:text-white" prefetch={false}>
                Privacy Policy
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-4">Contact</h3>
          <p className="text-gray-400">123 Real Estate Blvd, City, State 12345</p>
          <p className="text-gray-400">info@realestateapp.com</p>
          <p className="text-gray-400">(123) 456-7890</p>
        </div>
      </div>
      <div className="mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
        &copy; {new Date().getFullYear()} RealEstateApp. All rights reserved.
      </div>
    </footer>
  )
}
