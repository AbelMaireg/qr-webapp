"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CookieConsent } from "@/components/CookieConsent"
import { HistorySidebar } from "@/components/HistorySidebar"
import { CombinedPanel } from "@/components/CombinedPanel"
import { PreviewPanel } from "@/components/PreviewPanel"
import { FeatureSectionAds } from "@/components/GoogleAdsense"
import { AdPopup } from "@/components/AdPopup"
import { PageHeader } from "@/components/PageHeader"
import { SEOOptimizedContent } from "@/components/SEOOptimizedContent"
import { useQRGenerator } from "@/hooks/useQRGenerator"
import { useSession } from "@/hooks/useSession"
import { useState } from "react"

export default function QRGenerator() {
  const {
    text,
    setText,
    format,
    setFormat,
    isGenerating,
    showAdPopup,
    qrCodeUrl,
    foregroundColor,
    setForegroundColor,
    backgroundColor,
    setBackgroundColor,
    gradientColor,
    setGradientColor,
    gradientDirection,
    setGradientDirection,
    cellShape,
    setCellShape,
    logoFile,
    logoPreview,
    margin,
    setMargin,
    errorCorrectionLevel,
    setErrorCorrectionLevel,
    handleLogoUpload,
    generateQRCode,
    handleAdPopupContinue,
    handleAdPopupClose,
    downloadQRCode,
    removeLogo,
    loadFromHistory,
  } = useQRGenerator()

  const { sessionId, showCookieConsent, isSessionLoading, handleCookieAccept, handleCookieDecline } = useSession()

  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(false)

  return (
    <>
      {showCookieConsent && <CookieConsent onAcceptAction={handleCookieAccept} onDeclineAction={handleCookieDecline} />}

      <AdPopup isOpen={showAdPopup} onClose={handleAdPopupClose} onContinue={handleAdPopupContinue} />

      {/* History Sidebar */}
      {!isSessionLoading && (
        <HistorySidebar
          sessionId={sessionId}
          onLoadHistory={loadFromHistory}
          isOpen={isHistorySidebarOpen}
          onToggle={() => setIsHistorySidebarOpen(!isHistorySidebarOpen)}
        />
      )}

      {/* Main Content */}
      <div
        className={`min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 transition-all duration-300 ${isHistorySidebarOpen ? "lg:ml-80 xl:ml-96" : "ml-0"
          }`}
      >
        {/* Add padding to account for fixed theme toggle */}
        <div className="container mx-auto px-4 lg:px-8 pr-16">
          <PageHeader />

          {/* Session Loading State */}
          {isSessionLoading && (
            <div className="flex justify-center mb-8">
              <Card className="w-full max-w-md">
                <CardContent className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary mr-3"></div>
                  <span className="text-sm text-muted-foreground">Loading session...</span>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Main Grid - Now 2 columns instead of 3 */}
          <section
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto"
            aria-label="QR Code Generator Interface"
          >
            <div className="lg:col-span-1">
              <CombinedPanel
                text={text}
                setText={setText}
                foregroundColor={foregroundColor}
                setForegroundColor={setForegroundColor}
                backgroundColor={backgroundColor}
                setBackgroundColor={setBackgroundColor}
                gradientColor={gradientColor}
                setGradientColor={setGradientColor}
                gradientDirection={gradientDirection}
                setGradientDirection={setGradientDirection}
                cellShape={cellShape}
                setCellShape={setCellShape}
                errorCorrectionLevel={errorCorrectionLevel}
                setErrorCorrectionLevel={setErrorCorrectionLevel}
                format={format}
                setFormat={setFormat}
                margin={margin}
                setMargin={setMargin}
                logoFile={logoFile}
                logoPreview={logoPreview}
                onLogoUpload={handleLogoUpload}
                onRemoveLogo={removeLogo}
                onGenerateQRCode={generateQRCode}
                isGenerating={isGenerating}
                canGenerate={text.trim().length > 0}
              />
            </div>

            <div className="lg:col-span-1">
              <PreviewPanel qrCodeUrl={qrCodeUrl} format={format} onDownload={downloadQRCode} />
            </div>
          </section>

          {/* SEO Content */}
          <SEOOptimizedContent />

          {/* Google AdSense ads */}
          <section aria-label="Sponsored Content">
            <FeatureSectionAds />
          </section>
        </div>
      </div>
    </>
  )
}

