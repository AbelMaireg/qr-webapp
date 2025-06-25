"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { History, Clock, Palette, Square, Circle, RotateCcw, Trash2 } from "lucide-react"
import { toast } from "sonner"

interface HistoryItem {
  id: string
  status: "SUCCESS" | "ERROR"
  text: string
  size: number
  foregroundColor: string
  backgroundColor: string
  cellShape: string
  gradientColor: string
  gradientDirection: string
  margin: number
  errorCorrection: string
  createdAt: string
}

interface HistorySidebarProps {
  sessionId: string | null
  onLoadHistoryAction: (item: HistoryItem) => void
}

export function HistorySidebar({ sessionId, onLoadHistoryAction }: HistorySidebarProps) {
  const [history, setHistory] = useState<HistoryItem[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    if (sessionId) {
      fetchHistory()
    }
  }, [sessionId])

  const fetchHistory = async () => {
    if (!sessionId) return

    setIsLoading(true)
    try {
      const response = await fetch(`/api/history?sessionId=${sessionId}`)
      if (response.ok) {
        const data = await response.json()
        setHistory(data)
      }
    } catch (error) {
      console.error("Failed to fetch history:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const clearHistory = async () => {
    if (!sessionId) return

    try {
      const response = await fetch("/api/history", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      })

      if (response.ok) {
        setHistory([])
        toast.success("History cleared successfully")
      }
    } catch (error) {
      toast.error("Failed to clear history")
    }
  }

  const getShapeIcon = (shape: string) => {
    switch (shape) {
      case "circle":
        return <Circle className="h-3 w-3" />
      case "rounded":
      case "margined":
        return <Square className="h-3 w-3 rounded-sm" />
      default:
        return <Square className="h-3 w-3" />
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    const now = new Date()
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60))

    if (diffInHours < 1) return "Just now"
    if (diffInHours < 24) return `${diffInHours}h ago`
    return date.toLocaleDateString()
  }

  const truncateText = (text: string, maxLength = 30) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  if (!sessionId) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="h-4 w-4" />
            History
          </CardTitle>
          <CardDescription className="text-xs">Accept cookies to save your QR code history</CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-sm">
            <History className="h-4 w-4" />
            Recent QR Codes
          </CardTitle>
          {history.length > 0 && (
            <Button variant="ghost" size="sm" onClick={clearHistory} className="h-6 w-6 p-0">
              <Trash2 className="h-3 w-3" />
            </Button>
          )}
        </div>
        <CardDescription className="text-xs">{history.length} recent generations</CardDescription>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <ScrollArea className="h-full px-4">
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
            </div>
          ) : history.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-8 text-center">
              <History className="h-8 w-8 text-muted-foreground mb-2" />
              <p className="text-sm text-muted-foreground">No history yet</p>
              <p className="text-xs text-muted-foreground">Generate your first QR code!</p>
            </div>
          ) : (
            <div className="space-y-2 pb-4">
              {history.map((item, index) => (
                <div key={item.id}>
                  <div
                    className="group p-3 rounded-lg border hover:bg-accent cursor-pointer transition-colors"
                    onClick={() => onLoadHistoryAction(item)}
                  >
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div className="flex items-center gap-2 min-w-0 flex-1">
                        <Badge
                          variant={item.status === "SUCCESS" ? "default" : "destructive"}
                          className="text-xs px-1.5 py-0.5"
                        >
                          {item.status}
                        </Badge>
                        <div className="flex items-center gap-1">
                          {getShapeIcon(item.cellShape)}
                          <div
                            className="w-3 h-3 rounded-sm border"
                            style={{ backgroundColor: item.foregroundColor }}
                          />
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                        onClick={(e) => {
                          e.stopPropagation()
                          onLoadHistoryAction(item)
                          toast.success("Configuration loaded from history")
                        }}
                      >
                        <RotateCcw className="h-3 w-3" />
                      </Button>
                    </div>

                    <p className="text-sm font-medium mb-1 truncate">{truncateText(item.text)}</p>

                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      {formatDate(item.createdAt)}
                    </div>

                    {item.gradientDirection !== "none" && (
                      <div className="flex items-center gap-1 mt-1">
                        <Palette className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Gradient</span>
                      </div>
                    )}
                  </div>
                  {index < history.length - 1 && <Separator className="my-2" />}
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  )
}

