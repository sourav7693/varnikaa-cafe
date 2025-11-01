import type { Metadata } from "next";
import { Jost } from "next/font/google";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import ProgressBar from "@/components/global/ProgressBar";
import { CartProvider } from "@/context/CartContext";
import { Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import ScrollPopup from "@/components/global/ScrollPopup";
import Script from "next/script";

const jost = Jost({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Veg Restaurant in Siliguri | Veg Restaurant in SF Road",
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
      <head>
        {/* Google Tag Manager (script) */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){
              w[l]=w[l]||[];
              w[l].push({'gtm.start': new Date().getTime(), event:'gtm.js'});
              var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s), dl=l!='dataLayer'?'&l='+l:'';
              j.async=true;
              j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5FTCP85P');
          `}
        </Script>
        {/* End Google Tag Manager */}
      </head>

      <body className={`${jost.className} antialiased`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5FTCP85P"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
