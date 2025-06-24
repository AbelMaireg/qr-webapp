import { AbstractQRCodeRenderer } from "./renderers/AbstractQRCodeRenderer";
import { CircleRenderer } from "./renderers/CircleRenderer";
import { RoundedRenderer } from "./renderers/RoundedRenderer";
import { SquareRenderer } from "./renderers/SquareRenderer";
import { OutputFormat, QRCodeConfiguration } from "./types/QRCodeConfiguration";

export class QRCodeRendererFactory {
  static createRenderer(
    config: QRCodeConfiguration,
    format: OutputFormat,
  ): AbstractQRCodeRenderer {
    switch (format) {
      case "png":
      case "jpg":
        return this.createShapeRenderer(config.cellShape, format);
      default:
        throw new Error(`Unsupported format: ${format}`);
    }
  }

  static createShapeRenderer(
    shape: string,
    format: OutputFormat,
  ): AbstractQRCodeRenderer {
    switch (shape) {
      case "square":
      case "margined":
        return new SquareRenderer(format);
      case "circle":
        return new CircleRenderer(format);
      case "rounded":
        return new RoundedRenderer(format);
      default:
        return new RoundedRenderer(format);
    }
  }
}
