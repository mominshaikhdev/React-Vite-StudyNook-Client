# StudyNook – Client (React + Vite)

A full-stack Library Study Room Booking platform. This is the **frontend** built with React, Vite, and Tailwind CSS.

🌐 **Live Site:** https://react-vite-study-nook-client.vercel.app

---

## Features

- 🔐 JWT authentication via HTTP-only cookies (no localStorage)
- 🔍 Search & filter rooms by name and amenities
- 📅 Book study rooms with conflict detection
- 📋 Manage your listings (add, edit, delete rooms)
- 🗓️ View and cancel your bookings
- 🌐 Google OAuth via Google Identity Services (no Firebase)
- 📱 Fully responsive (mobile, tablet, desktop)
- 🔔 Toast notifications (react-hot-toast)
- 🔄 Dynamic page titles per route

## Tech Stack

- React 19 + Vite
- Tailwind CSS v4
- React Router v7
- Axios (with credentials)
- React Hot Toast
- React Helmet Async
- React Icons
- Google Identity Services (GIS)

## Getting Started

```bash
# Install dependencies
pnpm install

# Create .env from example
cp .env.example .env
# Fill in VITE_API_URL and VITE_GOOGLE_CLIENT_ID

# Start development server
pnpm run dev
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_API_URL` | Backend API URL (e.g. `https://express-mongo-db-study-nook-server.vercel.app`) |
| `VITE_GOOGLE_CLIENT_ID` | Google OAuth 2.0 Client ID from Google Cloud Console |
