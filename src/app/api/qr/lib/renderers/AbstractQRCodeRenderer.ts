import {
  createCanvas,
  loadImage,
  type Canvas,
  type CanvasRenderingContext2D,
} from "canvas";
import type {
  QRCodeConfiguration,
  OutputFormat,
} from "../types/QRCodeConfiguration";
import QRCodeMatrix from "../types/QRCodeMatrix";

export abstract class AbstractQRCodeRenderer {
  protected format: OutputFormat;

  constructor(format: OutputFormat) {
    this.format = format;
  }

  abstract render(
    matrix: QRCodeMatrix,
    config: QRCodeConfiguration,
  ): Promise<Buffer>;

  protected createCanvas(size: number): {
    canvas: Canvas;
    ctx: CanvasRenderingContext2D;
  } {
    const canvas = createCanvas(size, size);
    const ctx = canvas.getContext("2d");
    return { canvas, ctx };
  }

  protected applyGradient(
    ctx: CanvasRenderingContext2D,
    config: QRCodeConfiguration,
    size: number,
  ): string | CanvasGradient {
    if (!config.gradient) return config.foregroundColor;

    const { endColor, direction } = config.gradient;
    let gradient: CanvasGradient;

    switch (direction) {
      case "left-right":
        gradient = ctx.createLinearGradient(0, 0, size, 0);
        break;
      case "top-bottom":
        gradient = ctx.createLinearGradient(0, 0, 0, size);
        break;
      case "diagonal":
        gradient = ctx.createLinearGradient(0, 0, size, size);
        break;
      default:
        return config.foregroundColor;
    }

    gradient.addColorStop(0, config.foregroundColor);
    gradient.addColorStop(1, endColor);
    return gradient;
  }

  protected async loadLogoImage(logoBuffer: Buffer) {
    return await loadImage(logoBuffer);
  }

  protected canvasToBuffer(canvas: Canvas): Buffer {
    if (this.format === "jpg") {
      return canvas.toBuffer("image/jpeg", { quality: 0.9 });
    }
    return canvas.toBuffer("image/png");
  }
}
