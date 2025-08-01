import { QRCodeConfiguration } from "../types/QRCodeConfiguration";
import QRCodeMatrix from "../types/QRCodeMatrix";
import { AbstractQRCodeRenderer } from "./AbstractQRCodeRenderer";

export class RoundedRenderer extends AbstractQRCodeRenderer {
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

          // Add margin between cells
          const cellMargin = Math.max(1, Math.floor(cellSize * 0.1));
          const actualCellSize = cellSize - cellMargin * 2;
          const radius = actualCellSize * 0.2;

          this.drawRoundedRect(
            ctx,
            x + cellMargin,
            y + cellMargin,
            actualCellSize,
            actualCellSize,
            radius,
          );
        }
      }
    }

    if (config.logo) {
      await this.addLogo(ctx, config.logo, actualSize);
    }

    return this.canvasToBuffer(canvas);
  }

  private drawRoundedRect(
    ctx: any,
    x: number,
    y: number,
    width: number,
    height: number,
    radius: number,
  ) {
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
    ctx.fill();
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
      this.drawRoundedRect(
        ctx,
        logoX - padding,
        logoY - padding,
        logoSize + padding * 2,
        logoSize + padding * 2,
        10,
      );

      ctx.drawImage(logoImage, logoX, logoY, logoSize, logoSize);
    } catch (error) {
      console.error("Error adding logo:", error);
    }
  }
}
