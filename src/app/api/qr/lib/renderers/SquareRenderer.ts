import { AbstractQRCodeRenderer } from "./AbstractQRCodeRenderer";
import type { QRCodeConfiguration } from "../types/QRCodeConfiguration";
import QRCodeMatrix from "../types/QRCodeMatrix";

export class SquareRenderer extends AbstractQRCodeRenderer {
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
          const x = config.margin + col * cellSize;
          const y = config.margin + row * cellSize;

          if (config.cellShape === "margined") {
            const margin = Math.max(1, Math.floor(cellSize * 0.1));
            ctx.fillRect(
              x + margin,
              y + margin,
              cellSize - margin * 2,
              cellSize - margin * 2,
            );
          } else {
            ctx.fillRect(x, y, cellSize, cellSize);
          }
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
      ctx.fillRect(
        logoX - padding,
        logoY - padding,
        logoSize + padding * 2,
        logoSize + padding * 2,
      );

      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    } catch (error) {
      console.error("Error adding logo:", error);
    }
  }
}
