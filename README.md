# Key Generator

A powerful, production-ready key generation platform for developers and security professionals, featuring multiple algorithms and secure client-side generation, built with React, TypeScript, and Tailwind CSS.

## 🎯 **EXACT FEATURES IMPLEMENTED**

### ✅ **Complete Functionality Match**

- **Cryptographically Secure Generation** - Uses Web Crypto API for production-grade security
- **Individual Generator Pages** - Each tool has its own dedicated page with custom URLs
- **Working Light/Dark Mode Toggle** - Functional theme switching with system preference detection
- **Dual Generation Capability** - Generate keys from both landing page AND individual tool pages
- **Mobile-Responsive Design** - Works perfectly across all devices
- **Navigation Menu** - Functional dropdown and mobile hamburger menus

### 🔐 **All 11 Key Generators**

1. **Secret Key Generator** (`/secret-key`) - Cryptographically secure keys (8-128 chars)
2. **API Key Generator** (`/api-key`) - Custom prefixes + secure random strings  
3. **Password Generator** (`/password`) - Strong passwords with customizable options
4. **JWT Secret Generator** (`/jwt-secret`) - Base64 encoded secrets for token signing
5. **UUID Generator** (`/uuid`) - RFC 4122 compliant v1 (time) and v4 (random)
6. **Random String Generator** (`/random-string`) - Multiple character sets
7. **Hex Color Generator** (`/hex-color`) - Random colors with live preview
8. **Base64 Generator** (`/base64`) - Random Base64 encoded strings
9. **Alphanumeric Generator** (`/alphanumeric`) - Letters and numbers only
10. **Numeric Generator** (`/numeric`) - Numbers only
11. **MAC Address Generator** (`/mac-address`) - Multiple formats (colon, hyphen, dot)

### 🛡️ **Security Features**

- **Web Crypto API** - Uses `crypto.getRandomValues()` for cryptographically secure generation
- **100% Client-Side** - No data transmission, complete privacy
- **Secure Fallbacks** - Graceful degradation for older browsers
- **Production Ready** - Suitable for generating real production keys

### 🎨 **Modern Tech Stack**

- **Vite** - Lightning fast build tool
- **React 18** - Latest React with hooks and concurrent features
- **TypeScript** - Full type safety and developer experience
- **Tailwind CSS** - Utility-first styling with dark mode support
- **Framer Motion** - Smooth animations and transitions
- **React Router** - Client-side routing for individual generator pages

## 🚀 **Getting Started**

### Development

```bash
pnpm install
pnpm run dev
```

### Production Build

```bash
pnpm run build
pnpm run preview
```

## 📁 **Project Structure**

```text
src/
├── components/          # Reusable UI components
│   ├── Layout.tsx      # Header, navigation, footer
│   ├── GeneratorCard.tsx   # Generator showcase cards
│   └── QuickGenerator.tsx  # Landing page quick generators
├── contexts/           # React contexts
│   └── ThemeContext.tsx    # Theme management
├── hooks/              # Custom React hooks
│   └── useKeyGenerator.ts  # Key generation logic
├── pages/              # Route components
│   ├── HomePage.tsx    # Landing page
│   └── GeneratorPage.tsx   # Individual generator pages
├── App.tsx             # Main application component
├── main.tsx           # Application entry point
└── index.css          # Global styles and Tailwind
```

## 🔗 **URL Structure**

### Individual Generator Pages

- `/secret-key` - Secret Key Generator
- `/api-key` - API Key Generator  
- `/password` - Password Generator
- `/jwt-secret` - JWT Secret Generator
- `/uuid` - UUID Generator
- `/random-string` - Random String Generator
- `/hex-color` - Hex Color Generator
- `/base64` - Base64 Generator
- `/alphanumeric` - Alphanumeric Generator
- `/numeric` - Numeric Generator
- `/mac-address` - MAC Address Generator

## 🎯 **Key Features Delivered**

### ✅ **Working Theme Toggle**

- Detects system preference automatically
- Manual toggle between light/dark/system modes
- Persistent theme storage in localStorage
- Smooth transitions between themes

### ✅ **Cryptographically Secure**

- Uses Web Crypto API's `crypto.getRandomValues()`
- RFC 4122 compliant UUIDs
- Production-grade security standards
- Fallback warnings for unsupported browsers

### ✅ **Responsive Design**

- Mobile-first approach
- Dropdown navigation on desktop
- Hamburger menu on mobile
- Touch-friendly interfaces

### ✅ **Performance Optimized**

- Vite for fast development and builds
- Code splitting with React Router
- Lazy loading where appropriate
- Minimal bundle size

## 🔧 **Customization Options**

Each generator includes customizable options:

- **Length controls** - Adjustable key lengths with sliders
- **Character sets** - Choose specific character types
- **Format options** - Different output formats where applicable
- **Prefix support** - Custom prefixes for API keys
- **Real-time updates** - Options update keys immediately

## 📱 **Browser Support**

- **Chrome** 37+ (full Web Crypto API support)
- **Firefox** 34+ (full Web Crypto API support)  
- **Safari** 10.1+ (full Web Crypto API support)
- **Edge** 79+ (full Web Crypto API support)
- **Older browsers** - Graceful fallback with security warnings

## 🛡️ **Security Notes**

- All key generation happens locally in the browser
- No data is ever transmitted to external servers
- Uses cryptographically secure random number generation
- Suitable for production use cases
- Zero data collection or storage

## 🎨 **Design System**

- **Colors** - Blue primary with gray neutrals
- **Typography** - Inter font family
- **Spacing** - Consistent Tailwind spacing scale
- **Animations** - Subtle Framer Motion transitions
- **Accessibility** - ARIA labels and keyboard navigation
