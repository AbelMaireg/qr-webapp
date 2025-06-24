import { QRCodeConfiguration } from "../types/QRCodeConfiguration";
import QRCodeMatrix from "../types/QRCodeMatrix";
import { AbstractQRCodeRenderer } from "./AbstractQRCodeRenderer";

export class CircleRenderer extends AbstractQRCodeRenderer {
  async render(
    matrix: QRCodeMatrix,
    config: QRCodeConfiguration,
  ): Promise<Buffer> {
    const totalSize = config.size;
    const cellSize = Math.floor((totalSize - config.margin * 2) / matrix.size);
    const actualSize = cellSize * matrix.size + config.margin * 2;

    const { canvas, ctx } = this.createCanvas(actualSize);

    ctx.fillStyle = config.backgroundColor;
    ctx.fillRect(0, 0, actualSize, actualSize);
    ctx.fillStyle = this.applyGradient(ctx, config, actualSize);

    for (let row = 0; row < matrix.size; row++) {
      for (let col = 0; col < matrix.size; col++) {
        if (matrix.data[row][col]) {
          const centerX = config.margin + col * cellSize + cellSize / 2;
          const centerY = config.margin + row * cellSize + cellSize / 2;
          const radius = (cellSize / 2) * 0.8; // Slightly smaller to avoid overlap

          ctx.beginPath();
          ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
          ctx.fill();
        }
      }
    }

    if (config.logo) {
      await this.addLogo(ctx, config.logo, actualSize);
    }

    return this.canvasToBuffer(canvas);
  }

  private async addLogo(
    ctx: any,
    logoBuffer: Buffer,
    canvasSize: number,
  ): Promise<void> {
    try {
      const logoImage = await this.loadLogoImage(logoBuffer);
      const logoSize = Math.floor(canvasSize * 0.2);
      const logoX = (canvasSize - logoSize) / 2;
      const logoY = (canvasSize - logoSize) / 2;

      const padding = 8;
      ctx.fillStyle = "#ffffff";
      ctx.beginPath();
      ctx.arc(
        logoX + logoSize / 2,
        logoY + logoSize / 2,
        logoSize / 2 + padding,
        0,
        2 * Math.PI,
      );
      ctx.fill();

      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    } catch (error) {
      console.error("Error adding logo:", error);
    }
  }
}
