# 🔐 MERN Authentication System

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge)](https://expressjs.com/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Mailjet](https://img.shields.io/badge/Mailjet-F4B400?style=for-the-badge&logo=mailjet&logoColor=black)](https://www.mailjet.com/)
[![Nodemailer](https://img.shields.io/badge/Nodemailer-0B0B0B?style=for-the-badge&logo=nodemailer&logoColor=white)](https://nodemailer.com/about/)
[![React Toastify](https://img.shields.io/badge/React--Toastify-FFAA00?style=for-the-badge&logo=react&logoColor=white)](https://fkhadra.github.io/react-toastify/)

> A complete MERN stack authentication system  featuring login, sign-up, email verification, password reset, and toast notifications.

---

## ✨ Features

- ✅ User Registration & Login  
- 📩 Email Verification using **Mailjet**  
- 🔐 JWT-based Authentication  
- 🔁 Forgot Password with secure token-based reset  
- 📬 Email Automation via **Nodemailer + Mailjet**  
- 🛎️ Notifications via **React-Toastify**  
- 🔒 Protected Routes & Middleware  
- 📦 Built on modern **MERN** stack  

---

## 🛠️ Tech Stack

| Frontend   | Backend            | Database | Email/Automation        |
|------------|--------------------|----------|--------------------------|
| React.js   | Node.js, Express.js| MongoDB  | Mailjet, Nodemailer      |

---

## 🚀 Getting Started

### 📁 Clone the Repository

```bash
git clone https://github.com/ishantmishra03/mern-auth.git
cd mern-auth
```

### 🔧 Setup Backend

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file with the following:
## Backend ( .env )
```.env
PORT=3000
MONGODB_URI=" "
JWT_SECRET=" "
NODE_ENV=" "

# Mailjet Credentials
MAILJET_API_KEY=" "
MAILJET_API_SECRET=" "
SENDER_EMAIL=" "
CORS_ORIGINS=" "
```
## Frontend ( .env )
```.env
VITE_BASE_URL=http://localhost:3000
```

4. Start backend:

```bash
npm run dev
```

### 🌐 Setup Frontend

1. Navigate to the frontend:

```bash
cd ../frontend
```

2. Install dependencies:

```bash
npm install
```

3. Start frontend:

```bash
npm run dev
```

---


## 📃 License

[MIT](LICENSE)

---

