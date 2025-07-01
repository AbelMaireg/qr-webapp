"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { History, Clock, Palette, Square, Circle, RotateCcw, Trash2, Sparkles, X } from "lucide-react"
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
  onLoadHistory: (item: HistoryItem) => void
  isOpen: boolean
  onToggle: () => void
}

export function HistorySidebar({ sessionId, onLoadHistory, isOpen, onToggle }: HistorySidebarProps) {
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
    } catch (_error) {
      toast.error("Failed to clear history")
    }
  }

  const getShapeIcon = (shape: string) => {
    switch (shape) {
      case "circle":
        return <Circle className="h-4 w-4" />
      case "rounded":
      case "margined":
        return <Square className="h-4 w-4 rounded-sm" />
      default:
        return <Square className="h-4 w-4" />
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

  const truncateText = (text: string, maxLength = 25) => {
    return text.length > maxLength ? `${text.substring(0, maxLength)}...` : text
  }

  const hasGradient = (item: HistoryItem) => {
    return item.gradientDirection && item.gradientDirection !== "none"
  }

  const renderColorPreview = (item: HistoryItem) => {
    if (hasGradient(item)) {
      const gradientStyle = {
        background: `linear-gradient(45deg, ${item.foregroundColor}, ${item.gradientColor})`,
      }
      return (
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded border shadow-sm" style={gradientStyle} />
          <Sparkles className="h-3 w-3 text-purple-500" />
        </div>
      )
    }

    return (
      <div className="flex items-center gap-1">
        <div className="w-4 h-4 rounded border shadow-sm" style={{ backgroundColor: item.foregroundColor }} />
        <div className="w-4 h-4 rounded border shadow-sm" style={{ backgroundColor: item.backgroundColor }} />
      </div>
    )
  }

  return (
    <>
      {/* Toggle Button - Fixed position */}
      <Button
        onClick={onToggle}
        variant="outline"
        size="sm"
        className="fixed top-4 left-4 z-50 bg-white dark:bg-gray-800 shadow-lg hover:shadow-xl transition-all duration-200"
        title={isOpen ? "Hide History" : "Show History"}
      >
        {isOpen ? <X className="h-4 w-4" /> : <History className="h-4 w-4" />}
        {isOpen && <span className="ml-2 text-xs hidden sm:inline">Hide</span>}
      </Button>

      {/* Mobile Overlay */}
      {isOpen && <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={onToggle} />}

      {/* Sidebar - Fixed to left edge */}
      <div
        className={`fixed top-0 left-0 h-full z-40 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-700 ${isOpen ? "w-80 sm:w-96" : "w-0"
          } overflow-hidden`}
      >
        {/* Sidebar Content */}
        <div className="h-full pt-16 pb-4">
          {!sessionId ? (
            <div className="h-full px-4">
              <Card className="h-full shadow-none border-0">
                <CardHeader className="pb-4">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                    History
                  </CardTitle>
                  <CardDescription className="text-sm">
                    Accept cookies to save your QR code history and access previous generations
                  </CardDescription>
                </CardHeader>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <History className="h-12 w-12 text-muted-foreground/50 mb-4" />
                  <p className="text-sm text-muted-foreground text-center">Enable cookies to unlock history features</p>
                </CardContent>
              </Card>
            </div>
          ) : (
            <div className="h-full px-4 flex flex-col">
              <Card className="flex-1 flex flex-col shadow-none border-0">
                <CardHeader className="pb-4 flex-shrink-0">
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <History className="h-5 w-5 text-indigo-600 dark:text-indigo-400" />
                      <span className="hidden sm:inline">Recent QR Codes</span>
                      <span className="sm:hidden">Recent</span>
                    </CardTitle>
                    {history.length > 0 && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={clearHistory}
                        className="h-8 w-8 p-0 hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-900/20"
                        title="Clear all history"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                  <CardDescription className="text-sm">
                    {history.length} generation{history.length !== 1 ? "s" : ""} saved
                  </CardDescription>
                </CardHeader>

                <CardContent className="flex-1 p-0 overflow-hidden">
                  <ScrollArea className="h-full">
                    <div className="px-4 pb-4">
                      {isLoading ? (
                        <div className="flex items-center justify-center py-12">
                          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
                        </div>
                      ) : history.length === 0 ? (
                        <div className="flex flex-col items-center justify-center py-12 text-center">
                          <History className="h-12 w-12 text-muted-foreground/50 mb-4" />
                          <p className="text-sm font-medium text-muted-foreground mb-1">No history yet</p>
                          <p className="text-xs text-muted-foreground">Generate your first QR code to see it here!</p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {history.map((item, index) => (
                            <div key={item.id}>
                              <div
                                className="group relative p-4 rounded-lg border border-border/50 hover:border-indigo-200 dark:hover:border-indigo-700 hover:bg-gradient-to-r hover:from-indigo-50/50 hover:to-purple-50/50 dark:hover:from-indigo-950/50 dark:hover:to-purple-950/50 cursor-pointer transition-all duration-200 hover:shadow-md"
                                onClick={() => onLoadHistory(item)}
                              >
                                {/* Header with shape and colors */}
                                <div className="flex items-center justify-between mb-3">
                                  <div className="flex items-center gap-3">
                                    <div className="flex items-center gap-2">
                                      {getShapeIcon(item.cellShape)}
                                      {renderColorPreview(item)}
                                    </div>
                                  </div>
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    className="opacity-0 group-hover:opacity-100 h-7 w-7 p-0 hover:bg-indigo-100 hover:text-indigo-700 dark:hover:bg-indigo-900 transition-all duration-200"
                                    onClick={(e) => {
                                      e.stopPropagation()
                                      onLoadHistory(item)
                                      toast.success("Configuration loaded from history")
                                    }}
                                    title="Load this configuration"
                                  >
                                    <RotateCcw className="h-3.5 w-3.5" />
                                  </Button>
                                </div>

                                {/* Content preview */}
                                <div className="mb-3">
                                  <p className="text-sm font-medium text-foreground mb-1 leading-tight">
                                    {truncateText(item.text)}
                                  </p>
                                  <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                    <div className="flex items-center gap-1">
                                      <Clock className="h-3 w-3" />
                                      {formatDate(item.createdAt)}
                                    </div>
                                    {hasGradient(item) && (
                                      <div className="flex items-center gap-1 text-purple-600 dark:text-purple-400">
                                        <Palette className="h-3 w-3" />
                                        <span>Gradient</span>
                                      </div>
                                    )}
                                  </div>
                                </div>

                                {/* Quick info tags */}
                                <div className="flex items-center gap-2 flex-wrap">
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300">
                                    {item.cellShape}
                                  </span>
                                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
                                    {item.errorCorrection}
                                  </span>
                                  {item.margin > 0 && (
                                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300">
                                      {item.margin}px margin
                                    </span>
                                  )}
                                </div>

                                {/* Hover overlay */}
                                <div className="absolute inset-0 rounded-lg bg-gradient-to-r from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none" />
                              </div>
                              {index < history.length - 1 && <Separator className="my-3 opacity-50" />}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </>
  )
}

