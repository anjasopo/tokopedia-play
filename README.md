<h1 align="center">
  <br>
  <img src="tokopedia.png" alt="Tokopedia Logo" width="180">
  <br>
  Tokopedia Play Clone v2.0
  <br>
</h1>

<p align="center">
  <b>Platform Video Live Streaming & Live Shopping Imersif bergaya Tokopedia Play & Shopee Live</b>
</p>

<p align="center">
  <a href="https://github.com/anjasopo/tokopedia-play"><img src="https://img.shields.io/badge/Vite-5.2-646CFF?style=for-the-badge&logo=vite&logoColor=white" alt="Vite"></a>
  <a href="https://github.com/anjasopo/tokopedia-play"><img src="https://img.shields.io/badge/React-18.2-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"></a>
  <a href="https://github.com/anjasopo/tokopedia-play"><img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript"></a>
  <a href="https://github.com/anjasopo/tokopedia-play"><img src="https://img.shields.io/badge/Express-4.19-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express"></a>
  <a href="https://github.com/anjasopo/tokopedia-play"><img src="https://img.shields.io/badge/Socket.io-4.7-010101?style=for-the-badge&logo=socketdotio&logoColor=white" alt="Socket.io"></a>
  <a href="https://github.com/anjasopo/tokopedia-play"><img src="https://img.shields.io/badge/Tailwind_CSS-3.4-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"></a>
</p>

<p align="center">
  <a href="https://tokopedia-play.netlify.app"><img src="https://img.shields.io/badge/🌐_Live_Demo-Netlify-00C7B7?style=for-the-badge" alt="Live Demo"></a>
</p>

---

## 📌 Deskripsi Proyek

Proyek ini merupakan penyempurnaan (_refactoring & modernization_) dari **Tokopedia Play Clone** yang awalnya dibangun untuk tugas project magang di **GoTo Tokopedia**.

Pada versi v2.0 ini, aplikasi telah ditransformasi secara total menjadi aplikasi **production-grade** berstandar industri modern dengan arsitektur imersif **Live Streaming Room**, _type-safety_ penuh TypeScript, _real-time WebSocket gateway_ via Socket.IO, dan performa tinggi menggunakan Vite & TanStack Query.

---

## ✨ Fitur Unggulan

### 🎬 Frontend (Tokopedia Live Theater UI)

1. **Immersive Live Room HUD** — Overlaid control bar di atas video player dengan penanda kedip `LIVE`, jumlah penonton real-time, dan profil channel.
2. **Floating Hearts Animation** — Efek animasi partikel hati melayang saat tombol Like diklik.
3. **Pinned Featured Product** — Overlay promo produk melayang pada sudut video lengkap dengan persentase diskon & tombol beli cepat.
4. **Real-time Live Chat Stream** — Feed obrolan langsung via Socket.IO dengan badge pengguna (_Top Spender_, _Verified Buyer_, _Penonton Setia_).
5. **Interactive Product Carousel** — List produk promo terkait dengan harga coret dan badge diskon khas Tokopedia Green (`#03AC0E`).
6. **Vite + TanStack Query Integration** — Fast HMR, caching data otomatis, dan _optimistic UI updates_.

### ⚡ Backend (TypeScript & Security Hardened)

1. **Socket.IO Real-time Gateway** — Instant live chat broadcasting per tayangan room `videoID`.
2. **Interactive Swagger API Docs** — Dokumentasi API Swagger UI di `/api-docs`.
3. **Security Hardening** — Proteksi **Helmet** security headers, **express-rate-limit** anti-spam comment.
4. **Structured Pino Logging** — Logging berperforma tinggi format JSON.
5. **Standardized API Response** — Format konsisten `{ success, message, data, meta }`.

---

## 🏗️ Arsitektur Sistem

```
tokopedia-play/
├── .github/workflows/       # CI/CD Pipeline (GitHub Actions)
├── frontend/                # Single Page App (Vite + React + TypeScript)
│   ├── src/
│   │   ├── api/             # Axios API Client & Endpoints (Typed)
│   │   ├── components/      # LiveVideoPlayer, PinnedProduct, LiveChatOverlay
│   │   ├── hooks/           # useSocketComments & TanStack Query hooks
│   │   ├── pages/           # Home, VideoDetail (Live Room), VideoSearch
│   │   ├── router/          # AppRouter (React Router v6)
│   │   ├── types/           # Domain TypeScript Interfaces
│   │   └── utils/           # Formatters (IDR Currency, Compact Numbers)
└── backend/                 # Node.js + Express API Server (TypeScript)
    ├── src/
    │   ├── config/          # Database & Environment
    │   ├── controllers/     # Video, Product, Comment Controllers
    │   ├── docs/            # OpenAPI / Swagger Specification
    │   ├── middlewares/     # ErrorHandler, ValidateRequest, RateLimiter
    │   ├── models/          # Mongoose Schemas (Video, Product, Comment)
    │   ├── routes/          # Express API Endpoints
    │   ├── seeders/         # Database Sample Data Seeder
    │   ├── services/        # Business Logic Layer
    │   ├── socket/          # Socket.IO Real-Time Engine
    │   └── utils/           # Pino Logger, ApiResponse, ApiError
```

---

## 🌐 Deployment

| Layer | Platform | URL |
|-------|----------|-----|
| Frontend | Netlify | [tokopedia-play.netlify.app](https://tokopedia-play.netlify.app) |
| Database | MongoDB Atlas | Cloud-hosted cluster |

---

## 🚀 Panduan Jalankan Aplikasi Lokal

### 1. Backend API & Real-time Server

```bash
cd backend
cp .env.example .env       # Isi DATABASE_URL MongoDB Atlas Anda
npm install
npm run seed               # Isi data sampel awal (opsional)
npm run dev                # Server jalan di http://localhost:3001
```

- **Swagger API Docs**: [http://localhost:3001/api-docs](http://localhost:3001/api-docs)

### 2. Frontend React Application

```bash
cd frontend
cp .env.example .env       # Sesuaikan API URL jika perlu
npm install
npm run dev                # Dev server jalan di http://localhost:3000
```

---

## 📄 Lisensi & Kredit

Diperbarui dan disempurnakan oleh **[Anjas Susetya](https://github.com/anjasopo)** untuk portofolio software engineering GoTo / Tokopedia.

License: [MIT](LICENSE)
