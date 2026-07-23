<h1 align="center">Tokopedia Play Frontend v2.0</h1>

<p align="center">
  <b>Immersive Live Streaming UI built with Vite + React 18 + TypeScript</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Vite-5.2-646CFF?style=flat-square&logo=vite&logoColor=white" alt="Vite">
  <img src="https://img.shields.io/badge/React-18.2-61DAFB?style=flat-square&logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white" alt="Tailwind CSS">
</p>

<p align="center">
  <a href="https://tokopedia-play.netlify.app"><img src="https://img.shields.io/badge/🌐_Live_Demo-Netlify-00C7B7?style=flat-square" alt="Live Demo"></a>
</p>

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Vite 5.2 | Build tool & dev server |
| React 18 | UI framework |
| TypeScript 5.4 | Type safety |
| TanStack Query v5 | Server state & caching |
| Tailwind CSS 3.4 | Utility-first styling |
| DaisyUI 4 | Component library |
| Socket.IO Client | Real-time chat |
| React Router v6 | Client-side routing |
| Lucide React | Icon library |
| Axios | HTTP client |

## Architecture

```
src/
├── api/              # Typed Axios API clients (video, product, comment)
├── components/
│   ├── comment/      # LiveChatOverlay (real-time chat stream)
│   ├── common/       # ErrorBoundary, LoadingSpinner
│   ├── layout/       # Navbar, Footer, Layout wrapper
│   ├── product/      # ProductCard with price & discount badge
│   └── video/        # LiveVideoPlayer, VideoCard, PinnedProductCard
├── hooks/            # useSocketComments (Socket.IO + TanStack Query)
├── pages/            # Home, VideoDetail, VideoSearch, NotFound
├── router/           # AppRouter (React Router v6)
├── types/            # TypeScript interfaces (Video, Product, Comment)
└── utils/            # formatPrice, formatNumber, constants
```

## Features

### 🎬 Immersive Live Room

- **Live Video HUD** — Overlaid controls with blinking `LIVE` badge, real-time viewer counter, and channel profile.
- **Floating Hearts** — Animated heart particles on like button press.
- **Pinned Product Overlay** — Featured product card floating over video with discount tag and quick-buy CTA.
- **Tabbed Product & Chat Panel** — Switch between product carousel and live chat.

### 💬 Real-time Live Chat

- Socket.IO integration for instant comment broadcasting.
- User badges: _Top Spender_, _Verified Buyer_, _Penonton Setia_.
- Auto-scroll with smooth animations.

### 🏠 Home Discovery

- Video thumbnail grid with live indicator badges.
- Category filter tabs (Semua, Live, Elektronik, Fashion, dll).
- Search functionality across video titles.

## Design System

| Token | Value |
|---|---|
| Primary Color | `#03AC0E` (Tokopedia Green) |
| Font Family | Plus Jakarta Sans, Inter |
| Theme | Dark mode (DaisyUI custom) |
| Effects | Glassmorphism, micro-animations |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env

# 3. Start development server
npm run dev          # Runs at http://localhost:3000
```

### Environment Variables

| Variable | Description | Default |
|---|---|---|
| `VITE_API_BASE_URL` | Backend API base URL | `http://localhost:3001` |
| `VITE_WS_URL` | WebSocket server URL | `http://localhost:3001` |

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `vite` | Dev server with HMR |
| `npm run build` | `tsc && vite build` | Typecheck & production build |
| `npm run preview` | `vite preview` | Preview production build |

## Deployment

Frontend deployed on **Netlify**: [tokopedia-play.netlify.app](https://tokopedia-play.netlify.app)

For backend API details, see [backend/README.md](../backend/README.md).

---

<div align="center">
  by <a href="https://github.com/anjasopo">Anjas Susetya</a>
</div>
