import { type NextRequest, NextResponse } from "next/server";
import { QRCodeConfigurationBuilder } from "./lib/QRCodeConfigurationBuilder";
import { CellShape, GradientDirection } from "./lib/types/QRCodeConfiguration";
import { QRCodeRendererFactory } from "./lib/QRCodeRendererFactory";
import { QRCodeService } from "./lib/QRCodeService";
import { QRCodeErrorCorrectionLevel } from "qrcode";
import { cookies } from "next/headers";
import { prisma } from "@/lib/prisma";

export async function POST(request: NextRequest) {
  const data = await request.formData();

  const text = data.get("text") as string;
  const format = data.get("format") as string;
  const foregroundColor = data.get("foregroundColor") as string;
  const backgroundColor = data.get("backgroundColor") as string;
  const gradientColor = data.get("gradientColor") as string;
  const gradientDirection = data.get("gradientDirection") as GradientDirection;
  const cellShape = data.get("cellShape") as CellShape;
  const logoFile = data.get("logo") as File | null;
  const margin = parseInt(data.get("margin") as string, 10) || 0;
  const errorCorrectionLevel = data.get("errorCorrectionLevel") as
    | QRCodeErrorCorrectionLevel
    | "M";

  const cookieStore = cookies();
  const sessionId = (await cookieStore).get("qr-session-id")?.value;

  try {
    if (!text) {
      return NextResponse.json({ error: "Text is required" }, { status: 400 });
    }

    const configBuilder = new QRCodeConfigurationBuilder()
      .setText(text)
      .setSize(512)
      .setForegroundColor(foregroundColor || "#000000")
      .setBackgroundColor(backgroundColor || "#FFFFFF")
      .setCellShape(cellShape || "square")
      .setGradient(gradientColor || "#000000", gradientDirection)
      .setMargin(margin)
      .setErrorCorrectionLevel(errorCorrectionLevel);

    if (logoFile) {
      configBuilder.setLogo(Buffer.from(await logoFile.arrayBuffer()));
    }

    const config = configBuilder.build();

    const renderer = QRCodeRendererFactory.createRenderer(
      config,
      format as any,
    );

    const qrService = new QRCodeService();
    const buffer = await qrService.generateQRCode(config, renderer);

    try {
      await prisma.qrc_gen_logs.create({
        data: {
          status: "SUCCESS",
          text,
          size: 512,
          foregroundColor: foregroundColor || "#000000",
          backgroundColor: backgroundColor || "#ffffff",
          cellShape: cellShape || "square",
          gradientColor: gradientColor || "",
          gradientDirection: gradientDirection || "none",
          margin: margin,
          errorCorrection: errorCorrectionLevel,
          sessionId,
        },
      });
    } catch (dbError) {
      console.error("Database logging error:", dbError);
    }

    const contentType = format === "jpg" ? "image/jpeg" : "image/png";
    const filename = `qrcode.${format}`;

    return new NextResponse(buffer, {
      headers: {
        "Content-Type": contentType,
        "Content-Disposition": `attachment; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error("Error processing request:", error);

    try {
      await prisma.qrc_gen_logs.create({
        data: {
          status: "ERROR",
          text,
          size: 512,
          foregroundColor: foregroundColor || "#000000",
          backgroundColor: backgroundColor || "#ffffff",
          cellShape: cellShape || "square",
          gradientColor: gradientColor || "",
          gradientDirection: gradientDirection || "none",
          margin: 4,
          errorCorrection: "M",
          sessionId,
        },
      });
    } catch (dbError) {
      console.error("Database logging error:", dbError);
    }
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
