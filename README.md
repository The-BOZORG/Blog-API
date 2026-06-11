# Blog API 📝

A **powerful and secure API for a blogging platform** that enables you to manage users, publish blog posts, and organize them effectively.

---

## ✨ Features

- ✅ **Secure Authentication** - JWT Tokens with device-based Refresh Tokens
- ✅ **Role-Based Access Control** - Admin and User roles with different permissions
- ✅ **Blog Management** - Create, edit, delete, and publish blog posts
- ✅ **User Management** - Registration, login, and profile updates
- ✅ **High Security** - Bcrypt, CORS, Rate Limiting, XSS Protection
- ✅ **API Documentation** - Interactive Swagger UI
- ✅ **Logging** - Winston and Morgan for comprehensive logging
- ✅ **Docker Ready** - Containerized and production-ready

---

## 🛠️ Technology Stack

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

## 📦 Installation & Setup

### Requirements

- Node.js (v18+)
- MongoDB
- npm or yarn

### Method 1: Without Docker

**1. Clone the repository:**

```bash
git clone <repo-url>
cd Blog\ API
```

**2. Install dependencies:**

```bash
npm install
```

**3. Create .env.development file:**

```env
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/blog_api
JWT_ACCESS_SECRET=your_access_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d
LOG_LEVEL=debug
```

**4. Start the server:**

```bash
npm run start:dev
```

The API will run at `http://localhost:5000`.

### Method 2: With Docker

**1. Build and run containers:**

```bash
docker-compose up -d
```

**2. MongoDB and API are ready:**

- API: `http://localhost:3000`
- MongoDB: `mongodb://localhost:27018`

**3. View logs:**

```bash
docker-compose logs -f api
```

---

## 🚀 Using the API

### Swagger Documentation

Access interactive API documentation here:

```
http://localhost:5000/api/docs
```

### 📚 Main Endpoints

#### Authentication

```bash
# Register
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword",
  "role": "user"
}

# Login
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "securepassword"
}

# Logout
POST /api/auth/logout
Authorization: Bearer <access_token>
```

#### User Management

```bash
# Get current user
GET /api/user/current
Authorization: Bearer <access_token>

# Get all users (Admin only)
GET /api/user?limit=10&offset=0
Authorization: Bearer <access_token>

# Update your profile
PUT /api/user/update
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "username": "newusername",
  "firstName": "John",
  "lastName": "Doe"
}

# Delete user (Admin only)
DELETE /api/user/<userId>
Authorization: Bearer <access_token>
```

#### Blog Management

```bash
# Create blog post (Admin only)
POST /api/blog/create
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Blog Post Title",
  "content": "<p>Post content</p>",
  "status": "published"
}

# Get all blogs
GET /api/blog?limit=10&offset=0
Authorization: Bearer <access_token>

# Get user's blogs
GET /api/blog/user/<userId>
Authorization: Bearer <access_token>

# Update blog (Admin only)
PUT /api/blog/<blogId>
Authorization: Bearer <access_token>
Content-Type: application/json

{
  "title": "Updated Title",
  "content": "<p>Updated content</p>",
  "status": "published"
}

# Delete blog (Admin only)
DELETE /api/blog/<blogId>
Authorization: Bearer <access_token>
```

---

## 👥 User Roles

### Admin

- ✅ Create, edit, delete blog posts
- ✅ View all blogs (draft and published)
- ✅ Manage users
- ✅ View list of all users

### User

- ✅ View published blogs only
- ✅ Update their own profile
- ✅ Logout

---

## 🔒 Security Features

### Implemented Security Measures:

1. **Password Encryption** - Bcrypt hashing with 10 rounds
2. **JWT Tokens** - Separate access and refresh tokens
3. **Limited CORS** - Only approved origins allowed
4. **Rate Limiting** - Prevents request flooding
5. **Helmet** - Secure HTTP headers
6. **XSS Protection** - Content sanitization with DOMPurify
7. **Input Validation** - All inputs validated
8. **HTTPS Support** - Secure cookies in production

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

---

## 🌍 Environment Variables

```env
# Server
PORT=5000
NODE_ENV=development

# Database
MONGO_URI=mongodb://localhost:27017/blog_api

# JWT
JWT_ACCESS_SECRET=your_secret_key
JWT_REFRESH_SECRET=your_refresh_secret
ACCESS_TOKEN_EXPIRY=15m
REFRESH_TOKEN_EXPIRY=7d

# Logging
LOG_LEVEL=debug

# CORS
WHITELIST_ORIGINS=http://localhost:3000

# Admin
WHITELIST_ADMIN_MAIL=admin@example.com
```

---

## 📝 Development

### Useful Commands

```bash
# Development (with Hot Reload)
npm run start:dev

# Production
npm run start:prod

# Linting
npm run lint

# Testing
npm run test
```

### Adding a New Middleware

Create a file in `src/middlewares/`:

```javascript
import asyncHandler from './asyncHandler.js';

const myMiddleware = asyncHandler(async (req, res, next) => {
  // Your logic here
  next();
});

export default myMiddleware;
```

### Adding a New Controller

Create a file in `src/controllers/`:

```javascript
import asyncHandler from '../../middlewares/asyncHandler.js';

const myController = asyncHandler(async (req, res) => {
  // Your logic here
  res.status(200).json({ message: 'success' });
});

export default myController;
```

---

## 🐛 Troubleshooting

### MongoDB Connection Error

```
Create .env.development file with correct MONGO_URI
mongodb://localhost:27017/blog_api
```

### Rate Limiting Issues

For development, reduce the limit in `.env` or modify `src/lib/limiter.js`.

### Expired Tokens

If access token expires, use the refresh token to obtain a new one.

---

## 📄 License

ISC License - Free to use

---

## 👨‍💻 Author

**Soroush**

---

## 📞 Support

If you encounter issues:

1. Check Swagger Documentation: `/api/docs`
2. Review server logs
3. Verify environment configuration carefully

---

## 🎯 Important Notes

- 🔐 **Never share your passwords**
- 🔑 **Keep JWT tokens secure**
- 📧 **Admin emails are pre-defined**
- 📱 **Each login generates a new token per device**
- 🚀 **Draft blogs are only visible to Admin**

---

**Version**: 1.0.0  
**Last Updated**: 2026
