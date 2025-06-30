"use client"

import { Card, CardContent } from "@/components/ui/card"
import { CookieConsent } from "@/components/CookieConsent"
import { HistorySidebar } from "@/components/HistorySidebar"
import { QRCodeForm } from "@/components/QRCodeForm"
import { CustomizationPanel } from "@/components/CustomizationPanel"
import { PreviewPanel } from "@/components/PreviewPanel"
import { FeatureSectionAds } from "@/components/GoogleAdsense"
import { AdPopup } from "@/components/AdPopup"
import { PageHeader } from "@/components/PageHeader"
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

  const [isHistorySidebarOpen, setIsHistorySidebarOpen] = useState(true)

  return (
    <>
      {showCookieConsent && <CookieConsent onAccept={handleCookieAccept} onDecline={handleCookieDecline} />}

      <AdPopup isOpen={showAdPopup} onClose={handleAdPopupClose} onContinue={handleAdPopupContinue} />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
        <div
          className={`container mx-auto max-w-full transition-all duration-300 ${isHistorySidebarOpen ? "pl-96" : "pl-16"
            } pr-64`}
        >
          <PageHeader />

          <div className="grid lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
            <QRCodeForm text={text} setText={setText} />

            <CustomizationPanel
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

            <PreviewPanel qrCodeUrl={qrCodeUrl} format={format} onDownload={downloadQRCode} />
          </div>

          {/* History Sidebar */}
          {isSessionLoading ? (
            <div className="fixed top-4 left-4 w-88 h-[calc(100vh-2rem)] z-40">
              <Card className="h-full">
                <CardContent className="flex items-center justify-center py-8">
                  <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                </CardContent>
              </Card>
            </div>
          ) : (
            <HistorySidebar
              sessionId={sessionId}
              onLoadHistory={loadFromHistory}
              isOpen={isHistorySidebarOpen}
              onToggle={() => setIsHistorySidebarOpen(!isHistorySidebarOpen)}
            />
          )}

          {/* Replace FeatureCards with Google AdSense ads */}
          <FeatureSectionAds />
        </div>
      </div>
    </>
  )
}

