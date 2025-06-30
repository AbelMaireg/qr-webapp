"use client"

import type React from "react"

import { useEffect } from "react"

interface GoogleAdsenseProps {
  adSlot: string
  adFormat?: string
  fullWidthResponsive?: boolean
  style?: React.CSSProperties
}

export function GoogleAdsense({
  adSlot,
  adFormat = "auto",
  fullWidthResponsive = true,
  style = { display: "block" },
}: GoogleAdsenseProps) {
  const publisherId = process.env.NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID

  useEffect(() => {
    if (!publisherId) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Google AdSense Publisher ID not found. Please set NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID in your environment variables.",
        )
      }
      return
    }

    try {
      // @ts-ignore
      ; (window.adsbygoogle = window.adsbygoogle || []).push({})
    } catch (err) {
      console.error("AdSense error:", err)
    }
  }, [publisherId])

  // Don't render ads if publisher ID is not set
  if (!publisherId) {
    return (
      <div
        style={style}
        className="flex items-center justify-center bg-gray-100 border-2 border-dashed border-gray-300 rounded-lg"
      >
        <div className="text-center p-4">
          <p className="text-gray-500 text-sm">
            {process.env.NODE_ENV === "development" ? "AdSense Publisher ID not configured" : "Advertisement"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ins
      className="adsbygoogle"
      style={style}
      data-ad-client={publisherId}
      data-ad-slot={adSlot}
      data-ad-format={adFormat}
      data-full-width-responsive={fullWidthResponsive}
    />
  )
}

// Component for the feature section replacement
export function FeatureSectionAds() {
  return (
    <div className="mt-12 max-w-7xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Sponsored</h2>
        <p className="text-gray-600">Support our free QR code generator</p>
      </div>

      {/* Large banner ad */}
      <div className="mb-8">
        <GoogleAdsense
          adSlot="1234567890"
          style={{
            display: "block",
            textAlign: "center",
            minHeight: "250px",
            backgroundColor: "#f8f9fa",
            border: "1px solid #e9ecef",
            borderRadius: "8px",
          }}
        />
      </div>

      {/* Grid of smaller ads */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <GoogleAdsense
            adSlot="2345678901"
            style={{
              display: "block",
              minHeight: "200px",
              textAlign: "center",
            }}
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
          <GoogleAdsense
            adSlot="3456789012"
            style={{
              display: "block",
              minHeight: "200px",
              textAlign: "center",
            }}
          />
        </div>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 md:col-span-2 lg:col-span-1">
          <GoogleAdsense
            adSlot="4567890123"
            style={{
              display: "block",
              minHeight: "200px",
              textAlign: "center",
            }}
          />
        </div>
      </div>
    </div>
  )
}
