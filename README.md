# UniNexus

## 1. The Core Objective
To build a functional web application where campus clubs can publish events and students can discover, search, and discuss them in deep, threaded conversations.

## 2. Target Users & Permissions
- **Student**: Can view events, search, RSVP, and comment.
- **Club Admin**: Can create/edit their club profile and publish events.
- **Super Admin**: Can approve new club registrations (security checkpoint).

## 3. In-Scope Features (MVP Phase 1)

### A. Authentication
- **Sign up/Login**: Standard Email & Password login (using JWT).
- **Role Separation**: Distinguishes between Student and Club accounts upon login.

### B. The Event Feed (Home Page)
- **Unified List**: Chronological scroll of all upcoming campus events.
- **Filters**: Category (Tech, Cultural, Sports) and Date (Today, This Week).
- **Semantic Search**: Search bar using basic Vector Search (e.g., "Coding" finds "Hackathon").

### C. The "Reddit-Style" Discussion Layer
- **Threaded Comments**: Nested hierarchy (Parent -> Child -> Grandchild).
- **Indentation UI**: Visual depth showing reply structure.
- **Upvotes**: Counter to surface good questions.

### D. Club Management
- **Create Event Form**: Title, Description, Date, Time, Venue, Image Upload.
- **Club Profile**: Static page with Club Logo, Description, and Active Events.

### E. AI Integration (MVP Level)
- **TL;DR Button**: Generates a 3-sentence summary of long comment threads using an LLM.

## 4. Out-of-Scope (Phase 2)
- Real-time notifications (Socket.io).
- Rich text editing in comments.
- Poster OCR.
- Calendar Integrations.
- Gamification.

## 5. MVP Technical Architecture

### Frontend
- **Framework**: React + Tailwind CSS (SPA).
- **Tooling**: Vite, TypeScript.

### Backend
- **Runtime**: Node.js + Express (REST API).
- **Language**: TypeScript.

### Database
- **MongoDB**: using Mongoose.
    - **Collection 1**: Users (Students & Clubs).
    - **Collection 2**: Events.
    - **Collection 3**: Comments (Materialized Path pattern).

### External Services
- **Storage**: AWS S3 (Event Posters).
- **AI Engine**: OpenAI API (Search Embeddings & Summarization).
