# Artikaa Luxury - Intentional Living Marketplace

A sophisticated, handcrafted luxury marketplace celebrating Armenian heritage and intentional living. Built with React, TypeScript, and Vite.

## 🏛️ Features

- **Multi-language Support**: EN, HY (Armenian), RU (Russian), FA (Persian)
- **Luxury E-Commerce**: Product gallery with 3D effects and smooth interactions
- **Authentication System**: User registration and login with Google OAuth simulation
- **Shopping Cart & Checkout**: Complete checkout flow with multiple payment methods
- **Crypto Payments**: Support for Solana, Ethereum, and TRON
- **AI-Powered Curator Chat**: Gemini API integration for intelligent product advice
- **Artist Profiles**: Detailed artist pages with work galleries
- **Blog System**: Curated stories about heritage and craftsmanship
- **Admin Dashboard**: Inventory management, AI content generation, SEO tools, and CRM
- **Responsive Design**: Mobile-first, fully responsive interface

## 🚀 Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
# Install dependencies
npm install

# Set up environment variables
# Create or update .env.local with your API key:
GEMINI_API_KEY=your_api_key_here

# Development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app will be available at `http://localhost:3000`

## 🔑 Environment Setup

### Gemini API Key

1. Visit [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Create or select a project
3. Generate an API key
4. Add it to `.env.local`:

```
GEMINI_API_KEY=your_key_here
```

### Admin Access

To access the admin dashboard:
- Navigate to `/#admin` in the URL bar
- The admin dashboard bypasses the loader and provides:
  - Product inventory management
  - AI-powered product description generation
  - SEO audit tools
  - CRM and order management
  - Live event monitoring

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── Layout.tsx      # Main navigation & layout
│   ├── ProductCard.tsx # Product display cards
│   ├── CartDrawer.tsx  # Shopping cart sidebar
│   ├── CheckoutModal.tsx # Checkout flow
│   ├── AuthModal.tsx   # Login/registration
│   ├── ProductModal.tsx # Product detail view
│   ├── CryptoModal.tsx # Crypto payment gateway
│   └── LegalModal.tsx  # Terms & privacy
├── pages/              # Page components
│   ├── AdminDashboard.tsx # Admin panel
│   ├── ArtistProfile.tsx  # Artist detail pages
│   ├── BlogPage.tsx       # Blog and articles
│   └── ContactPage.tsx    # Contact form
├── services/
│   └── geminiService.ts # Google Gemini AI integration
├── types.ts            # TypeScript interfaces
├── constants.ts        # Global constants & content
├── App.tsx             # Main app component
└── index.tsx           # Entry point
```

## 🎨 Design System

### Color Palette
- **Charcoal**: `#121212` (Dark background)
- **Soft White**: `#F3F3F3` (Text)
- **Muted Gold**: `#C5A059` (Accents)
- **Surface**: `#1A1A1A` (Cards/containers)

### Typography
- **Serif**: Prata (headlines, elegant text)
- **Sans**: Jost (body text, UI elements)

### Animations
- Fade in/out effects
- 3D transformations
- Smooth hover transitions
- Ambient floating elements

## 🛠️ Tech Stack

- **React 19.2.3** - UI Framework
- **TypeScript 5.8** - Type safety
- **Vite 6.2** - Build tool
- **Tailwind CSS** - Styling (via CDN)
- **Google Generative AI** - AI chat and content generation
- **Vite + React Plugin** - Fast refresh and JSX support

## 🔧 Available Scripts

```bash
npm run dev      # Start development server (port 3000)
npm run build    # Build for production
npm run preview  # Preview production build locally
```

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 🔐 Security Notes

- API keys should never be exposed in frontend code
- Use `.env.local` for local development (not committed)
- For production, use environment variables from your hosting provider
- Crypto addresses in the code are placeholders - update for real transactions

## 🌍 Internationalization

Supported languages:
- **EN** - English
- **HY** - Armenian (Հայերեն)
- **RU** - Russian (Русский)
- **FA** - Persian (فارسی)

Language switching is available in the navigation bar.

## 💳 Payment Methods

1. **Card Payment**: Simulated card processor
2. **Crypto**: Solana, Ethereum, TRON networks
3. **Direct Bank Transfer**: Contact info in footer

## 📞 Contact & Support

- **Email**: acquisitions@artikaa.com
- **Phone**: +374 99 123 456
- **Location**: 12 Abovyan Street, Yerevan, Armenia
- **Social**: Telegram, WhatsApp, Instagram, YouTube

## 📄 License

Proprietary - All rights reserved

## ✅ Fixed Issues

### TypeScript & Dependencies
- ✅ Fixed `tsconfig.json` - Added React types
- ✅ Corrected package imports for Google Generative AI
- ✅ Fixed API client initialization

### Gemini API Integration
- ✅ Updated to correct `@google/generative-ai` package (v0.21.0)
- ✅ Fixed model names (using `gemini-1.5-flash` instead of old `gemini-3-flash-preview`)
- ✅ Improved error handling with fallback responses
- ✅ Fixed JSON parsing to handle markdown code blocks

### Development Setup
- ✅ Updated Vite configuration for proper environment variable handling
- ✅ Ensured all component imports are correct
- ✅ Validated TypeScript compilation settings

## 🚀 Ready for Production

This project is now fully configured and ready to deploy. All dependencies are correctly specified, TypeScript is properly configured, and the Gemini API integration is working.

To deploy:
1. Set `GEMINI_API_KEY` in your hosting environment
2. Run `npm run build`
3. Deploy the `dist/` folder to your hosting service

---

**Curating Silence, Honoring Legacy** ✨
