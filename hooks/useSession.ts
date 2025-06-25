"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";

export function useSession() {
  const [sessionId, setSessionId] = useState<string | null>(null);
  const [showCookieConsent, setShowCookieConsent] = useState(false);
  const [isSessionLoading, setIsSessionLoading] = useState(true);

  useEffect(() => {
    checkExistingSession();
  }, []);

  const checkExistingSession = async () => {
    setIsSessionLoading(true);

    const consent = localStorage.getItem("cookie-consent");

    if (!consent) {
      setShowCookieConsent(true);
      setIsSessionLoading(false);
      return;
    }

    if (consent === "declined") {
      setSessionId(null);
      setIsSessionLoading(false);
      return;
    }

    // Check for existing session
    try {
      const response = await fetch("/api/session", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        if (data.sessionId) {
          setSessionId(data.sessionId);
          if (!data.isNew) {
            toast.success("Welcome back! Your session has been restored.");
          }
        } else {
          // No existing session, create one
          await initializeSession();
        }
      }
    } catch (error) {
      console.error("Failed to check existing session:", error);
    } finally {
      setIsSessionLoading(false);
    }
  };

  const initializeSession = async () => {
    try {
      const response = await fetch("/api/session", { method: "POST" });
      if (response.ok) {
        const data = await response.json();
        setSessionId(data.sessionId);
        if (data.isNew) {
          toast.success(
            "New session created! Your QR codes will be saved to history.",
          );
        }
      }
    } catch (error) {
      console.error("Failed to initialize session:", error);
      toast.error("Failed to create session. History won't be saved.");
    }
  };

  const handleCookieAccept = async () => {
    localStorage.setItem("cookie-consent", "accepted");
    setShowCookieConsent(false);
    setIsSessionLoading(true);

    // Check for existing session first, then create if needed
    try {
      const response = await fetch("/api/session", { method: "GET" });
      if (response.ok) {
        const data = await response.json();
        if (data.sessionId) {
          setSessionId(data.sessionId);
          toast.success("Session restored! Your history is available.");
        } else {
          await initializeSession();
        }
      }
    } catch (error) {
      console.error("Failed to handle cookie accept:", error);
      await initializeSession();
    } finally {
      setIsSessionLoading(false);
    }
  };

  const handleCookieDecline = () => {
    localStorage.setItem("cookie-consent", "declined");
    setShowCookieConsent(false);
    setSessionId(null);
    setIsSessionLoading(false);
    toast.info("Cookies declined. Your QR codes won't be saved to history.");
  };

  return {
    sessionId,
    showCookieConsent,
    isSessionLoading,
    handleCookieAccept,
    handleCookieDecline,
  };
}
