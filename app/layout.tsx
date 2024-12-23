import type { Metadata } from "next";
import "./globals.css";
import Navbar from "./components/Navbar";
import { DiamondProvider } from "./components/DiamondContext";


export const metadata: Metadata = {
  title: "RAWG games app",
  description: "Top game creators and influencers. It allows users to explore their profiles,",
};


export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100">
        <DiamondProvider>
          <Navbar />
          <main>{children}</main>
        </DiamondProvider>
      </body>
    </html>
  )
}
