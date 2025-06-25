"use client"

import { QrCode } from "lucide-react"

export function PageHeader() {
  return (
    <div className="text-center mb-8 pt-8">
      <div className="flex items-center justify-center gap-2 mb-4">
        <QrCode className="h-8 w-8 text-indigo-600" />
        <h1 className="text-4xl font-bold text-gray-900">Advanced QR Code Generator</h1>
      </div>
      <p className="text-lg text-gray-600">Generate customizable QR codes with colors, gradients, logos, and shapes</p>
    </div>
  )
}

