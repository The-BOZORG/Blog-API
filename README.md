# Blog API

A powerful and secure API for a blogging platform that enables you to manage users, publish blog posts, and organize them effectively.

---

## Features

- ✅ **Secure Authentication** - JWT Tokens with device-based Refresh Tokens
- ✅ **Role-Based Access Control** - Admin and User roles with different permissions
- ✅ **Blog Management** - Create, edit, delete, and publish blog posts
- ✅ **User Management** - Registration, login, and profile updates
- ✅ **High Security** - Bcrypt, CORS, Rate Limiting, XSS Protection
- ✅ **API Documentation** - Interactive Swagger UI
- ✅ **Logging** - Winston and Morgan for comprehensive logging
- ✅ **Docker Ready** - Containerized and production-ready

---

## Technology Stack

| Component          | Technology                  |
| ------------------ | --------------------------- |
| **Runtime**        | Node.js                     |
| **Framework**      | Express.js                  |
| **Database**       | MongoDB + Mongoose          |
| **Authentication** | JWT (jsonwebtoken)          |
| **Validation**     | express-validator           |
| **Hashing**        | bcrypt                      |
| **Security**       | helmet, CORS, Rate Limiting |
| **Logging**        | Winston + Morgan            |
| **API Docs**       | Swagger UI                  |
| **Container**      | Docker & Docker Compose     |

---

## Installation & Setup

### Method 1: Without Docker

```bash
npm install
```

.env.development file:

```env
PORT=your_port
NODE_ENV=development
MONGO_URI=your_mongo_url
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
LOG_LEVEL=debug
```

Start the server:

```bash
npm run start:dev
```

### Method 2: With Docker

Build and run containers:

```bash
docker-compose up -d
```

MongoDB and API are ready:

- API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27018`

View logs:

```bash
docker-compose logs -f api
```

---

## 📁 Project Structure

```
src/
├── app.js                 # Express configuration
├── server.js              # Server entry point
├── configs/               # Configuration files
│   ├── index.js          # Environment variables
│   └── data-base.js      # MongoDB connection
├── controllers/           # Request controllers
│   ├── auth/             # Authentication logic
│   ├── user/             # User management
│   └── blog/             # Blog management
├── models/               # MongoDB schemas
├── routes/               # API routes
├── middlewares/          # Custom middlewares
├── lib/                  # Utility functions
├── errors/               # Error classes
├── utils/                # Helper utilities
└── swagger/              # Swagger configuration
```
