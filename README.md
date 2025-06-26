# Advanced QR Code Generator

A modern, feature-rich QR code generator built with Next.js 15, featuring advanced customization options, session management, and a clean modular architecture.


## 🚀 Features

### Core Functionality
- **Text/URL Encoding**: Generate QR codes from any text or URL
- **Multiple Output Formats**: Export as PNG or JPG
- **High Resolution**: Generate crisp, high-quality QR codes (512x512px)

### Advanced Customization
- **Custom Colors**: Choose any foreground and background colors
- **Gradient Support**: Create beautiful gradients (left-right, top-bottom, diagonal)
- **Cell Shapes**: Square, Circle, Rounded, or Margined cell styles
- **Logo Embedding**: Add your brand logo to the center of QR codes
- **Adjustable Margins**: Control spacing around the QR code
- **Error Correction Levels**: Low (7%), Medium (15%), Quartile (25%), High (30%)

### User Experience
- **Session Management**: Save and restore user sessions with cookie consent
- **Generation History**: View and reload previous QR code configurations
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Real-time Preview**: See your QR code update as you customize
- **Toast Notifications**: Clear feedback for all user actions

### Technical Features
- **Modular Architecture**: Clean, maintainable component structure
- **Custom Hooks**: Reusable logic with `useQRGenerator` and `useSession`
- **Type Safety**: Full TypeScript implementation
- **Design Patterns**: Builder, Strategy, and Factory patterns in backend
- **Database Integration**: PostgreSQL with Prisma ORM
- **Canvas Rendering**: High-performance QR code generation using HTML5 Canvas


## 🏗️ Project Architecture

### Frontend Components
- **QRCodeForm**: Text input component
- **CustomizationPanel**: All customization controls
- **PreviewPanel**: QR code preview and download
- **HistorySidebar**: Session history management
- **FeatureCards**: Feature showcase
- **PageHeader**: Page title and navigation

### Backend Services
- **QRCodeService**: Core QR code generation logic
- **QRCodeConfigurationBuilder**: Builder pattern for configuration
- **QRCodeRendererFactory**: Factory pattern for different renderers
- **AbstractQRCodeRenderer**: Base class for rendering strategies

### Rendering Strategies
- **SquareRenderer**: Standard square cells with margin support
- **CircleRenderer**: Circular cell rendering
- **RoundedRenderer**: Rounded corner cells with spacing

### Database Schema
- **client_sessions**: User session management
- **qrc_gen_logs**: QR code generation history and analytics


## 🔌 API Documentation

### QR Code Generation
```bash
curl -X POST https://domain.com/api/qr \\
  -F "text=https://example.com" \\
  -F "format=png" \\
  -F "foregroundColor=#000000" \\
  -F "backgroundColor=#ffffff" \\
  -F "gradientColor=#ff0000" \\
  -F "gradientDirection=left-right" \\
  -F "cellShape=circle" \\
  -F "logo=@logo.png" \\
  -F "margin=2" \\
  -F "errorCorrectionLevel=M"
```

### Session Management
```
GET /api/session - Check existing session
POST /api/session - Create new session
```

### History Management
```
GET /api/history?sessionId={id} - Get session history
DELETE /api/history - Clear session history
```


## 🛠️ Installation & Setup

### Prerequisites
- Node.js 18+ 
- Docker (for PostgreSQL)
- Make (for development shortcuts)

### Local Development Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

3. **Set up the database**
   ```bash
   # Start PostgreSQL with Docker using the development shortcut
   make build-up-dev
   ```

4. **Configure environment variables**
   Create a `.env` file:
   ```env
   DATABASE_URL="postgresql://username:password@localhost:5432/qr_app_db"
   ```

5. **Run database migrations**
   ```bash
   npx prisma migrate dev
   npx prisma generate
   ```

6. **Start the development server**
   ```bash
   bun run dev
   ```

7. **Open your browser**
   Navigate to `http://localhost:3000`

### Production Deployment

1. **Build the application**
   ```bash
   bun run build
   ```

2. **Start the production server**
   ```bash
   bun start
   ```


## 🧪 Development

### Project Structure
```
.
├── generated/
├── hooks/
├── prisma/
├── public/
├── src
│   ├── app
│   │   ├── api
│   │   │   ├── history
│   │   │   ├── qr
│   │   │   │   ├── lib
│   │   │   │   │   ├── renderers/
│   │   │   │   │   ├── types/
│   │   │   │   │   ├── QRCodeConfigurationBuilder.ts
│   │   │   │   │   ├── QRCodeService.ts
│   │   │   │   │   └── QRCodeRendererFactory.ts
│   │   │   │   └── route.ts
│   │   │   └── session
│   │   └── ...
│   ├── components/
│   └── lib/
└── ...
```

### Available Scripts
- `bun dev`     - Start development server
- `bun build`   - Build for production
- `bun start`   - Start production server
- `bun lint`    - Run ESLint
- `make build-up-dev` - Start Docker PostgreSQL for development

### Adding New Features

1. **New Customization Options**: Add to `CustomizationPanel` component and update the `useQRGenerator` hook
2. **New Cell Shapes**: Create a new renderer class extending `AbstractQRCodeRenderer`
3. **New Export Formats**: Update the `QRCodeRendererFactory` and renderer implementations
4. **Database Changes**: Update the Prisma schema and run migrations

## Technologies Used

### Frontend
- **Next.js 15** - React framework with App Router
- **TypeScript** - Type safety and better developer experience
- **Tailwind CSS** - Utility-first CSS framework
- **shadcn/ui** - Modern UI component library
- **Sonner** - Toast notifications
- **Lucide React** - Icon library

### Backend
- **Node.js** - JavaScript runtime
- **Canvas** - HTML5 Canvas API for QR code rendering
- **QRCode** - QR code generation library
- **Prisma** - Database ORM
- **PostgreSQL** - Primary database

### Development Tools
- **Docker** - Containerized PostgreSQL for development
- **Make** - Development workflow automation
- **ESLint** - Code linting
- **Prettier** - Code formatting


## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git switch -c feature/amazing-feature`)
3. Make your changes following the existing code style
4. Add tests for new functionality
5. Commit your changes (`git commit -m 'feat: Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a Pull Request

### Code Style Guidelines
- Use TypeScript for all new code
- Follow the existing component structure
- Add proper type definitions
- Include JSDoc comments for complex functions
- Use meaningful variable and function names


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

- 📧 Email: [abelrighthere@gmail.com](https://https://gmail.com)
- 💬 Telegram: [@AbelMaireg](https://t.me/AbelMaireg)
- 📖 Documentation: [Go To](https://github.com/Zemenaytech/qrcodegenerator)
- 🐛 Issues: [GitHub Issues](https://github.com/Zemenaytech/qrcodegenerator/issues)

---

**Made with ❤️ by Abel Maireg & Fiori Abebe**
