import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import { AuthProvider } from "@/context/AuthContext";
import { Toaster } from "react-hot-toast";


const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Nusava - Real Estate Platform Indonesia",
  description: "Platform real estate terpercaya untuk jual beli dan sewa properti di Indonesia. Temukan rumah, apartemen, villa, dan properti impian Anda.",
  keywords: "real estate, properti, rumah, apartemen, villa, tanah, Indonesia, jual beli properti",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="light" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased`}>
        <AuthProvider>
          <Toaster position="bottom-right" />
          <SmoothScroll>
            <Navbar />
            <main className="min-h-screen">
              {children}
            </main>
            <Footer />
          </SmoothScroll>
        </AuthProvider>
      </body>
    </html>

  );
}
