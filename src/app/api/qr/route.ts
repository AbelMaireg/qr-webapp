import { type NextRequest, NextResponse } from "next/server";
import { QRCodeConfigurationBuilder } from "./lib/QRCodeConfigurationBuilder";
import { CellShape, GradientDirection } from "./lib/types/QRCodeConfiguration";
import { QRCodeRendererFactory } from "./lib/QRCodeRendererFactory";
import { QRCodeService } from "./lib/QRCodeService";

export async function POST(request: NextRequest) {
  try {
    const data = await request.formData();

    const text = data.get("text") as string;
    const format = data.get("format") as string;
    const foregroundColor = data.get("foregroundColor") as string;
    const backgroundColor = data.get("backgroundColor") as string;
    const gradientColor = data.get("gradientColor") as string;
    const gradientDirection = data.get(
      "gradientDirection",
    ) as GradientDirection;
    const cellShape = data.get("cellShape") as CellShape;
    const logoFile = data.get("logo") as File | null;
    const margin = parseInt(data.get("margin") as string, 10) || 0;

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
      .setMargin(margin);

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
    return NextResponse.json(
      { error: "Failed to generate QR code" },
      { status: 500 },
    );
  }
}
