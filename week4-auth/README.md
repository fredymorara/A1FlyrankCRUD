# Week 4: Auth Login & Protect

This folder contains a secure Express REST API that handles user authentication and protects specific routes using **Supabase Auth** and **JSON Web Tokens (JWTs)**.

## 🎯 Goal
Build an API that allows users to sign up, log in, and receive secure access tokens. Use an Express middleware guard to verify those tokens with Supabase and block unauthenticated users from accessing protected endpoints.

## 🚀 Features
* **Identity Provider:** Outsourced password hashing and cryptography to Supabase.
* **Token Verification:** Custom `requireAuth` Express middleware that intercepts requests, checks the JWT signature, and confirms it isn't expired.
* **Swagger UI:** Configured with a `Bearer Token` security scheme, enabling padlock icons and 1-click authorization testing directly in the browser.

## 💻 How to Run Locally

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Environment Variables**
   Create a `.env` file in the root of this folder and add your Supabase credentials:
   ```text
   SUPABASE_URL=your_supabase_project_url
   SUPABASE_KEY=your_supabase_anon_key
   PORT=3000
   ```
   *(Note: The `.env` file is excluded from Git to protect secrets).*
3. **Start the Server**
   ```bash
   node index.js
   ```

## 🔒 API Reference

| Endpoint | Method | Auth Required? | Purpose |
| :--- | :--- | :--- | :--- |
| `/public/info` | GET | ❌ No | Access public, unprotected data |
| `/auth/signup` | POST | ❌ No | Register a new user account |
| `/auth/login` | POST | ❌ No | Authenticate user & return JWT |
| `/protected/profile` | GET | 🔐 Yes (JWT) | Read private user profile data |
| `/protected/dashboard` | GET | 🔐 Yes (JWT) | Read personalized dashboard data |
| `/auth/logout` | POST | 🔐 Yes (JWT) | Terminate the user session |

## 📸 Swagger UI

![Swagger UI with Auth Padlocks](./swagger.png)
