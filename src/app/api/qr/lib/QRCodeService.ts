import QRCode from "qrcode";
import { QRCodeConfiguration } from "./types/QRCodeConfiguration";
import { AbstractQRCodeRenderer } from "./renderers/AbstractQRCodeRenderer";
import { QRCodeRendererFactory } from "./QRCodeRendererFactory";
import QRCodeMatrix from "./types/QRCodeMatrix";

export class QRCodeService {
  async generateQRCode(
    config: QRCodeConfiguration,
    renderer?: AbstractQRCodeRenderer,
  ): Promise<Buffer> {
    try {
      const matrix = await this.generateMatrix(config.text);

      const qrRenderer =
        renderer ||
        QRCodeRendererFactory.createShapeRenderer(config.cellShape, "png");

      return await qrRenderer.render(matrix, config);
    } catch (error) {
      throw new Error(`Failed to generate QR code: ${error}`);
    }
  }

  private async generateMatrix(text: string): Promise<QRCodeMatrix> {
    try {
      const qrData = QRCode.create(text, { errorCorrectionLevel: "M" });
      const modules = qrData.modules;

      const size = modules.size;
      const data: boolean[][] = [];

      for (let row = 0; row < size; row++) {
        data[row] = [];
        for (let col = 0; col < size; col++) {
          data[row][col] = modules.get(row, col) === 1;
        }
      }

      return { data, size };
    } catch (error) {
      throw new Error(`Failed to generate QR matrix: ${error}`);
    }
  }
}
