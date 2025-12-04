# Backend API

A Node.js/Express backend that handles user authentication (registration, login, logout) using JWT for authorization and Mongoose for MongoDB data modeling.

## Features

- User registration and login with password hashing
- JWT-based auth (tokens returned on register/login)
- Input validation with Zod schemas (`validators/authValidator.js`)
- Organized folder structure for scalability

## Getting Started

### Prerequisites

- Node.js & npm
- MongoDB (local or cloud)

### Installation

1. Clone the repo and cd into `backend`
2. Install dependencies:

   ```bash
   npm install
   ```

3. Copy `.env.example` to `.env` and set your environment variables:

   ```env
   JWT_SECRET_KEY=your_jwt_secret
   MONGO_URI=your_mongodb_uri
   PORT=5000
   ```

### Scripts

- Start in production: `npm start`
- Start in development with hot reloading: `npm run dev`
- Run tests (not specified): `npm test`

## Folder Structure

- `models/` – Mongoose schemas (e.g., User)
- `controllers/` – Route controllers (e.g., `authController.js`)
- `routes/` – Express routes
- `middleware/` – Custom and builtin Express middleware
- `validators/` – Zod schemas

## API Endpoints

- `GET  /api/auth/` — Check API/Auth status
- `POST /api/auth/register` — Register a user  
  **Body:** `{ "name": String, "email": String, "password": String }`
- `POST /api/auth/login` — Login a user  
  **Body:** `{ "email": String, "password": String }`
- `GET  /api/auth/logout` — Logout user

## Validation

- Request bodies are validated using [Zod](https://github.com/colinhacks/zod).
- If validation fails, a `400` status and message are returned.

## JWT

- Tokens are signed using `process.env.JWT_SECRET_KEY`
- Issued on successful registration/login

## Example Requests

**Register**

```bash
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Alice","email":"alice@email.com","password":"password123"}'
```

**Login**

```bash
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"alice@email.com","password":"password123"}'
```

## Development Notes

- Make sure MongoDB is running and your connection URI is in `.env`
- Test endpoints with [Postman](https://www.postman.com/) or `curl`

---

For questions/issues, see the code or contact the maintainer.
