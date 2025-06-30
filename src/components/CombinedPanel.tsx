"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, Upload, Palette, QrCode, Lightbulb, Copy } from "lucide-react"
import type { QRCodeErrorCorrectionLevel } from "qrcode"
import { toast } from "sonner"

type CellShape = "square" | "circle" | "rounded" | "margined"
type GradientDirection = "none" | "left-right" | "top-bottom" | "diagonal"

interface CombinedPanelProps {
  text: string
  setText: (text: string) => void
  foregroundColor: string
  setForegroundColor: (color: string) => void
  backgroundColor: string
  setBackgroundColor: (color: string) => void
  gradientColor: string
  setGradientColor: (color: string) => void
  gradientDirection: GradientDirection
  setGradientDirection: (direction: GradientDirection) => void
  cellShape: CellShape
  setCellShape: (shape: CellShape) => void
  errorCorrectionLevel: QRCodeErrorCorrectionLevel
  setErrorCorrectionLevel: (level: QRCodeErrorCorrectionLevel) => void
  format: string
  setFormat: (format: string) => void
  margin: number
  setMargin: (margin: number) => void
  logoFile: File | null
  logoPreview: string
  onLogoUpload: (event: React.ChangeEvent<HTMLInputElement>) => void
  onRemoveLogo: () => void
  onGenerateQRCode: () => void
  isGenerating: boolean
  canGenerate: boolean
}

const suggestions = [
  "https://www.example.com",
  "Visit our website for more info!",
  "Contact us: info@company.com",
  "Follow us on social media",
  "Download our mobile app",
  "Join our newsletter",
  "Book your appointment today",
  "Get 20% off with code SAVE20",
  "Call us: +1 (555) 123-4567",
  "Find us on Google Maps",
  "WiFi Password: MySecureWiFi123",
  "Connect to our WiFi network",
]

export function CombinedPanel({
  text,
  setText,
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
  errorCorrectionLevel,
  setErrorCorrectionLevel,
  format,
  setFormat,
  margin,
  setMargin,
  logoFile,
  logoPreview,
  onLogoUpload,
  onRemoveLogo,
  onGenerateQRCode,
  isGenerating,
  canGenerate,
}: CombinedPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleSuggestionClick = (suggestion: string) => {
    setText(suggestion)
    toast.success("Suggestion added to text field!")
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      toast.success("Copied to clipboard!")
    } catch (err) {
      toast.error("Failed to copy to clipboard")
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex items-center gap-2">
            <QrCode className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
            Content & Customization
          </div>
        </CardTitle>
        <CardDescription>Enter your content and customize your QR code</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Content Section */}
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="text" className="flex items-center gap-2">
              Text or URL
              <Lightbulb className="h-4 w-4 text-amber-500" />
            </Label>
            <Textarea
              id="text"
              placeholder="Enter text, URL, or any content you want to encode..."
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="min-h-[120px] max-h-[120px] resize-none overflow-y-auto"
              style={{ lineHeight: "1.5", maxHeight: "120px" }} // Approximately 5 lines
            />
          </div>

          {/* Suggestions */}
          <div className="space-y-2">
            <Label className="text-sm font-medium text-muted-foreground">Quick Suggestions:</Label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-32 overflow-y-auto">
              {suggestions.map((suggestion, index) => (
                <div
                  key={index}
                  className="group flex items-center justify-between p-2 text-xs bg-gray-50 dark:bg-gray-800 rounded border hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                  onClick={() => handleSuggestionClick(suggestion)}
                >
                  <span className="truncate flex-1 mr-2">{suggestion}</span>
                  <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-6 w-6 p-0"
                      onClick={(e) => {
                        e.stopPropagation()
                        copyToClipboard(suggestion)
                      }}
                      title="Copy to clipboard"
                    >
                      <Copy className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Customization Section */}
        <div className="space-y-4 pt-4 border-t border-border">
          <div className="flex items-center gap-2 mb-4">
            <Palette className="h-4 w-4 text-indigo-600 dark:text-indigo-400" />
            <Label className="text-base font-semibold">Appearance</Label>
          </div>

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

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="errorCorrection">Error Correction Level</Label>
              <Select
                value={errorCorrectionLevel}
                onValueChange={(value: QRCodeErrorCorrectionLevel) => setErrorCorrectionLevel(value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select level" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="L" className="text-red-600">
                    Low (7%)
                  </SelectItem>
                  <SelectItem value="M" className="text-orange-400">
                    Medium (15%)
                  </SelectItem>
                  <SelectItem value="Q" className="text-lime-400">
                    Quartile (25%)
                  </SelectItem>
                  <SelectItem value="H" className="text-green-600">
                    High (30%)
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
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
              <Label htmlFor="margin">Margin (px)</Label>
              <Input
                id="margin"
                type="number"
                min="0"
                value={margin}
                onChange={(e) => setMargin(Number(e.target.value))}
                placeholder="Enter margin in pixels"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Logo (Optional)</Label>
            <div className="space-y-2">
              <Input ref={fileInputRef} type="file" accept="image/*" onChange={onLogoUpload} className="hidden" />
              <Button type="button" variant="outline" onClick={() => fileInputRef.current?.click()} className="w-full">
                <Upload className="mr-2 h-4 w-4" />
                Upload Logo
              </Button>
              {logoPreview && (
                <div className="flex items-center gap-2 p-2 border rounded">
                  <img src={logoPreview || "/placeholder.svg"} alt="Logo preview" className="w-8 h-8 object-contain" />
                  <span className="text-sm flex-1">{logoFile?.name}</span>
                  <Button size="sm" variant="ghost" onClick={onRemoveLogo}>
                    ×
                  </Button>
                </div>
              )}
            </div>
          </div>

          <Button onClick={onGenerateQRCode} disabled={isGenerating || !canGenerate} className="w-full" size="lg">
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
        </div>
      </CardContent>
    </Card>
  )
}
