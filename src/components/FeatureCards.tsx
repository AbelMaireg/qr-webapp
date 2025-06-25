"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Download, Upload, Palette, QrCode } from "lucide-react"

export function FeatureCards() {
  const features = [
    {
      icon: Palette,
      title: "Custom Colors",
      description: "Choose any colors and create beautiful gradients for your QR codes",
      bgColor: "bg-green-100",
      iconColor: "text-green-600",
    },
    {
      icon: Upload,
      title: "Logo Embedding",
      description: "Add your brand logo in the center of QR codes",
      bgColor: "bg-blue-100",
      iconColor: "text-blue-600",
    },
    {
      icon: QrCode,
      title: "Custom Shapes",
      description: "Choose from different cell shapes: square, circle, rounded, or margined",
      bgColor: "bg-purple-100",
      iconColor: "text-purple-600",
    },
    {
      icon: Download,
      title: "High Quality",
      description: "Generate high-resolution QR codes perfect for any use case",
      bgColor: "bg-orange-100",
      iconColor: "text-orange-600",
    },
  ]

  return (
    <div className="mt-12 grid md:grid-cols-4 gap-6 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Card key={index}>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2 mb-2">
              <div className={`h-8 w-8 ${feature.bgColor} rounded-full flex items-center justify-center`}>
                <feature.icon className={`h-4 w-4 ${feature.iconColor}`} />
              </div>
              <h3 className="font-semibold">{feature.title}</h3>
            </div>
            <p className="text-sm text-gray-600">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}

