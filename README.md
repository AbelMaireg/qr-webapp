# Advanced QR Code Generator

A modern, feature-rich QR code generator built with Next.js 15, TypeScript, and Tailwind CSS. Create customizable QR codes with colors, gradients, logos, and various shapes while maintaining high quality and performance.

## ✨ Features

### 🎨 Customization Options
- **Custom Colors**: Choose any foreground and background colors
- **Gradients**: Apply beautiful gradients in multiple directions (left-right, top-bottom, diagonal)
- **Cell Shapes**: Square, circle, rounded, or margined cell styles
- **Logo Embedding**: Add your brand logo to QR codes with automatic error correction adjustment
- **Error Correction Levels**: Low (7%), Medium (15%), Quartile (25%), High (30%)
- **Output Formats**: High-quality PNG and JPG downloads
- **Custom Margins**: Adjustable spacing around QR codes

### 🚀 Advanced Features
- **Generation History**: Save and reload previous QR code configurations
- **Session Management**: Persistent sessions with cookie consent
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile
- **Dark/Light Mode**: Automatic theme switching with system preference
- **SEO Optimized**: Complete meta tags, structured data, and sitemap
- **Google AdSense Integration**: Monetization support with environment-based configuration
- **Real-time Preview**: Instant QR code generation and preview

### 🛠 Technical Features
- **Next.js 15**: Latest App Router with server components
- **TypeScript**: Full type safety throughout the application
- **Prisma ORM**: Database management with PostgreSQL
- **Canvas Rendering**: High-quality QR code generation using HTML5 Canvas
- **Modular Architecture**: Clean, maintainable code structure
- **Performance Optimized**: Fast loading and generation times

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ 
- PostgreSQL database
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd qr-code-generator
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure your environment variables:
   ```env
    DATABASE_URL="postgresql://dbusername:password@localhost:5432/qr_app_db?schema=public"
    NODE_ENV="development"
    NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID="ca-pub-XXXXXXXXXXXXXXXXX"

    # Next.js Configuration
    NEXT_PUBLIC_SITE_URL=https://your-domain.com

    # Google Analytics Configuration
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

    # SEO Verification
    NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-google-verification-code
    NEXT_PUBLIC_YANDEX_VERIFICATION=your-yandex-verification-code
    NEXT_PUBLIC_YAHOO_VERIFICATION=your-yahoo-verification-code
   ```

4. **Set up the database**
   ```bash
   # Start PostgreSQL (using Docker Compose)
   make up
   
   # Generate Prisma client
   npx prisma generate
   
   # Run database migrations
   npx prisma db push
   ```

5. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

6. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🐳 Docker Development

Use the included Docker Compose setup for easy development:

```bash
# Start PostgreSQL database
make up

# Stop database
make down

# Build and start
make build-up
```

## 📖 Usage

### Basic QR Code Generation

1. **Enter Content**: Type your text, URL, or any content in the input field
2. **Customize Appearance**: Choose colors, gradients, and cell shapes
3. **Add Logo** (Optional): Upload your brand logo for professional QR codes
4. **Generate**: Click "Generate QR Code" to create your custom QR code
5. **Download**: Save your QR code in PNG or JPG format

### Advanced Features

#### History Management
- **Auto-save**: Generated QR codes are automatically saved to history
- **Quick Reload**: Click any history item to reload its configuration
- **Session Persistence**: History persists across browser sessions
- **Privacy Control**: Cookie consent required for history features

#### Logo Integration
- **Automatic Optimization**: Error correction level automatically set to High when logo is added
- **Size Validation**: Maximum 2MB file size with format validation
- **Professional Appearance**: Logos are centered with proper padding

#### Customization Tips
- **High Error Correction**: Use High (30%) level for QR codes with logos
- **Gradient Effects**: Experiment with different gradient directions for visual appeal
- **Color Contrast**: Ensure sufficient contrast between foreground and background
- **Margin Settings**: Add margins for better scanning reliability

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `NEXT_PUBLIC_SITE_URL` | Your site's URL for SEO | Yes |
| `DATABASE_URL` | PostgreSQL connection string | Yes |
| `NEXT_PUBLIC_GOOGLE_ADSENSE_PUBLISHER_ID` | Google AdSense Publisher ID | No |
| `NEXT_PUBLIC_GA_ID` | Google Analytics ID | No |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Google Search Console verification | No |

### Database Schema

The application uses PostgreSQL with the following main tables:
- `client_sessions`: User session management
- `qrc_gen_logs`: QR code generation history and analytics

### AdSense Integration

Configure Google AdSense for monetization:
1. Set up your AdSense account
2. Add your Publisher ID to environment variables
3. Ad slots are pre-configured in the application
4. Ads display in feature sections and generation popup

## 🏗 Architecture

### Project Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   ├── page.tsx          # Home page
│   ├── robots.ts         # SEO robots.txt
│   └── sitemap.ts        # SEO sitemap
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   └── ...               # Custom components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
└── ...
```

### Key Components
- **QRCodeService**: Core QR code generation logic
- **Renderers**: Different cell shape rendering (Square, Circle, Rounded)
- **ConfigurationBuilder**: QR code configuration management
- **HistorySidebar**: Session-based history management
- **ThemeProvider**: Dark/light mode support

## 🎨 Customization

### Adding New Cell Shapes
1. Create a new renderer in `src/app/api/qr/lib/renderers/`
2. Extend `AbstractQRCodeRenderer`
3. Register in `QRCodeRendererFactory`

### Modifying Color Schemes
- Update `tailwind.config.ts` for new color variables
- Modify `globals.css` for theme definitions
- Add new color options in customization panel

### SEO Configuration
- Update meta tags in `layout.tsx`
- Modify structured data in the layout
- Configure sitemap URLs in `sitemap.ts`

## 🚀 Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Configure environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Deployment
```bash
# Build the application
npm run build

# Start production server
npm start
```

### Database Setup
- Set up PostgreSQL database
- Run Prisma migrations
- Configure connection string in environment variables

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow TypeScript best practices
- Use ESLint and Prettier for code formatting
- Write meaningful commit messages
- Test your changes thoroughly
- Update documentation as needed

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI component library
- [Tailwind CSS](https://tailwindcss.com/) - CSS framework
- [Prisma](https://prisma.io/) - Database ORM
- [QRCode.js](https://github.com/soldair/node-qrcode) - QR code generation
- [Canvas API](https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API) - Image rendering

## 📞 Support

If you encounter any issues or have questions:
1. Check the [Issues](../../issues) page for existing solutions
2. Create a new issue with detailed information
3. For urgent matters, contact support at vercel.com/help

---

**Made with ❤️ by Abel Maireg**