import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

export default function SellerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-r from-green-600 to-teal-600 text-white p-4">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="House with 'Sold' sign"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">Sell Your Property for the Best Value</h1>
          <p className="text-lg md:text-xl opacity-90">
            Get maximum exposure, expert valuation, and a smooth selling experience from start to finish.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#" passHref>
              <Button className="px-8 py-3 text-lg font-semibold bg-white text-green-600 hover:bg-gray-100">
                Get a Free Valuation
              </Button>
            </Link>
            <Link href="#" passHref>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-green-600 bg-transparent"
              >
                List Your Home
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <main className="flex-1 py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Our Selling Process</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We make selling your home simple, transparent, and highly effective.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Market Analysis</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Receive a detailed market analysis to price your home competitively and accurately.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Professional Marketing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Benefit from high-quality photos, virtual tours, and targeted advertising campaigns.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Negotiation & Closing</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our agents handle negotiations and guide you through all the paperwork until closing.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Sell Your Home?</h2>
          <p className="text-lg text-gray-600 mb-8">Let's get your property sold quickly and for the best price.</p>
          <Link href="#" passHref>
            <Button className="px-10 py-4 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              Start Selling Now
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
