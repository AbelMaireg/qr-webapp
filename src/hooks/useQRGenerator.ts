"use client";

import type React from "react";

import { useState } from "react";
import { toast } from "sonner";
import type { QRCodeErrorCorrectionLevel } from "qrcode";

type CellShape = "square" | "circle" | "rounded" | "margined";
type GradientDirection = "none" | "left-right" | "top-bottom" | "diagonal";

export function useQRGenerator() {
  const [text, setText] = useState("");
  const [format, setFormat] = useState("png");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showAdPopup, setShowAdPopup] = useState(false);
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const [foregroundColor, setForegroundColor] = useState("#000000");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [gradientColor, setGradientColor] = useState("#000000");
  const [gradientDirection, setGradientDirection] =
    useState<GradientDirection>("none");
  const [cellShape, setCellShape] = useState<CellShape>("square");
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string>("");
  const [margin, setMargin] = useState(0);
  const [errorCorrectionLevel, setErrorCorrectionLevel] =
    useState<QRCodeErrorCorrectionLevel>("M");

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Logo file size must be less than 2MB");
        return;
      }

      if (!file.type.startsWith("image/")) {
        toast.error("Please upload a valid image file");
        return;
      }

      setLogoFile(file);
      // Automatically set error correction to High when logo is uploaded
      setErrorCorrectionLevel("H");
      toast.success(
        "Logo uploaded! Error correction level set to High for better logo visibility.",
      );

      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const generateQRCode = async () => {
    if (!text.trim()) {
      toast.error("Please enter some text to generate QR code");
      return;
    }

    // Show ad popup first
    setShowAdPopup(true);
  };

  const handleAdPopupContinue = async () => {
    setShowAdPopup(false);
    setIsGenerating(true);

    try {
      const formData = new FormData();
      formData.append("text", text);
      formData.append("format", format);
      formData.append("foregroundColor", foregroundColor);
      formData.append("backgroundColor", backgroundColor);
      formData.append("gradientColor", gradientColor);
      formData.append("gradientDirection", gradientDirection);
      formData.append("cellShape", cellShape);
      formData.append("margin", margin.toString());
      formData.append("errorCorrectionLevel", errorCorrectionLevel);

      if (logoFile) {
        formData.append("logo", logoFile);
      }

      const response = await fetch("/api/qr", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to generate QR code");
      }

      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setQrCodeUrl(url);

      toast.success("QR code generated successfully!");
    } catch (error) {
      toast.error("Failed to generate QR code. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAdPopupClose = () => {
    setShowAdPopup(false);
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;

    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = `qrcode.${format}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const removeLogo = () => {
    setLogoFile(null);
    setLogoPreview("");
  };

  const loadFromHistory = (item: any) => {
    setText(item.text);
    setForegroundColor(item.foregroundColor);
    setBackgroundColor(item.backgroundColor);
    setGradientColor(item.gradientColor);
    setGradientDirection(item.gradientDirection as GradientDirection);
    setCellShape(item.cellShape as CellShape);
    setMargin(item.margin);
    setErrorCorrectionLevel(item.errorCorrection as QRCodeErrorCorrectionLevel);
    toast.success("Configuration loaded from history!");
  };

  return {
    // State
    text,
    setText,
    format,
    setFormat,
    isGenerating,
    showAdPopup,
    qrCodeUrl,
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
    logoFile,
    logoPreview,
    margin,
    setMargin,
    errorCorrectionLevel,
    setErrorCorrectionLevel,
    // Actions
    handleLogoUpload,
    generateQRCode,
    handleAdPopupContinue,
    handleAdPopupClose,
    downloadQRCode,
    removeLogo,
    loadFromHistory,
  };
}
