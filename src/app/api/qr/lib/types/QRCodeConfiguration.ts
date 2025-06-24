import { QRCodeErrorCorrectionLevel } from "qrcode";

export type CellShape = "square" | "circle" | "rounded" | "margined";
export type GradientDirection = "left-right" | "top-bottom" | "diagonal";
export type OutputFormat = "png" | "jpg";

export interface QRCodeConfiguration {
  text: string;
  size: number;
  foregroundColor: string;
  backgroundColor: string;
  cellShape: CellShape;
  gradient?: {
    endColor: string;
    direction: GradientDirection;
  };
  logo?: Buffer;
  margin: number;
  errorCorrectionLevel: QRCodeErrorCorrectionLevel;
}
