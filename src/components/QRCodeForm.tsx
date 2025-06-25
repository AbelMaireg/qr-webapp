"use client"

import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Textarea } from "@/components/ui/textarea"

interface QRCodeFormProps {
  text: string
  setText: (text: string) => void
}

export function QRCodeForm({ text, setText }: QRCodeFormProps) {
  return (
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
  )
}

