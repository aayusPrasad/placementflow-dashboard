# PlacementFlow AI Dashboard

> A polished, AI-assisted campus placement platform for students, recruiters, and placement teams.

PlacementFlow AI Dashboard is a modern React + TypeScript frontend backed by an Express/MongoDB API. It brings student applications, recruiter job pipelines, resume intelligence, analytics, and role-based portals into one premium placement automation experience.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=111111)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3-38B2AC?logo=tailwindcss&logoColor=white)
![Express](https://img.shields.io/badge/Express-API-000000?logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-Database-47A248?logo=mongodb&logoColor=white)

---

## Table of Contents

- [Overview](#overview)
- [Key Features](#key-features)
- [Product Modules](#product-modules)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Configuration](#environment-configuration)
- [Available Scripts](#available-scripts)
- [API Integration](#api-integration)
- [Design System](#design-system)
- [Deployment Notes](#deployment-notes)
- [Roadmap Ideas](#roadmap-ideas)

---

## Overview

PlacementFlow AI helps colleges and hiring teams manage the full campus placement lifecycle:

- Students can discover companies, apply to roles, track applications, view analytics, receive notifications, and upload resumes for AI feedback.
- Recruiters can manage their profile, publish jobs, monitor applicants, review shortlists, and inspect hiring analytics.
- The UI is built as a premium SaaS-style dashboard with glass cards, gradients, animated page transitions, protected routing, loading states, empty states, and error handling.

The frontend currently targets a local backend API at:

```txt
http://localhost:5000/api
```

---

## Key Features

### Student Experience

- Secure student sign up and login flows.
- Personalized student dashboard with application, interview, company, and resume-score metrics.
- Company and job discovery with search, detail modals, and one-click application submission.
- Application tracker with status badges and recent activity views.
- Interview-focused view for shortlisted applications.
- Student analytics with bar and pie charts.
- AI resume analyzer with PDF upload progress, resume score, strengths, weaknesses, and suggestions.
- Notification center and editable profile/settings fields.

### Recruiter Experience

- Secure recruiter sign up and login flows.
- Recruiter dashboard with jobs, applicants, shortlisted, rejected, and pipeline metrics.
- Job posting form for role title, package, location, eligibility, skills, deadline, and description.
- Job management with deletion support.
- Applicant review panels with branch, CGPA, score, and application status.
- Shortlist view with interview and notification actions.
- Recruiter analytics with line and bar charts.
- Recruiter profile/settings management.

### Platform Experience

- Role-based protected routes for student and recruiter portals.
- JWT token persistence through browser local storage.
- Centralized Axios API client with typed service helpers.
- Reusable UI primitives for cards, badges, stats, loading, empty, and error states.
- Responsive layouts for desktop and smaller screens.
- Tailwind-powered theme variables with light/dark-ready design tokens.

---

## Product Modules

| Area | Routes | Description |
| --- | --- | --- |
| Landing | `/` | Marketing homepage for students and recruiters. |
| Auth | `/student-login`, `/student-signup`, `/recruiter-login`, `/recruiter-signup` | Dedicated role-based authentication pages. |
| Student Portal | `/student/dashboard`, `/student/companies`, `/student/applications`, `/student/interviews`, `/student/analytics`, `/student/resume-analyzer`, `/student/notifications`, `/student/settings` | Student placement workflow. |
| Recruiter Portal | `/recruiter/dashboard`, `/recruiter/jobs`, `/recruiter/applicants`, `/recruiter/shortlist`, `/recruiter/interviews`, `/recruiter/analytics`, `/recruiter/settings` | Recruiter hiring workflow. |
| Backend API | `/api/auth`, `/api/jobs`, `/api/student`, `/api/applicants`, `/api/recruiter`, `/api/shortlist`, `/api/dashboard`, `/api/resume`, `/api/settings` | Express API mounted by the included backend server. |

---

## Tech Stack

### Frontend

- **React 19** for component-based UI development.
- **TypeScript** for typed application code.
- **Vite 7** for fast local development and optimized production builds.
- **React Router 7** for nested and protected routing.
- **Tailwind CSS** for utility-first styling and theme tokens.
- **Axios** for API requests.
- **Recharts** for student and recruiter analytics visualizations.
- **Lucide React** for iconography.
- **Radix UI primitives** for accessible UI foundations.

### Backend Included in Repository

- **Node.js + Express** API server.
- **MongoDB + Mongoose** persistence layer.
- **JWT + bcryptjs** authentication.
- **Google Gemini API** resume analysis flow.
- **PDF parsing** for resume upload analysis.

---

## Project Structure

```txt
placementflow-dashboard/
├── src/
│   ├── components/ui/        # Reusable shell UI primitives
│   ├── context/              # Auth and toast providers
│   ├── hooks/                # Async data-loading helpers
│   ├── layouts/              # Dashboard layout and navigation shell
│   ├── pages/                # Landing, auth, student, and recruiter pages
│   ├── routes/               # Application route map and route guards
│   ├── services/             # Axios instance and API service modules
│   ├── types/                # Shared TypeScript domain types
│   ├── utils/                # Utility helpers
│   ├── index.css             # Tailwind layers, design tokens, component classes
│   └── main.tsx              # React entrypoint
├── PlacementFlowBackend/
│   └── backend/              # Express/MongoDB backend controllers, routes, and models
├── index.html
├── package.json
├── tailwind.config.js
├── tsconfig.json
└── vite.config.ts
```

---

## Getting Started

### Prerequisites

Install the following before running the app:

- **Node.js 20+** recommended
- **npm**
- **MongoDB** connection string for the backend
- **Google Gemini API key** if using resume analysis

### 1. Clone the repository

```bash
git clone <repository-url>
cd placementflow-dashboard
```

### 2. Install frontend dependencies

```bash
npm install
```

### 3. Configure backend environment

Create an environment file for the backend server inside `PlacementFlowBackend/backend`:

```bash
cd PlacementFlowBackend/backend
cp .env.example .env  # if an example file exists, otherwise create .env manually
```

Required backend variables:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
GEMINI_API_KEY=your_google_gemini_api_key
```

> Note: the repository currently includes backend source files but does not include a backend `package.json`. If you run the backend independently, make sure the backend project has the required Node dependencies installed, including Express, Mongoose, CORS, dotenv, bcryptjs, jsonwebtoken, multer, pdf-parse, and `@google/generative-ai`.

### 4. Start the backend API

From the backend directory, run the Express server using your backend setup:

```bash
node Server.js
```

The API should be available at:

```txt
http://localhost:5000
```

### 5. Start the frontend

From the repository root:

```bash
npm run dev
```

The dashboard will be served by Vite, usually at:

```txt
http://localhost:5173
```

---

## Environment Configuration

The frontend API base URL is currently defined in `src/services/api.ts`:

```ts
baseURL: 'http://localhost:5000/api'
```

For production deployments, consider moving this value to a Vite environment variable such as:

```env
VITE_API_URL=https://your-api-domain.com/api
```

Then update the Axios client to read from `import.meta.env.VITE_API_URL`.

---

## Available Scripts

Run these commands from the repository root:

| Command | Description |
| --- | --- |
| `npm run dev` | Starts the Vite development server. |
| `npm run build` | Type-checks the project and creates a production build. |
| `npm run lint` | Runs ESLint across the codebase. |
| `npm run preview` | Serves the production build locally for preview. |

---

## API Integration

The frontend communicates with the backend through organized service modules:

- `authApi` handles student and recruiter login/signup requests.
- `studentApi` handles student profile, dashboard, applications, settings, job applications, and resume upload.
- `recruiterApi` handles recruiter dashboard, profile, jobs, applicants, and shortlist data.
- `jobsApi` handles public job listing retrieval.

Authentication tokens are stored separately for each role:

```txt
studentToken
recruiterToken
```

Role-specific requests attach the active token through an `Authorization: Bearer <token>` header.

---

## Design System

PlacementFlow AI uses a reusable Tailwind component layer for consistent dashboard styling:

- `.glass` for translucent SaaS-style panels.
- `.gradient-text` for premium brand headings.
- `.page` for animated dashboard page transitions.
- `.grid-cards` for responsive stat sections.
- `.input`, `.btn`, `.btn-ghost`, `.badge`, and `.card` for common interface elements.

The theme is powered by CSS variables for background, foreground, card, muted, border, primary, and destructive colors, making future dark-mode or brand customization straightforward.

---

## Deployment Notes

### Frontend

1. Build the production bundle:

   ```bash
   npm run build
   ```

2. Deploy the generated `dist/` directory to a static hosting provider such as Vercel, Netlify, Cloudflare Pages, or an object-storage/CDN setup.

3. Make sure the production API URL is configured correctly before deploying.

### Backend

1. Deploy the Express server to a Node-compatible host.
2. Configure `MONGO_URI`, `JWT_SECRET`, and `GEMINI_API_KEY` in the hosting environment.
3. Allow the deployed frontend origin through CORS if you restrict CORS for production.
4. Confirm file upload limits and request body limits are appropriate for resume PDFs.

---

## Roadmap Ideas

- Move the frontend API base URL into a Vite environment variable.
- Add automated tests for route guards, auth flows, and API service helpers.
- Add recruiter actions for shortlist, reject, schedule interview, and notify applicants directly from the UI.
- Add admin/placement-officer dashboards for college-level placement tracking.
- Add real-time notifications with WebSockets or server-sent events.
- Add exportable placement reports for departments, batches, companies, and roles.
- Add CI checks for linting, type-checking, and production builds.

---

## License

This project is currently private and does not declare an open-source license. 
