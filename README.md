# Advanced QR Code Generator

A modern, feature-rich QR code generator built with Next.js that allows users to create highly customizable QR codes with colors, gradients, logos, and different cell shapes. The project features a clean, responsive web interface and a robust backend API designed with enterprise-level architecture patterns.

## 🚀 Features

### Frontend Features
- **Intuitive Web Interface**: Clean, responsive design built with shadcn/ui components
- **Real-time Preview**: Instant QR code generation and preview
- **Color Customization**: Full color picker support for foreground and background colors
- **Gradient Support**: Linear gradients in multiple directions (left-right, top-bottom, diagonal)
- **Logo Embedding**: Upload and embed logos in the center of QR codes
- **Multiple Cell Shapes**: Choose from square, circle, rounded, or margined cell styles
- **Format Options**: Export as PNG or JPG with high quality
- **Drag & Drop**: Easy logo upload with file validation

### Backend Features
- **RESTful API**: Clean API endpoints for external integration
- **Design Patterns**: Enterprise-level architecture with Strategy, Builder, and Factory patterns
- **Type Safety**: Full TypeScript implementation with comprehensive type definitions
- **Error Handling**: Robust error handling and validation
- **File Processing**: Advanced image processing with canvas operations
- **Scalable Architecture**: Easy to extend with new features and renderers

## 🏗️ Project Architecture

The project follows modern software engineering principles and design patterns:

### Design Patterns Implemented

#### 1. **Builder Pattern**
```typescript
const config = new QRCodeConfigurationBuilder()
  .setText("Hello World")
  .setSize(512)
  .setForegroundColor("#000000")
  .setGradient("#ff0000", "left-right")
  .build();
```

#### 2. **Strategy Pattern**
Different rendering strategies for various cell shapes:
- `SquareRenderer` - Standard square cells
- `CircleRenderer` - Circular cells
- `RoundedRenderer` - Rounded corner cells

#### 3. **Factory Pattern**
```typescript
const renderer = QRCodeRendererFactory.createShapeRenderer(shape, format);
```

#### 4. **Service Pattern**
Business logic encapsulation in `QRCodeService`

### Project Structure

```
├── app/
│   ├── page.tsx                 # Main frontend application
│   ├── layout.tsx               # Root layout with Toaster
│   ├── globals.css              # Global styles
│   └── api/
│       └── qr/
│           ├── route.ts         # API endpoint handler
│           └── lib/
│               ├── types/       # TypeScript type definitions
│               ├── builder      # Builder pattern implementations
│               ├── renderers/   # Strategy pattern renderers
│               ├── factory      # Factory pattern implementations
│               └── service      # Business logic services
├── components/
│   └── ui/                      # shadcn/ui components
├── hooks/                       # Custom React hooks
└── lib/                         # Utility functions
```

### Technology Stack

- **Frontend**: Next.js 14, React, TypeScript, Tailwind CSS
- **UI Components**: shadcn/ui, Radix UI primitives
- **Backend**: Next.js API Routes, Node.js
- **Image Processing**: HTML5 Canvas API, node-canvas
- **QR Generation**: qrcode library
- **Notifications**: Sonner (toast notifications)
- **Build System**: Next.js built-in bundler, TypeScript compiler

## 🔌 API Documentation

### Base URL
```
https://domain.com/api
```

### Generate QR Code

**Endpoint:** `POST /api/qr`

**Content-Type:** `multipart/form-data`

**Parameters:**

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `text` | string | Yes | Text or URL to encode |
| `format` | string | Yes | Output format (`png` or `jpg`) |
| `foregroundColor` | string | No | Hex color for QR cells (default: `#000000`) |
| `backgroundColor` | string | No | Hex color for background (default: `#ffffff`) |
| `gradientColor` | string | No | End color for gradient |
| `gradientDirection` | string | No | Gradient direction (`left-right`, `top-bottom`, `diagonal`, `none`) |
| `cellShape` | string | No | Cell shape (`square`, `circle`, `rounded`, `margined`) |
| `logo` | file | No | Logo image file (max 2MB) |

**Example Request:**

```bash
curl -X POST https://domain.com/api/qr \\
  -F "text=https://example.com" \\
  -F "format=png" \\
  -F "foregroundColor=#000000" \\
  -F "backgroundColor=#ffffff" \\
  -F "gradientColor=#ff0000" \\
  -F "gradientDirection=left-right" \\
  -F "cellShape=circle" \\
  -F "logo=@logo.png"
```

**Response:**
- **Success (200)**: Returns binary image data
- **Error (400)**: Invalid parameters
- **Error (500)**: Server error

**Example with JavaScript:**

