import Link from "next/link"
import Image from "next/image"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Header from "@/components/ui/header"
import Footer from "@/components/ui/footer"

export default function BuyerPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <Header />

      {/* Hero Section */}
      <section className="relative w-full h-[500px] flex items-center justify-center text-center bg-gradient-to-r from-blue-600 to-purple-600 text-white p-4">
        <Image
          src="/placeholder.svg?height=600&width=1200"
          alt="Modern home interior"
          layout="fill"
          objectFit="cover"
          className="absolute inset-0 z-0 opacity-30"
        />
        <div className="relative z-10 max-w-4xl mx-auto space-y-6">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Your Journey to the Perfect Home Starts Here
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Discover thousands of listings, get personalized recommendations, and connect with expert agents.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="#" passHref>
              <Button className="px-8 py-3 text-lg font-semibold bg-white text-blue-600 hover:bg-gray-100">
                Explore Properties
              </Button>
            </Link>
            <Link href="#" passHref>
              <Button
                variant="outline"
                className="px-8 py-3 text-lg font-semibold border-2 border-white text-white hover:bg-white hover:text-blue-600 bg-transparent"
              >
                Get Pre-Approved
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Article Section */}
      <main className="flex-1 py-12 px-4 md:px-8 max-w-6xl mx-auto">
        <section className="mb-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">How We Help Buyers</h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            We simplify the home-buying process, providing you with the tools and support you need every step of the
            way.
          </p>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Extensive Listings</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Access a comprehensive database of homes for sale, updated daily with new properties.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Personalized Matches</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Our smart algorithms match you with homes that fit your criteria and lifestyle.
              </p>
            </CardContent>
          </Card>
          <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-800">Expert Guidance</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600">
                Connect with experienced real estate agents who can guide you through negotiations and paperwork.
              </p>
            </CardContent>
          </Card>
        </div>

        <section className="mt-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Ready to Find Your Home?</h2>
          <p className="text-lg text-gray-600 mb-8">Take the first step towards owning your dream home.</p>
          <Link href="#" passHref>
            <Button className="px-10 py-4 text-xl font-bold bg-primary text-primary-foreground hover:bg-primary/90">
              Start Your Search
            </Button>
          </Link>
        </section>
      </main>

      <Footer />
    </div>
  )
}
