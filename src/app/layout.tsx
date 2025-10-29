import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@/components/global/ProgressBar";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollPopup from "@/components/global/ScrollPopup";

const jost = Jost({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Veg Restaurant in Siliguri |Veg Restaurant in SF Road",
  description:
    "Looking for a pure veg restaurant in Siliguri? Visit Varnikaa Café on SF Road for delicious vegetarian meals, cozy ambience, and family-friendly dining. Enjoy Indian, South Indian & fusion dishes made fresh daily.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${jost.className} antialiased`}>
        <ScrollPopup />
        <ProgressBar />
        <Toaster />
        <CartProvider>
          <Suspense fallback={<div></div>}>{children}</Suspense>
        </CartProvider>
        <SpeedInsights />
      </body>
    </html>
  );
}
