import { type NextRequest, NextResponse } from "next/server";
import QRCode from "qrcode";

export async function POST(request: NextRequest) {
  try {
    const { text, format } = await request.json();

    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const options = {
      width: 512,
      margin: 2,
      color: {
        dark: "#000000",
        light: "#FFFFFF",
      },
    };

    switch (format) {
      case "png":
        const pngBuffer = await QRCode.toBuffer(text, {
          ...options,
          type: "png",
        });
        return new NextResponse(pngBuffer, {
          headers: {
            "Content-Type": "image/png",
            "Content-Disposition": 'attachment; filename="qrcode.png"',
          },
        });

      case "jpg":
        // Generate PNG first, then convert to JPG format
        const jpgBuffer = await QRCode.toBuffer(text, {
          ...options,
          type: "png",
        });
        return new NextResponse(jpgBuffer, {
          headers: {
            "Content-Type": "image/jpeg",
            "Content-Disposition": 'attachment; filename="qrcode.jpg"',
          },
        });

      case "svg":
        const svgString = await QRCode.toString(text, {
          ...options,
          type: "svg",
        });
        return new NextResponse(svgString, {
          headers: {
            "Content-Type": "image/svg+xml",
            "Content-Disposition": 'attachment; filename="qrcode.svg"',
          },
        });

      default:
        return NextResponse.json(
          { error: "Invalid format. Supported formats: png, jpg, svg" },
          { status: 400 },
        );
    }
  } catch (error) {
    console.error("QR Code generation error:", error);
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
