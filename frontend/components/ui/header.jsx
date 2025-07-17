import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Header() {
  return (
    <header className="w-full bg-white shadow-sm py-4 px-6 md:px-8 flex justify-between items-center">
      <Link href="/" className="text-2xl font-bold text-gray-800" prefetch={false}>
        WorkSquare
      </Link>
      <nav className="space-x-4">
        <Link href="/buyer" passHref>
          <Button variant="ghost" className="text-gray-700 hover:text-primary">
            Buyers
          </Button>
        </Link>
        <Link href="/seller" passHref>
          <Button variant="ghost" className="text-gray-700 hover:text-primary">
            Sellers
          </Button>
        </Link>
        <Link href="#" passHref>
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90">Contact Us</Button>
        </Link>
      </nav>
    </header>
  )
}
