"use client"

import { QrCode } from "lucide-react"
import { ThemeToggle } from "./ThemeToggle"

export function PageHeader() {
  return (
    <>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>

      <div className="text-center mb-8 pt-8">
        <div className="flex items-center justify-center gap-2 mb-4">
          <QrCode className="h-8 w-8 text-indigo-600 dark:text-indigo-400" />
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Advanced QR Code Generator
          </h1>
        </div>
        <p className="text-base sm:text-lg text-gray-600 dark:text-gray-300 px-4">
          Generate customizable QR codes with colors, gradients, logos, and shapes
        </p>
      </div>
    </>
  )
}

