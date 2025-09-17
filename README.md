# 🔮 Mystic Tarot - Free Online Tarot Card Readings

A beautiful, mystical tarot card reading web application built with Next.js 14, TypeScript, and Tailwind CSS. Experience the ancient art of tarot reading with our three-card Past, Present, Future spread.

![Mystic Tarot](https://img.shields.io/badge/Tarot-Mystical-purple?style=for-the-badge&logo=crystal&logoColor=gold)
![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=for-the-badge&logo=next.js&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-blue?style=for-the-badge&logo=typescript&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🎴 Complete Tarot Experience

- **Full 78-card deck** - All Major Arcana (22 cards) and Minor Arcana (56 cards)
- **Traditional meanings** - Both upright and reversed interpretations
- **Three-card spread** - Past, Present, Future divination
- **Random orientation** - Cards can appear upright or reversed

### 🌙 Mystical Interface

- **Dark mode by default** - Optimized for mystical atmosphere
- **Light/Dark toggle** - Switch themes with smooth animations
- **Framer Motion animations** - Smooth, magical transitions
- **Responsive design** - Works beautifully on all devices

### 📅 Daily Reading System

- **3 free readings per day** - Respects traditional tarot practice
- **LocalStorage tracking** - Readings persist between sessions
- **Daily limit enforcement** - Encourages mindful reading

### ♿ Accessibility & UX

- **Keyboard navigation** - Full keyboard support
- **Screen reader friendly** - Proper ARIA labels and semantics
- **Reduced motion support** - Respects user preferences
- **Focus management** - Clear visual focus indicators

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/your-username/tarot-prediction.git
   cd tarot-prediction
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```bash
npm run build
npm start
```

## 🏗️ Project Structure

```
├── app/                    # Next.js 14 App Router
│   ├── layout.tsx         # Root layout with theme provider
│   ├── page.tsx          # Landing page
│   ├── draw/             # Card drawing page
│   │   └── page.tsx
│   └── result/           # Reading results page
│       └── page.tsx
├── components/            # Reusable React components
│   ├── TarotCard.tsx     # Individual card component
│   ├── Deck.tsx          # Deck shuffling and drawing
│   ├── Interpretation.tsx # Reading interpretation
│   ├── ShareButton.tsx   # Social sharing
│   ├── AdBanner.tsx      # Monetization placeholder
│   └── ThemeToggle.tsx   # Dark/light mode toggle
├── lib/                  # Utilities and data
│   ├── cards.ts          # Complete 78-card tarot deck
│   ├── spreads.ts        # Spread definitions
│   ├── storage.ts        # LocalStorage management
│   ├── interpret.ts      # Card interpretation logic
│   ├── types.ts          # TypeScript definitions
│   └── theme-context.tsx # Theme management
├── styles/               # Global styles
│   └── globals.css       # Tailwind + custom CSS
└── public/               # Static assets
    └── cards/            # Card image placeholders
```

## 🎯 Core Functionality

### Card Drawing Flow

1. **Landing Page** → Brief intro + "Begin Reading" CTA
2. **Draw Page** → Shuffle deck → Draw 3 cards → Assign to Past/Present/Future
3. **Result Page** → Display cards + interpretations + sharing options

### Reading Interpretation

- **Individual card meanings** - Based on upright/reversed orientation
- **Spread-level interpretation** - Contextual analysis across all three cards
- **Overall theme analysis** - Considers Major/Minor Arcana distribution

### Daily Limit System

- **3 readings per calendar day** - Stored in localStorage
- **Graceful limit handling** - Clear messaging when limit reached
- **Automatic reset** - Fresh readings available each new day

## 🛠️ Development Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run format       # Format code with Prettier
npm run type-check   # TypeScript type checking
```

## 🎨 Customization

### Theme Colors

Customize the mystical color palette in `tailwind.config.js`:

```javascript
colors: {
  tarot: {
    gold: '#ffd700',
    purple: '#8b5cf6',
    midnight: '#1a1a2e',
    cosmic: '#16213e',
  }
}
```

### Card Data

Add or modify card interpretations in `lib/cards.ts`. Each card includes:

- Traditional name and arcana type
- Upright and reversed meanings
- Suit and number for Minor Arcana
- Image path for custom artwork

### Spreads

Create new reading spreads in `lib/spreads.ts`:

```typescript
export const CELTIC_CROSS: Spread = {
  id: 'celtic-cross',
  name: 'Celtic Cross',
  positions: [
    { id: 'present', name: 'Present Situation', description: '...' },
    // ... more positions
  ],
};
```

## 🔮 Roadmap

### Phase 1: Core Features ✅

- [x] Complete tarot deck with meanings
- [x] Three-card Past/Present/Future spread
- [x] Card shuffling and drawing mechanics
- [x] Basic interpretation system
- [x] Daily reading limits
- [x] Dark/light theme toggle
- [x] Responsive design
- [x] Accessibility features

### Phase 2: Enhanced Experience

- [ ] **AI-powered interpretations** - GPT integration for personalized readings
- [ ] **Multiple spread types** - Celtic Cross, One Card, Love spreads
- [ ] **Reading history** - View past readings and patterns
- [ ] **Custom card artwork** - Professional tarot card illustrations
- [ ] **Sound effects** - Ambient mystical audio

### Phase 3: Community & Monetization

- [ ] **User accounts** - Save readings, preferences, and history
- [ ] **Reading journal** - Personal notes and reflections
- [ ] **Premium features** - Unlimited readings, advanced spreads
- [ ] **Ad integration** - Respectful monetization strategy
- [ ] **Social sharing** - Enhanced sharing with card images

### Phase 4: Advanced Features

- [ ] **Multi-language support** - i18n for global audience
- [ ] **Backend integration** - User data persistence
- [ ] **Push notifications** - Daily reading reminders
- [ ] **Tarot learning** - Educational content about card meanings
- [ ] **Community features** - Share and discuss readings

## 🧪 Testing

### Manual Testing Checklist

- [ ] Landing page loads and displays correctly
- [ ] Theme toggle works across all pages
- [ ] Card drawing flow completes successfully
- [ ] Daily limit enforcement works
- [ ] Readings save and display correctly
- [ ] Share functionality works
- [ ] Responsive design on mobile/tablet
- [ ] Keyboard navigation accessible
- [ ] Screen reader compatibility

### Test Data Management

```javascript
// Clear all readings for testing
import { clearAllReadings } from '@/lib/storage';
clearAllReadings();
```

## 📱 Browser Support

- **Modern browsers** - Chrome 88+, Firefox 85+, Safari 14+, Edge 88+
- **Mobile browsers** - iOS Safari 14+, Chrome Mobile 88+
- **Accessibility** - WCAG 2.1 AA compliant
- **Performance** - Optimized for Core Web Vitals

## 🔧 Configuration

### Environment Variables

Create a `.env.local` file for local development:

```bash
# Google AdSense Configuration
# Replace with your actual AdSense publisher client ID
NEXT_PUBLIC_ADSENSE_CLIENT_ID=ca-pub-XXXXXXXXXXXXXXXX

# Optional: Add Google Analytics ID
NEXT_PUBLIC_GA_ID=your_ga_id

# Optional: Add error tracking
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn
```

### ESLint & Prettier

The project includes pre-configured linting and formatting:

- **ESLint** - Next.js recommended rules + Prettier integration
- **Prettier** - Consistent code formatting
- **TypeScript** - Strict type checking

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Tarot tradition** - Centuries of mystical wisdom
- **Open source community** - Amazing tools and libraries
- **Rider-Waite-Smith** - Traditional tarot card meanings
- **Framer Motion** - Beautiful animations
- **Tailwind CSS** - Utility-first styling
- **Next.js team** - Excellent React framework

## 📧 Support

If you have questions or need help:

- 📧 Email: support@mystictarot.com
- 🐛 Issues: [GitHub Issues](https://github.com/your-username/tarot-prediction/issues)
- 💬 Discussions: [GitHub Discussions](https://github.com/your-username/tarot-prediction/discussions)

---

_"The cards are a mirror reflecting the wisdom that already exists within you."_ 🔮✨
