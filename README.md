# Study Hub - All Subjects Learning Platform

A comprehensive, modern educational platform featuring 9 major subject areas with structured lessons, interactive quizzes, and progress tracking.

![Landing Page](/Users/vihaanchoudhary_drhulk/Study Hub/client/public/landing_preview.png)

## Tech Stack

- **Frontend**: React (Vite), Tailwind CSS, Framer Motion, Lucide Icons
- **Backend**: Node.js, Express, JWT Authentication
- **Database**: PostgreSQL with Prisma ORM
- **Deployment**: Render.com (Integrated Web Service)

## Features

- **9 Full Subjects**: Mathematics, Science, English, History, Geography, ICT, GK, Languages, and Life Skills.
- **Structured Learning**: Subjects -> Subtopics -> Lessons -> Quizzes.
- **Interactive Quizzes**: Real-time feedback and scoring.
- **Progress Tracking**: Personal profile with achievement badges and activity logs.
- **Modern UI**: Dark/Light mode support, glassmorphism design, and smooth animations.
- **Mobile First**: Fully responsive across all devices.

## Getting Started

### Prerequisites

- Node.js (v18+)
- PostgreSQL database

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd study-hub
   ```

2. Install dependencies for root, client, and server:
   ```bash
   npm run install-all
   ```

3. Configure environment variables in `server/.env`:
   ```env
   DATABASE_URL="postgresql://user:password@localhost:5432/study_hub"
   JWT_SECRET="your_secret_key"
   ```

4. Run database migrations:
   ```bash
   cd server
   npx prisma migrate dev
   ```

5. Seed the database with educational content:
   ```bash
   npm run seed
   ```

6. Start the development server:
   ```bash
   # From root
   npm start
   ```

## Deployment on Render

This project is pre-configured for Render.com via `render.yaml`. Simply:
1. Push this repository to GitHub.
2. Connect the repository to Render.
3. Render will automatically detect `render.yaml` and provision:
   - A PostgreSQL database.
   - A Web Service for the backend (which also serves the frontend).

## License

MIT
