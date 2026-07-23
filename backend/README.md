<h1 align="center">Tokopedia Play Backend v2.0</h1>

<p align="center">
  <b>Node.js + Express + TypeScript API Server with Socket.IO Real-time Gateway</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Express-4.19-000000?style=flat-square&logo=express&logoColor=white" alt="Express">
  <img src="https://img.shields.io/badge/TypeScript-5.4-3178C6?style=flat-square&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Socket.io-4.7-010101?style=flat-square&logo=socketdotio&logoColor=white" alt="Socket.io">
  <img src="https://img.shields.io/badge/MongoDB-8.2-47A248?style=flat-square&logo=mongodb&logoColor=white" alt="MongoDB">
</p>

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Express 4.19 | HTTP API Framework |
| TypeScript 5.4 | Type Safety |
| Mongoose 8.2 | MongoDB ODM |
| Socket.IO 4.7 | Real-time WebSocket Gateway |
| Pino | Structured JSON Logging |
| Helmet | Security Headers |
| express-rate-limit | Rate Limiting |
| Swagger UI | Interactive API Docs |
| Joi | Request Validation |

## Architecture

```
src/
├── config/          # Database & environment configuration
├── controllers/     # Route handlers (Video, Product, Comment)
├── docs/            # OpenAPI / Swagger specification
├── middlewares/      # Error handler, validation, rate limiter
├── models/          # Mongoose schemas & TypeScript interfaces
├── routes/          # Express route definitions
├── seeders/         # Database sample data seeder
├── services/        # Business logic layer
├── socket/          # Socket.IO real-time engine
├── utils/           # Logger, ApiResponse, ApiError helpers
├── validators/      # Joi validation schemas
├── app.ts           # Express app factory
└── index.ts         # Server entry point (HTTP + Socket.IO)
```

## Database Collections

### Video

| Field | Type | Description |
|---|---|---|
| `videoID` | String | Unique video identifier |
| `urlImageThumbnail` | String | Thumbnail image URL |
| `titleImageThumbnail` | String | Video title |
| `channelName` | String | Streamer channel name |
| `channelAvatar` | String | Streamer avatar URL |
| `viewsCount` | Number | Live viewer count |
| `likesCount` | Number | Total likes |
| `isLive` | Boolean | Currently streaming flag |
| `videoUrl` | String | YouTube embed URL |

### Product

| Field | Type | Description |
|---|---|---|
| `productID` | String | Unique product identifier |
| `urlProduct` | String | Product image URL |
| `titleProduct` | String | Product title |
| `priceProduct` | Number | Sale price (IDR) |
| `originalPrice` | Number | Original price before discount |
| `discountPercent` | Number | Discount percentage |
| `rating` | Number | Product rating (1-5) |
| `videoID` | String | Related video ID |

### Comment

| Field | Type | Description |
|---|---|---|
| `username` | String | Commenter name |
| `comment` | String | Comment text |
| `videoID` | String | Related video ID |
| `userBadge` | String | Badge label (Top Spender, etc.) |

## API Endpoints

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/videos` | List all videos (supports `?search=`) |
| `GET` | `/api/videos/:videoId` | Get video detail by ID |
| `GET` | `/api/products` | List products (supports `?videoID=` and `?search=`) |
| `GET` | `/api/products/:productId` | Get product detail by ID |
| `GET` | `/api/comments` | List comments (supports `?videoID=` and `?search=`) |
| `POST` | `/api/comments` | Submit a new comment |
| `GET` | `/api-docs` | Interactive Swagger UI |

### Socket.IO Events

| Event | Direction | Description |
|---|---|---|
| `comment:new` | Server → Client | Broadcasts new comment to video room |
| `join:room` | Client → Server | Join a video's chat room |
| `leave:room` | Client → Server | Leave a video's chat room |

## Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Configure environment
cp .env.example .env
# Edit .env with your MongoDB Atlas connection string

# 3. Seed sample data (optional)
npm run seed

# 4. Start development server
npm run dev          # Runs at http://localhost:3001
```

### Available Scripts

| Script | Command | Description |
|---|---|---|
| `npm run dev` | `ts-node-dev` | Dev server with hot reload |
| `npm run build` | `tsc` | Compile TypeScript to `dist/` |
| `npm start` | `node dist/index.js` | Run compiled production build |
| `npm run seed` | `ts-node` | Seed database with sample data |

---

<div align="center">
  by <a href="https://github.com/anjasopo">Anjas Susetya</a>
</div>