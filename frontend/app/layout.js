import "./globals.css"

export const metadata = {
  title: "RealEstate Hub",
  description: "Find your dream property",
    generator: 'v0.dev'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  )
}
