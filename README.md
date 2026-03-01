# 🚀 JobPortal: Full-Stack Job Board Solution

![React](https://img.shields.io/badge/React-19-blue?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Express](https://img.shields.io/badge/Express-5-green?style=for-the-badge&logo=express)
![Prisma](https://img.shields.io/badge/Prisma-6-indigo?style=for-the-badge&logo=prisma)
![Tailwind](https://img.shields.io/badge/Tailwind-4-38B2AC?style=for-the-badge&logo=tailwind-css)

> A modern, end-to-end Job Board platform designed for speed, scalability, and ease of use. Built with a robust **Express/Prisma** backend and a reactive **React 19** frontend.

---

## 🌟 Key Features

### 👤 Candidate Experience (Public)

- **Dynamic Landing Page**: Hero section with featured job categories and latest postings.
- **Advanced Job Search**: Filter and search through listings by category and employment type.
- **Seamless Applications**: Detailed job views with a built-in application modal.

### 🔐 Admin Dashboard (Protected)

- **Identity Management**: Secure admin authentication powered by **JWT** and **Bcrypt**.
  . For testing
  User email: ````bash       admin@gmail.com
    ````
  Password: ````bash
  password123

`````
- **Job Lifecycle**: Create, update, and delete job listings with integrated **Cloudinary** logo uploads.
- **Application Management**: Centralized dashboard to track and manage all incoming candidate applications.

---

## 🛠️ Tech Stack

| Layer        | Technology                                                                   |
| :----------- | :--------------------------------------------------------------------------- |
| **Frontend** | React 19, TypeScript, Redux Toolkit, RTK Query, Tailwind CSS 4, Lucide Icons |
| **Backend**  | Express 5, TypeScript, Prisma ORM, Multer                                    |
| **Database** | PostgreSQL (Neon Database)                                                   |
| **Storage**  | Cloudinary (Image Hosting)                                                   |
| **Testing**  | Vitest                                                                       |

---

## ⚙️ Environment Variables

Create a `.env` file in the `/backend` directory and populate it with the following:

````env
# --- Database ---
DATABASE_URL="postgresql://user:password@host:port/db?sslmode=require"

# --- Authentication ---
JWT_SECRET="your_secret_string_here"

# --- Cloudinary Assets ---
CLOUDINARY_CLOUD_NAME="your_name"
CLOUDINARY_API_KEY="your_key"
CLOUDINARY_API_SECRET="your_secret"

# --- Server ---
PORT=5000

# 🚀 Getting Started

Follow these steps to get the project running locally.

## 1. Clone the Repository

```bash
git clone https://github.com/yourusername/job-board-project.git
cd job-board-project
`````

## 2. Backend Setup

```bash
cd backend
npm install

# Initialize Database
npx prisma generate
npx prisma db push

# Start Development Server
npm run dev
```

## 3. Frontend Setup

```bash
cd client
npm install

# Launch Vite Dev Server
npm run dev
```

---

## 📡 API Architecture (RTK Query)

The frontend utilizes RTK Query for state management, providing automatic caching and cache invalidation for the following endpoints:

| Endpoint        | Method | RTK Query Hook                 | Access |
| --------------- | ------ | ------------------------------ | ------ |
| `/auth/login`   | POST   | `useAdminLoginMutation`        | Public |
| `/jobs`         | GET    | `useGetJobsQuery`              | Public |
| `/jobs/:id`     | GET    | `useGetJobByIdQuery`           | Public |
| `/jobs`         | POST   | `useCreateJobMutation`         | Admin  |
| `/applications` | POST   | `useCreateApplicationMutation` | Public |
| `/applications` | GET    | `useGetAllApplicationsQuery`   | Admin  |

---

## 📜 Available Scripts

### 🖥️ Backend

- `npm run dev` — Hot-reloading development (via tsx).
- `npm run build` — Compiles TS to optimized JS.
- `npm run test` — Executes Vitest suite.
- `npm run prisma:seed` — Populates DB with initial data.

### 🎨 Frontend

- `npm run dev` — Launches Vite development server.
- `npm run build` — Creates a production-ready build.
- `npm run lint` — Checks for code quality issues.

---

## 👤 Author

**Dolon Roy**  
Full-Stack Developer  
License: ISC

---

_Made with ❤️ using React & Express_
