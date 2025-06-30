"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X, Clock } from "lucide-react"
import { GoogleAdsense } from "./GoogleAdsense"

interface AdPopupProps {
  isOpen: boolean
  onClose: () => void
  onContinue: () => void
}

export function AdPopup({ isOpen, onClose, onContinue }: AdPopupProps) {
  const [countdown, setCountdown] = useState(5)
  const [canSkip, setCanSkip] = useState(false)

  useEffect(() => {
    if (isOpen) {
      setCountdown(5)
      setCanSkip(false)

      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            setCanSkip(true)
            clearInterval(timer)
            return 0
          }
          return prev - 1
        })
      }, 1000)

      return () => clearInterval(timer)
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <CardHeader className="relative">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">Generating Your QR Code...</CardTitle>
              <CardDescription>Please wait while we prepare your custom QR code</CardDescription>
            </div>
            {canSkip && (
              <Button variant="ghost" size="sm" onClick={onClose} className="h-8 w-8 p-0">
                <X className="h-4 w-4" />
              </Button>
            )}
          </div>

          {!canSkip && (
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
              <Clock className="h-4 w-4" />
              <span>Continue in {countdown} seconds...</span>
            </div>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Ad content */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <div className="text-center mb-4">
              <h3 className="font-semibold text-gray-900 mb-2">Sponsored Content</h3>
              <p className="text-sm text-gray-600">Support our free QR code generator by viewing this ad</p>
            </div>

            <GoogleAdsense
              adSlot="5678901234"
              style={{
                display: "block",
                minHeight: "300px",
                textAlign: "center",
                backgroundColor: "white",
                borderRadius: "4px",
              }}
            />
          </div>

          {/* Progress indicator */}
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Processing...</span>
              <span>{canSkip ? "100%" : `${Math.round(((5 - countdown) / 5) * 100)}%`}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className="bg-indigo-600 h-2 rounded-full transition-all duration-1000"
                style={{ width: canSkip ? "100%" : `${((5 - countdown) / 5) * 100}%` }}
              />
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button onClick={onContinue} disabled={!canSkip} className="flex-1">
              {canSkip ? "Continue to QR Code" : `Wait ${countdown}s`}
            </Button>
            {canSkip && (
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