```javascript
const formData = new FormData();
formData.append('text', 'https://example.com');
formData.append('format', 'png');
formData.append('foregroundColor', '#000000');
formData.append('backgroundColor', '#ffffff');
formData.append('cellShape', 'circle');

const response = await fetch('/api/qr', {
  method: 'POST',
  body: formData
});

if (response.ok) {
  const blob = await response.blob();
  const url = URL.createObjectURL(blob);
  // Use the URL to display or download the QR code
}
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun package manager

### Installation Steps

1. **Clone the repository:**
```bash
git clone https://github.com/your-username/qr-code-generator.git
cd qr-code-generator
```

2. **Install dependencies:**
```bash
npm install
# or
yarn install
# or
bun install
```

3. **Run the development server:**
```bash
npm run dev
# or
yarn dev
# or
bun dev
```

4. **Open your browser:**
Navigate to `http://localhost:3000`

### Build for Production

```bash
npm run build
npm start
```

## 🧪 Development

### Project Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript compiler check
```

### Adding New Cell Shapes

1. Create a new renderer class extending `AbstractQRCodeRenderer`:

```typescript
// app/api/qr/lib/renderers/YourShapeRenderer.ts
export class YourShapeRenderer extends AbstractQRCodeRenderer {
  async render(matrix: QRCodeMatrix, config: QRCodeConfiguration): Promise<Buffer> {
    // Implement your custom rendering logic
  }
}
```

2. Update the factory:

```typescript
// app/api/qr/lib/factories/QRCodeRendererFactory.ts
case "yourshape":
  return new YourShapeRenderer(format);
```

3. Add the option to the frontend:

```tsx
<SelectItem value="yourshape">Your Shape</SelectItem>
```

### Adding New Output Formats

1. Extend the `OutputFormat` type:

```typescript
export type OutputFormat = "png" | "jpg" | "webp"
```

2. Update the `canvasToBuffer` method in `AbstractQRCodeRenderer`

3. Add the format option to the frontend

## 🤝 Contributing

We welcome contributions! Please follow these guidelines:

### Getting Started

1. **Fork the repository**
2. **Create a feature branch:**
```bash
git checkout -b feature/amazing-feature
```

3. **Make your changes**
4. **Follow the coding standards:**
   - Use TypeScript for all new code
   - Follow the existing code style
   - Add proper type definitions
   - Include error handling

5. **Test your changes:**
```bash
npm run build
npm run lint
```

6. **Commit your changes:**
```bash
git commit -m "Add amazing feature"
```

7. **Push to your branch:**
```bash
git push origin feature/amazing-feature
```

8. **Open a Pull Request**

### Code Style Guidelines

- **TypeScript**: Use strict typing, avoid `any`
- **Naming**: Use descriptive names for variables and functions
- **Comments**: Add JSDoc comments for public methods
- **Error Handling**: Always handle errors gracefully
- **Design Patterns**: Follow existing architectural patterns

### Areas for Contribution

- **New Cell Shapes**: Implement creative QR cell designs
- **Export Formats**: Add support for WebP, TIFF, etc.
- **Performance**: Optimize rendering performance
- **UI/UX**: Improve user interface and experience
- **Documentation**: Improve docs and add examples
- **Testing**: Add unit and integration tests
- **Accessibility**: Improve accessibility features

### Reporting Issues

Please use the GitHub issue tracker to report bugs or request features. Include:

- Clear description of the issue
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable
- Environment details (OS, Node.js version, etc.)

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [qrcode](https://github.com/soldair/node-qrcode) - QR code generation library
- [canvas](https://github.com/Automattic/node-canvas) - HTML5 Canvas API for Node.js
- [shadcn/ui](https://ui.shadcn.com/) - Beautiful UI components
- [Next.js](https://nextjs.org/) - React framework
- [Sonner](https://sonner.emilkowal.ski/) - Toast notifications

## 📞 Support

If you have questions or need help:

- 📧 Email: abelrighthere@gmail.com
- 💬 Telegram: @AbelMaireg
- 📖 Documentation: [Go To](https://github.com/Zemenaytech/qrcodegenerator)
- 🐛 Issues: [GitHub Issues](https://github.com/Zemenaytech/qrcodegenerator/issues)

---

**Made with ❤️ by Abel Maireg & Fiori Abebe**
```

This comprehensive README covers all aspects of your QR code generator project, including:

- **Project overview** with feature highlights
- **Detailed architecture** explanation with design patterns
- **Complete API documentation** for external users
- **Installation instructions** with system dependencies
- **Development guidelines** and contribution process
- **Build system** information and project structure

The README is structured to be helpful for both end users wanting to use the API and developers wanting to contribute to the project.
