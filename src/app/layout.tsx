import type React from "react"
import type { Metadata } from "next"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"
import { ThemeProvider } from "@/components/theme-provider"
import Script from "next/script"

export const metadata: Metadata = {
  title: {
    default: "Advanced QR Code Generator - Free Online QR Code Maker",
    template: "%s | QR Code Generator",
  },
  description:
    "Create custom QR codes instantly with our free online generator. Add colors, gradients, logos, and shapes. Download high-quality PNG/JPG QR codes for business, marketing, and personal use.",
  keywords: [
    "QR code generator",
    "free QR code maker",
    "custom QR codes",
    "QR code with logo",
    "colored QR codes",
    "gradient QR codes",
    "business QR codes",
    "marketing QR codes",
    "URL QR code",
    "WiFi QR code",
    "contact QR code",
    "QR code design",
    "high quality QR codes",
    "download QR code",
    "online QR generator",
  ],
  authors: [{ name: "QR Code Generator Team" }],
  creator: "QR Code Generator",
  publisher: "QR Code Generator",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://qr-generator.example.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    title: "Advanced QR Code Generator - Free Online QR Code Maker",
    description:
      "Create custom QR codes instantly with our free online generator. Add colors, gradients, logos, and shapes. Download high-quality PNG/JPG QR codes.",
    siteName: "QR Code Generator",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "QR Code Generator - Create Custom QR Codes",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Advanced QR Code Generator - Free Online QR Code Maker",
    description:
      "Create custom QR codes instantly with our free online generator. Add colors, gradients, logos, and shapes.",
    images: ["/twitter-image.png"],
    creator: "@qrcodegen",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
    yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    yahoo: process.env.NEXT_PUBLIC_YAHOO_VERIFICATION,
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: "Advanced QR Code Generator",
  description:
    "Create custom QR codes instantly with our free online generator. Add colors, gradients, logos, and shapes.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://qr-generator.example.com",
  applicationCategory: "UtilityApplication",
  operatingSystem: "Web Browser",
  offers: {
    "@type": "Offer",
    price: "0",
    priceCurrency: "USD",
  },
  featureList: [
    "Custom colors and gradients",
    "Logo embedding",
    "Multiple cell shapes",
    "High-quality downloads",
    "PNG and JPG formats",
    "Error correction levels",
    "Generation history",
    "Mobile responsive",
  ],
  screenshot: "/app-screenshot.png",
  softwareVersion: "1.0.0",
  author: {
    "@type": "Organization",
    name: "QR Code Generator Team",
  },
  provider: {
    "@type": "Organization",
    name: "QR Code Generator",
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data */}
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Theme color */}
        <meta name="theme-color" content="#4f46e5" />
        <meta name="msapplication-TileColor" content="#4f46e5" />

        {/* Google AdSense - Only load if publisher ID is configured */}
        {publisherId && (
          <Script
            async
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${publisherId}`}
            crossOrigin="anonymous"
            strategy="afterInteractive"
          />
        )}

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </head>
      <body>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <main role="main">{children}</main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}

