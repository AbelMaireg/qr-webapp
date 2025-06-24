import { AbstractQRCodeRenderer } from "./renderers/AbstractQRCodeRenderer";
import { SquareRenderer } from "./renderers/SquareRenderer";
import { OutputFormat } from "./types/QRCodeConfiguration";

export class QRCodeRendererFactory {
  static createRenderer(format: OutputFormat): AbstractQRCodeRenderer {
    switch (format) {
      case "png":
      case "jpg":
        return new SquareRenderer(format);
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
      // TODO: Implement other shapes when needed
      // case "circle":
      //   return new CircleRenderer(format);
      // case "rounded":
      //   return new RoundedRenderer(format);
      default:
        return new SquareRenderer(format);
    }
  }
}
