"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Download, QrCode, Loader2 } from "lucide-react"
import { toast } from "sonner"

export default function QRGenerator() {
  const [text, setText] = useState("")
  const [format, setFormat] = useState("png")
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate QR code")
      return
    }

    setIsGenerating(true)

    try {
      const response = await fetch("/api/qr", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text, format }),
      })

      if (!response.ok) {
        throw new Error("Failed to generate QR code")
      }

      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      setQrCodeUrl(url)

      toast.success("QR code generated successfully!")
    } catch (error) {
      toast.error("Failed to generate QR code. Please try again.")
    } finally {
      setIsGenerating(false)
    }
  }

  const downloadQRCode = () => {
    if (!qrCodeUrl) return

    const link = document.createElement("a")
    link.href = qrCodeUrl
    link.download = `qrcode.${format}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 to-indigo-100 p-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600">Generate QR codes from any text and download in multiple formats</p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Generate QR Code</CardTitle>
              <CardDescription>Enter your text and choose the output format</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="text">Text or URL</Label>
                <Textarea
                  id="text"
                  placeholder="Enter text, URL, or any content you want to encode..."
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="format">Output Format</Label>
                <Select value={format} onValueChange={setFormat}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select format" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="png">PNG</SelectItem>
                    <SelectItem value="jpg">JPG</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button onClick={generateQRCode} disabled={isGenerating || !text.trim()} className="w-full">
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <QrCode className="mr-2 h-4 w-4" />
                    Generate QR Code
                  </>
                )}
              </Button>
            </CardContent>
          </Card>

          {/* Preview Section */}
          <Card>
            <CardHeader>
              <CardTitle>Preview & Download</CardTitle>
              <CardDescription>Your generated QR code will appear here</CardDescription>
            </CardHeader>
            <CardContent>
              {qrCodeUrl ? (
                <div className="space-y-4">
                  <div className="flex justify-center p-4 bg-white rounded-lg border-2 border-dashed border-gray-200">
                    {format === "svg" ? (
                      <div
                        dangerouslySetInnerHTML={{
                          __html: qrCodeUrl.startsWith("blob:") ? "" : qrCodeUrl,
                        }}
                        className="max-w-64 max-h-64"
                      />
                    ) : (
                      <img
                        src={qrCodeUrl || "/placeholder.svg"}
                        alt="Generated QR Code"
                        className="max-w-64 max-h-64 object-contain"
                      />
                    )}
                  </div>

                  <Button onClick={downloadQRCode} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code ({format.toUpperCase()})
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <QrCode className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-center">Enter some text and click "Generate QR Code" to see your QR code here</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-3 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-semibold">Multiple Formats</h3>
              </div>
              <p className="text-sm text-gray-600">
                Generate QR codes in PNG, JPG, and SVG formats for different use cases
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold">Instant Download</h3>
              </div>
              <p className="text-sm text-gray-600">Download your generated QR codes instantly with a single click</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-purple-600" />
                </div>
                <h3 className="font-semibold">High Quality</h3>
              </div>
              <p className="text-sm text-gray-600">
                Generate high-quality QR codes suitable for both digital and print use
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
