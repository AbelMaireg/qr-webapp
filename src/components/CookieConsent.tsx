"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cookie } from "lucide-react"
import { toast } from "sonner"

interface CookieConsentProps {
  onAcceptAction: () => void
  onDeclineAction: () => void
}

export function CookieConsent({ onAcceptAction, onDeclineAction }: CookieConsentProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setIsVisible(true)
    } else if (consent === "accepted") {
      onAcceptAction()
    }
  }, [onAcceptAction])

  const handleAccept = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setIsVisible(false)
    onAcceptAction()
    toast.success("Cookies accepted! Your QR code history will be saved.")
  }

  const handleDecline = () => {
    localStorage.setItem("cookie-consent", "declined")
    setIsVisible(false)
    onDeclineAction()
    toast.info("Cookies declined. Your QR codes won't be saved to history.")
  }

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-md w-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Cookie className="h-5 w-5" />
            Cookie Consent
          </CardTitle>
          <CardDescription>
            We use cookies to save your QR code generation history and improve your experience.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">By accepting cookies, you'll be able to:</p>
          <ul className="text-sm text-muted-foreground space-y-1 ml-4">
            <li>• View your recent QR code generations</li>
            <li>• Quickly regenerate previous QR codes</li>
            <li>• Access your generation history</li>
          </ul>
          <div className="flex gap-2">
            <Button onClick={handleAccept} className="flex-1">
              Accept Cookies
            </Button>
            <Button onClick={handleDecline} variant="outline" className="flex-1">
              Decline
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

