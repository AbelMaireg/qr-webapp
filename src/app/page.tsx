"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Download, QrCode, Loader2, Upload, Palette } from "lucide-react"
import { toast } from "sonner"

type CellShape = "square" | "circle" | "rounded" | "margined"
type GradientDirection = "none" | "left-right" | "top-bottom" | "diagonal"

export default function QRGenerator() {
  const [text, setText] = useState("")
  const [format, setFormat] = useState("png")
  const [isGenerating, setIsGenerating] = useState(false)
  const [qrCodeUrl, setQrCodeUrl] = useState("")
  const [foregroundColor, setForegroundColor] = useState("#000000")
  const [backgroundColor, setBackgroundColor] = useState("#ffffff")
  const [gradientColor, setGradientColor] = useState("#000000")
  const [gradientDirection, setGradientDirection] = useState<GradientDirection>("none")
  const [cellShape, setCellShape] = useState<CellShape>("square")
  const [logoFile, setLogoFile] = useState<File | null>(null)
  const [logoPreview, setLogoPreview] = useState<string>("")

  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Logo file size must be less than 2MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file")
        return
      }

      setLogoFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate QR code")
      return
    }

    setIsGenerating(true)

    try {
      const formData = new FormData()
      formData.append("text", text)
      formData.append("format", format)
      formData.append("foregroundColor", foregroundColor)
      formData.append("backgroundColor", backgroundColor)
      formData.append("gradientColor", gradientColor)
      formData.append("gradientDirection", gradientDirection)
      formData.append("cellShape", cellShape)

      if (logoFile) {
        formData.append("logo", logoFile)
      }

      const response = await fetch("/api/qr", {
        method: "POST",
        body: formData,
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

  const removeLogo = () => {
    setLogoFile(null)
    setLogoPreview("")
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-8 pt-8">
          <div className="flex items-center justify-center gap-2 mb-4">
            <QrCode className="h-8 w-8 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Advanced QR Code Generator</h1>
          </div>
          <p className="text-lg text-gray-600">
            Generate customizable QR codes with colors, gradients, logos, and shapes
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Input Section */}
          <Card>
            <CardHeader>
              <CardTitle>Content</CardTitle>
              <CardDescription>Enter your text</CardDescription>
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

            </CardContent>
          </Card>

          {/* Customization Section */}
          <Card>
            <CardHeader>
              <CardTitle>
                <div className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Customization
                </div>
              </CardTitle>
              <CardDescription>Customize colors, gradients, format & shapes</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="foreground">Foreground Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="foreground"
                      type="color"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={foregroundColor}
                      onChange={(e) => setForegroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="background">Background Color</Label>
                  <div className="flex gap-2">
                    <Input
                      id="background"
                      type="color"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      type="text"
                      value={backgroundColor}
                      onChange={(e) => setBackgroundColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="gradient">Gradient Direction</Label>
                  <Select
                    value={gradientDirection}
                    onValueChange={(value: GradientDirection) => setGradientDirection(value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select gradient" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No Gradient</SelectItem>
                      <SelectItem value="left-right">Left to Right</SelectItem>
                      <SelectItem value="top-bottom">Top to Bottom</SelectItem>
                      <SelectItem value="diagonal">Diagonal</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {gradientDirection !== "none" && (
                  <div className="space-y-2">
                    <Label htmlFor="gradientColor">Gradient End Color</Label>
                    <div className="flex gap-2">
                      <Input
                        id="gradientColor"
                        type="color"
                        value={gradientColor}
                        onChange={(e) => setGradientColor(e.target.value)}
                        className="w-12 h-10 p-1 border rounded"
                      />
                      <Input
                        type="text"
                        value={gradientColor}
                        onChange={(e) => setGradientColor(e.target.value)}
                        className="flex-1"
                      />
                    </div>
                  </div>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="shape">Cell Shape</Label>
                <Select value={cellShape} onValueChange={(value: CellShape) => setCellShape(value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select shape" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="square">Square</SelectItem>
                    <SelectItem value="circle">Circle</SelectItem>
                    <SelectItem value="rounded">Rounded Square</SelectItem>
                    <SelectItem value="margined">Margined Square</SelectItem>
                  </SelectContent>
                </Select>
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

              <div className="space-y-2">
                <Label>Logo (Optional)</Label>
                <div className="space-y-2">
                  <Input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    Upload Logo
                  </Button>
                  {logoPreview && (
                    <div className="flex items-center gap-2 p-2 border rounded">
                      <img
                        src={logoPreview || "/placeholder.svg"}
                        alt="Logo preview"
                        className="w-8 h-8 object-contain"
                      />
                      <span className="text-sm flex-1">{logoFile?.name}</span>
                      <Button size="sm" variant="ghost" onClick={removeLogo}>
                        ×
                      </Button>
                    </div>
                  )}
                </div>
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

                  <Button onClick={downloadQRCode} className="w-full">
                    <Download className="mr-2 h-4 w-4" />
                    Download QR Code ({format.toUpperCase()})
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <QrCode className="h-16 w-16 mb-4 opacity-50" />
                  <p className="text-center">
                    Customize your settings and click "Generate QR Code" to see your QR code here
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <div className="mt-12 grid md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Palette className="h-4 w-4 text-green-600" />
                </div>
                <h3 className="font-semibold">Custom Colors</h3>
              </div>
              <p className="text-sm text-gray-600">
                Choose any colors and create beautiful gradients for your QR codes
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <Upload className="h-4 w-4 text-blue-600" />
                </div>
                <h3 className="font-semibold">Logo Embedding</h3>
              </div>
              <p className="text-sm text-gray-600">Add your brand logo in the center of QR codes</p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-purple-100 rounded-full flex items-center justify-center">
                  <QrCode className="h-4 w-4 text-purple-600" />
                </div>
                <h3 className="font-semibold">Custom Shapes</h3>
              </div>
              <p className="text-sm text-gray-600">
                Choose from different cell shapes: square, circle, rounded, or margined
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center gap-2 mb-2">
                <div className="h-8 w-8 bg-orange-100 rounded-full flex items-center justify-center">
                  <Download className="h-4 w-4 text-orange-600" />
                </div>
                <h3 className="font-semibold">High Quality</h3>
              </div>
              <p className="text-sm text-gray-600">Generate high-resolution QR codes perfect for any use case</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
