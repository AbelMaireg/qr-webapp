import {
  QRCodeConfiguration,
  CellShape,
  GradientDirection,
} from "./types/QRCodeConfiguration";

export class QRCodeConfigurationBuilder {
  private config: Partial<QRCodeConfiguration> = {
    margin: 4,
  };

  setText(text: string): this {
    this.config.text = text;
    return this;
  }

  setSize(size: number): this {
    this.config.size = size;
    return this;
  }

  setForegroundColor(color: string): this {
    this.config.foregroundColor = color;
    return this;
  }

  setBackgroundColor(color: string): this {
    this.config.backgroundColor = color;
    return this;
  }

  setCellShape(shape: CellShape): this {
    this.config.cellShape = shape;
    return this;
  }

  setGradient(endColor: string, direction: GradientDirection): this {
    this.config.gradient = { endColor, direction };
    return this;
  }

  setLogo(logoBuffer: Buffer): this {
    this.config.logo = logoBuffer;
    return this;
  }

  setMargin(margin: number): this {
    this.config.margin = margin;
    return this;
  }

  build(): QRCodeConfiguration {
    if (!this.config.text) {
      throw new Error("Text is required");
    }
    if (!this.config.size) {
      throw new Error("Size is required");
    }
    if (!this.config.foregroundColor) {
      throw new Error("Foreground color is required");
    }
    if (!this.config.backgroundColor) {
      throw new Error("Background color is required");
    }
    if (!this.config.cellShape) {
      throw new Error("Cell shape is required");
    }

    return this.config as QRCodeConfiguration;
  }
}
