# QuickLiquor - Premium On-Demand Alcohol Delivery Platform

🍺 A modern, mobile-first web app demo for an on-demand alcohol ordering platform that partners with licensed local liquor retailers.

## 🎯 Product Overview

QuickLiquor connects customers with nearby licensed liquor retailers for fast, compliant doorstep delivery. The platform emphasizes:

- **Premium & Trustworthy** — Licensed retailers only, age verification required
- **Fast & Simple** — Blinkit-inspired UX with minimal friction
- **Compliant & Safe** — Built-in age-gating, license verification, responsible consumption messaging
- **Urban & Modern** — Clean design, smooth animations, one-tap shopping

## 📱 Core Features

✅ **Authentication** — Phone OTP login with age compliance check
✅ **Location-Based Discovery** — Find nearby licensed stores by GPS or address
✅ **Product Browsing** — Categories (Beer, Wine, Spirits, RTDs, Snacks), search, filters
✅ **One-Tap Shopping** — Add to cart with instant quantity controls
✅ **Persistent Cart** — Floating cart button for fast checkout
✅ **Age Verification** — Mandatory gate before payment
✅ **Multiple Payment Methods** — UPI, Cards, Wallet, COD
✅ **Order Tracking** — Real-time delivery status with ETA
✅ **Order History** — Reorder favorites, past orders
✅ **Compliance Messaging** — License info, responsible consumption, ID verification at delivery

## 🎨 Design System

### Colors
- **Primary:** `#FF6B35` (Bold Orange-Red)
- **Secondary:** `#004E89` (Deep Blue)
- **Success:** `#10B981` (Green)
- **Warning:** `#F59E0B` (Amber)
- **Dark:** `#1A1A1A` (Almost Black)
- **Light:** `#F8F9FA` (Off-White)

### Typography
- **Font:** Inter (system-ui fallback)
- **Weights:** 400, 500, 600, 700, 800

### Components
- Rounded cards (12px–16px)
- Smooth transitions (200ms)
- Mobile-first responsive
- Elegant subtle gradients
- Clear visual hierarchy

## 📁 Project Structure

```
quickliquor-demo/
├── pages/                  # Next.js pages (SSG/SSR)
│   ├── _app.tsx           # App wrapper
│   ├── _document.tsx      # HTML structure
│   ├── index.tsx          # Home/dashboard
│   ├── splash.tsx         # Splash screen
│   ├── login.tsx          # Phone OTP login
│   ├── location.tsx       # Location permission
│   ├── store/[id].tsx     # Store detail page
│   ├── cart.tsx           # Shopping cart
│   ├── age-verification.tsx  # Age gate
│   ├── payment.tsx        # Payment methods
│   ├── order/[id].tsx     # Order confirmation
│   └── tracking/[id].tsx  # Live tracking
├── components/            # Reusable React components
│   ├── Button.tsx
│   ├── Header.tsx
│   ├── ProductCard.tsx
│   ├── StoreCard.tsx
│   ├── Cart.tsx
│   ├── CartDrawer.tsx
│   ├── FloatingCart.tsx
│   ├── CategoryChip.tsx
│   └── OfferBanner.tsx
├── lib/                   # Utilities & state
│   ├── types.ts          # TypeScript interfaces
│   ├── store.ts          # Zustand state management
│   └── mockData.ts       # Mock stores & products
├── styles/
│   └── globals.css       # Tailwind + custom styles
├── public/               # Static assets
├── tailwind.config.js    # Tailwind configuration
├── postcss.config.js     # PostCSS setup
├── tsconfig.json         # TypeScript config
├── next.config.js        # Next.js config
└── package.json          # Dependencies
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone the repo
git clone https://github.com/clazloceo26-max/quickliquor-demo.git
cd quickliquor-demo

# Install dependencies
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 📖 User Flows

### Onboarding Flow
1. **Splash Screen** → Logo + tagline (2.5s auto-redirect)
2. **Login** → Phone OTP authentication
3. **Location** → GPS or manual address entry
4. **Home Dashboard** → Store discovery + categories

### Shopping Flow
1. **Browse** → Category chips, search, nearby stores
2. **Store Detail** → Products, ratings, delivery time
3. **Add to Cart** → One-tap with quantity controls
4. **Floating Cart** → Always visible bottom action
5. **Cart Review** → Edit items, apply promo codes
6. **Age Verification** → Compliance gate
7. **Payment** → UPI, Card, Wallet, COD
8. **Order Confirmation** → ID verification notice
9. **Live Tracking** → Real-time status + ETA

### Compliance & Safety
- ✅ Age verification before checkout
- ✅ License number displayed on stores
- ✅ Compliance messaging on every transaction
- ✅ ID verification reminder at order confirmation
- ✅ Responsible consumption notice
- ✅ Licensed retailer clearly marked

## 🛠️ Tech Stack

- **Framework:** Next.js 14 (React 18)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Zustand
- **Icons:** Lucide React
- **Deployment:** Vercel (recommended)

## 📱 Responsive Design

- **Mobile-First** — Optimized for 320px–480px screens
- **Tablet** — 768px+ layouts
- **Desktop** — Full responsive experience
- **Bottom Navigation** — FAB-style floating cart
- **Sticky Headers** — Search & location always accessible

## 🎬 Live Demo & Deployment

Deploy to Vercel in one click:

```bash
npm install -g vercel
vercel
```

Or connect your GitHub repo to Vercel for auto-deployments.

## 📊 Mock Data

The app includes realistic mock data:
- **3 Licensed Stores** with ratings, licenses, delivery times
- **7 Products** across 5 categories with pricing, ABV, sizes
- **State Management** for cart, orders, user auth

## 🔐 Security & Compliance Notes

- **Production Ready:** Replace mock data with real API calls
- **Age Verification:** Currently frontend gate; implement backend age-gate service
- **Payment Integration:** Mock payment flow; integrate Razorpay, Stripe, etc.
- **License Verification:** Validate retailer licenses against regulatory database
- **Geofencing:** Implement service area restrictions
- **Order Fulfillment:** Connect to retailer inventory & delivery systems

## 📝 License

MIT License – Feel free to fork, modify, and deploy!

## 👥 Team & Support

Built with ❤️ for premium quick commerce.

---

### 🚀 Next Steps

1. **Customize Branding** — Update colors, logo, copy
2. **Connect Backend API** — Replace mock data with real endpoints
3. **Integrate Payments** — Add Razorpay, Stripe, or UPI gateway
4. **Set Up Auth** — Firebase or custom auth service
5. **Launch MVP** — Deploy to Vercel, acquire retailers
6. **Growth** — Analytics, push notifications, referrals

Good luck! 🎉