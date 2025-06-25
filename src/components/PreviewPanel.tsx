"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Download, QrCode } from "lucide-react"

interface PreviewPanelProps {
  qrCodeUrl: string
  format: string
  onDownload: () => void
}

export function PreviewPanel({ qrCodeUrl, format, onDownload }: PreviewPanelProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Preview & Download</CardTitle>
        <CardDescription>Your customized QR code will appear here</CardDescription>
      </CardHeader>
      <CardContent>
        {qrCodeUrl ? (
          <div className="space-y-4">
            <div className="flex justify-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-200">
              <img
                src={qrCodeUrl || "/placeholder.svg"}
                alt="Generated QR Code"
                className="max-w-64 max-h-64 object-contain"
              />
            </div>

            <Button onClick={onDownload} className="w-full">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code ({format.toUpperCase()})
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-12 text-gray-500">
            <QrCode className="h-16 w-16 mb-4 opacity-50" />
            <p className="text-center">Customize your settings and click "Generate QR Code" to see your QR code here</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

