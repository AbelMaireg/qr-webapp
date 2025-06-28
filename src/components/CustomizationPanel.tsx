"use client"

import type React from "react"

import { useRef } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Loader2, Upload, Palette, QrCode, Info } from "lucide-react"
import type { QRCodeErrorCorrectionLevel } from "qrcode"

type CellShape = "square" | "circle" | "rounded" | "margined"
type GradientDirection = "none" | "left-right" | "top-bottom" | "diagonal"

interface CustomizationPanelProps {
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

export function CustomizationPanel({
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
}: CustomizationPanelProps) {
  const fileInputRef = useRef<HTMLInputElement>(null)

  return (
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
            <Select value={gradientDirection} onValueChange={(value: GradientDirection) => setGradientDirection(value)}>
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
            <Label htmlFor="format">Output</Label>
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
            <Label htmlFor="margin">Margin</Label>
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
          <div className="flex items-center gap-2">
            <Label>Logo (Optional)</Label>
            <div className="group relative">
              <Info className="h-4 w-4 text-muted-foreground cursor-help" />
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                <div className="text-center">
                  <div className="font-medium">Logo Tips:</div>
                  <div>• Use High error correction for logos</div>
                  <div>• Keep logo simple and high contrast</div>
                  <div>• Max file size: 2MB</div>
                </div>
                <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
              </div>
            </div>
          </div>
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

        <Button onClick={onGenerateQRCode} disabled={isGenerating || !canGenerate} className="w-full">
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
  )
}

