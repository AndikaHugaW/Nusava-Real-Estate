# 🏠 Nusava - Real Estate SaaS Platform

<div align="center">

![Nusava Logo](https://img.shields.io/badge/Nusava-Real%20Estate-blue?style=for-the-badge&logo=home&logoColor=white)

**Modern Real Estate Platform untuk Jual Beli dan Sewa Properti di Indonesia**

[![Next.js](https://img.shields.io/badge/Next.js-16-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-3178C6?style=flat-square&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind%20CSS-4.0-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791?style=flat-square&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Prisma](https://img.shields.io/badge/Prisma-5.22-2D3748?style=flat-square&logo=prisma&logoColor=white)](https://www.prisma.io/)
[![Docker](https://img.shields.io/badge/Docker-Ready-2496ED?style=flat-square&logo=docker&logoColor=white)](https://www.docker.com/)

</div>

---

## 📋 Deskripsi

**Nusava** adalah platform SaaS Real Estate modern yang dirancang untuk mempermudah proses jual beli dan sewa properti di Indonesia. Platform ini menyediakan solusi lengkap untuk agen properti, pemilik, dan pencari properti dengan fitur-fitur canggih dan antarmuka yang intuitif.

### ✨ Fitur Utama

- 🏘️ **Listing Properti** - Kelola daftar properti (Rumah, Apartemen, Villa, Tanah, Komersial)
- 🔍 **Pencarian Lanjutan** - Filter berdasarkan lokasi, harga, tipe, dan fitur
- 👤 **Multi-Role System** - User, Agent, dan Admin dengan akses berbeda
- 📩 **Inquiry System** - Sistem pertanyaan dan komunikasi dengan agen
- ❤️ **Favorites** - Simpan properti favorit untuk ditinjau nanti
- 📍 **Geolocation** - Integrasi lokasi dengan koordinat GPS
- 🖼️ **Multi-Image Support** - Upload multiple gambar properti
- 🔐 **Secure Authentication** - JWT-based authentication dengan bcrypt

---

## 🛠️ Tech Stack

### Frontend
| Technology | Version | Description |
|------------|---------|-------------|
| Next.js | 16.1.6 | React Framework dengan App Router |
| React | 19.2.3 | UI Library |
| TypeScript | 5.x | Type-safe JavaScript |
| Tailwind CSS | 4.x | Utility-first CSS Framework |

### Backend
| Technology | Version | Description |
|------------|---------|-------------|
| Express.js | 4.18.2 | Node.js Web Framework |
| TypeScript | 5.3.3 | Type-safe JavaScript |
| Prisma | 5.22.0 | Modern ORM untuk PostgreSQL |
| PostgreSQL | 16 | Relational Database |
| JWT | 9.0.2 | JSON Web Token Authentication |
| bcryptjs | 2.4.3 | Password Hashing |

### DevOps
| Technology | Description |
|------------|-------------|
| Docker | Containerization untuk PostgreSQL |
| Docker Compose | Multi-container orchestration |

---

## 📁 Struktur Project

```
Nusava - Real Estate/
├── 📂 frontend/                 # Next.js Frontend Application
│   ├── 📂 src/
│   │   └── 📂 app/             # App Router pages
│   ├── 📂 public/              # Static assets
│   ├── package.json
│   └── tailwind.config.ts
│
├── 📂 backend/                  # Express.js Backend API
│   ├── 📂 src/
│   │   ├── 📂 routes/          # API Routes
│   │   │   ├── auth.routes.ts      # Authentication
│   │   │   ├── property.routes.ts  # Property CRUD
│   │   │   ├── inquiry.routes.ts   # Inquiry System
│   │   │   └── user.routes.ts      # User Management
│   │   ├── 📂 middleware/      # Auth Middleware
│   │   ├── 📂 lib/             # Prisma Client
│   │   └── index.ts            # Entry Point
│   ├── 📂 prisma/
│   │   └── schema.prisma       # Database Schema
│   └── package.json
│
├── docker-compose.yml           # Docker configuration
└── README.md
```

---

## 🗃️ Database Schema

### Models

| Model | Description |
|-------|-------------|
| **User** | Manajemen pengguna dengan role (USER, AGENT, ADMIN) |
| **Property** | Listing properti dengan detail lengkap |
| **PropertyImage** | Gambar-gambar properti |
| **Inquiry** | Pertanyaan/permintaan dari user ke agen |
| **Favorite** | Properti favorit user |

### Property Types
- 🏠 **HOUSE** - Rumah
- 🏢 **APARTMENT** - Apartemen
- 🏡 **VILLA** - Villa
- 🌍 **LAND** - Tanah
- 🏪 **COMMERCIAL** - Komersial

### Property Status
- ✅ **AVAILABLE** - Tersedia
- 💰 **SOLD** - Terjual
- 🏷️ **RENTED** - Disewakan
- ⏳ **PENDING** - Pending

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- Docker & Docker Compose
- npm atau yarn

### 1. Clone Repository

```bash
git clone https://github.com/AndikaHugaW/Nusava-Real-Estate.git
cd Nusava-Real-Estate
```

### 2. Setup Database (Docker)

```bash
# Start PostgreSQL container
docker-compose up -d
```

### 3. Setup Backend

```bash
cd backend

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env dengan konfigurasi database

# Generate Prisma Client
npm run prisma:generate

# Run migrations
npm run prisma:migrate

# Start development server
npm run dev
```

### 4. Setup Frontend

```bash
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

### 5. Access Application

- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Prisma Studio**: `npm run prisma:studio` (di folder backend)

---

## 📡 API Endpoints

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | User login |
| GET | `/api/auth/me` | Get current user |

### Properties
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/properties` | Get all properties |
| GET | `/api/properties/:id` | Get property by ID |
| POST | `/api/properties` | Create new property (Agent/Admin) |
| PUT | `/api/properties/:id` | Update property |
| DELETE | `/api/properties/:id` | Delete property |

### Inquiries
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/inquiries` | Get inquiries |
| POST | `/api/inquiries` | Create inquiry |
| PUT | `/api/inquiries/:id/status` | Update inquiry status |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users` | Get all users (Admin) |
| GET | `/api/users/:id` | Get user by ID |
| PUT | `/api/users/:id` | Update user |
| DELETE | `/api/users/:id` | Delete user (Admin) |

---

## 🔐 Environment Variables

### Backend (.env)

```env
DATABASE_URL="postgresql://postgres:postgres123@localhost:5433/nusava_db"
JWT_SECRET="your-super-secret-jwt-key"
PORT=5000
```

---

## 🤝 Contributing

Kontribusi sangat diterima! Silakan buat Pull Request atau buka Issue untuk diskusi.

1. Fork repository
2. Buat branch fitur baru (`git checkout -b feature/AmazingFeature`)
3. Commit perubahan (`git commit -m 'Add some AmazingFeature'`)
4. Push ke branch (`git push origin feature/AmazingFeature`)
5. Buka Pull Request

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

## 👨‍💻 Author

**Andika Huga W**

- GitHub: [@AndikaHugaW](https://github.com/AndikaHugaW)

---

<div align="center">

**⭐ Star this repository jika project ini bermanfaat!**

Made with ❤️ in Indonesia 🇮🇩

</div>
