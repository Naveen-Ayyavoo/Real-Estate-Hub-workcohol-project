import "./globals.css";
import { Toaster } from "@/components/ui/toaster";

export const metadata = {
  title: "WorkSquare",
  description: "Find your dream property",
  generator: "v0.dev",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased" suppressHydrationWarning={true}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
