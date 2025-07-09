"use client"

import type React from "react"

import { useEffect, useRef } from "react"

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
  const adRef = useRef<HTMLModElement>(null)
  const isInitialized = useRef(false)

  useEffect(() => {
    if (!publisherId) {
      if (process.env.NODE_ENV === "development") {
        console.warn(
          "Google AdSense Publisher ID not found. Please set NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID in your environment variables.",
        )
      }
      return
    }

    // Only initialize if not already done and element exists
    if (!isInitialized.current && adRef.current) {
      try {
        // Check if the ad element already has content
        if (adRef.current.innerHTML.trim() === "") {
          // @ts-ignore
          ; (window.adsbygoogle = window.adsbygoogle || []).push({})
          isInitialized.current = true
        }
      } catch (err) {
        console.error("AdSense error:", err)
      }
    }

    // Cleanup function
    return () => {
      isInitialized.current = false
    }
  }, [publisherId, adSlot])

  // Don't render ads if publisher ID is not set
  if (!publisherId) {
    return (
      <div
        style={style}
        className="flex items-center justify-center bg-gray-100 dark:bg-gray-800 border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg"
      >
        <div className="text-center p-4">
          <p className="text-gray-500 dark:text-gray-400 text-sm">
            {process.env.NODE_ENV === "development" ? "AdSense Publisher ID not configured" : "Advertisement"}
          </p>
        </div>
      </div>
    )
  }

  return (
    <ins
      ref={adRef}
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
    <div className="mt-12 max-w-7xl mx-auto px-4">
      <div className="text-center mb-6">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Sponsored</h2>
        <p className="text-gray-600 dark:text-gray-300">Support our free QR code generator</p>
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

      {/* Grid of smaller ads - responsive */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <GoogleAdsense
            adSlot="2345678901"
            style={{
              display: "block",
              minHeight: "200px",
              textAlign: "center",
            }}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
          <GoogleAdsense
            adSlot="3456789012"
            style={{
              display: "block",
              minHeight: "200px",
              textAlign: "center",
            }}
          />
        </div>

        <div className="bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4 md:col-span-2 lg:col-span-1">
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
