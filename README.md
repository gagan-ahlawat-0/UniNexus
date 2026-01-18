# UniNexus - Campus Event & Community Platform

## 1. Project Overview

**Objective**: To build a centralized platform that unifies fragmented campus information, including events, club activities, and student communities. The platform aims to replace scattered communication channels (WhatsApp, posters, Instagram) with a structured, searchable, and AI-enhanced feed.

**Core Value Proposition**:
- **Centralization**: All campus activities in one place.
- **Discovery**: Semantic search to find relevant events easily.
- **Community**: Reddit-style discussions to foster deeper engagement.

## 2. Feature Implementation Matrix

This matrix outlines the features required for the Minimum Viable Product (MVP) to prove the concept, versus "Optimal" features for future production releases.

### Module A: Authentication & User Management

| Feature | Type | Description | Tools & Tech Stack |
|---------|------|-------------|-------------------|
| **Student Login** | MVP | Secure Email/Password login with JWT session management. | Node.js, Express, JWT, bcrypt |
| **Club Profiles** | MVP | Profiles for clubs to display logos, descriptions, and social links. | React, MongoDB, AWS S3 |
| **Admin Dashboard** | MVP | Super-admin panel to approve/reject new club registrations. | React Admin / Custom Dashboard |
| **User Flairs** | Optimal | Tags like "CS '26" or "Club President" displayed next to names. | MongoDB (User Schema), CSS |

### Module B: Events Engine

| Feature | Type | Description | Tools & Tech Stack |
|---------|------|-------------|-------------------|
| **Unified Event Feed** | MVP | Chronological feed of events with filtering (Date, Category). | MongoDB (Aggregations), React |
| **Event CRUD** | MVP | Form for clubs to create, update, and delete events with images. | React Hook Form, AWS S3 |
| **Semantic Search** | MVP | Search by meaning (e.g., "coding" finds "Hackathon"). | Pinecone / MongoDB Atlas, OpenAI |
| **Basic RSVP** | MVP | "I'm interested" button adds the event to the user's list. | MongoDB (User-Event Relation) |
| **Poster-to-Event** | Optimal | AI extracts Date/Time/Venue from uploaded poster images. | Tesseract.js (OCR) + LLM |
| **Calendar Sync** | Optimal | "Add to Google Calendar" button for students. | Google Calendar API |

### Module C: Community & Social ("The Reddit Layer")

| Feature | Type | Description | Tools & Tech Stack |
|---------|------|-------------|-------------------|
| **Threaded Comments** | MVP | Nested comments (Parent -> Child) with infinite depth support. | MongoDB (Materialized Path) |
| **Voting System** | MVP | Upvote/Downvote functionality for visibility. | MongoDB (Atomic operators) |
| **Rich Text Editor** | Optimal | Markdown support, code blocks, and inline images in comments. | Markdown-to-JSX |
| **Real-time Updates** | Optimal | New comments appear instantly without refreshing. | Socket.io |
| **Anonymous Mode** | Optimal | "Confession" style posts with identity masking. | Node.js Middleware |

### Module D: AI Integrations

| Feature | Type | Description | Tools & Tech Stack |
|---------|------|-------------|-------------------|
| **Thread Summarizer** | MVP | Button to summarize long discussions into bullet points. | LangChain, OpenAI / Llama 3 |
| **Smart Recommender** | Optimal | "Events you might like" based on past RSVPs. | Collaborative Filtering |
| **Duplicate Detector** | Optimal | AI warns if a similar question/event already exists before posting. | Vector Similarity Search |

## 3. Technical Implementation Details

### A. Database Schema for Threaded Comments
To handle nested discussions efficiently, the project will use the **Materialized Path Pattern** in MongoDB. This avoids recursive queries and ensures high read performance.

- **Structure**: Each comment stores a path string (e.g., `GrandparentID.ParentID`).
- **Benefit**: Allows fetching an entire discussion tree in a single database query by sorting by path.

### B. Media Storage (AWS S3)
All static assets (event posters, user avatars, club logos) will be offloaded to cloud storage.

- **Service**: AWS S3 (Simple Storage Service).
- **Library**: multer-s3 for Node.js.
- **Workflow**: Files are streamed directly from the API to the S3 bucket; the database stores only the public URL.

### C. Semantic Search Architecture
Enables users to search by intent rather than exact keywords.

- **Vector Database**: Pinecone or MongoDB Atlas Vector Search.
- **Embedding Model**: OpenAI text-embedding-3-small or HuggingFace local models.
- **Process**: Event descriptions are converted into vector embeddings upon creation. Search queries are converted to vectors to find the nearest mathematical neighbors.

## 4. Proposed Tech Stack Summary

- **Frontend**: React.js (Vite), Tailwind CSS, React Query
- **Backend**: Node.js, Express.js
- **Database**: MongoDB (Primary Data), Redis (Caching - Optional for MVP)
- **AI / ML**: LangChain (Orchestration), OpenAI API (Models), Pinecone (Vector DB)
- **Storage**: AWS S3 (Images/Media)
- **DevOps**: Docker (Containerization), GitHub Actions (CI/CD)

## 5. Target Users & Permissions

- **Student**: Can view events, search, RSVP, and comment.
- **Club Admin**: Can create/edit their club profile and publish events.
- **Super Admin**: Can approve new club registrations (security checkpoint).

## 6. Getting Started

### Prerequisites
- **Node.js**: v18 or higher
- **MongoDB**: v6 or higher (local or Atlas)
- **npm** or **yarn**: Package manager

### Clone the Repository
```bash
git clone https://github.com/yourusername/uninexus.git
cd uninexus
```

### Backend Setup

1. Navigate to the backend directory:
```bash
cd backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `backend` directory:
```env
PORT=3000
MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/uninexus?retryWrites=true&w=majority
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development

# AWS S3 Configuration
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=uninexus-media

# AI Services
OPENAI_API_KEY=your_openai_api_key

# Optional: Redis for caching
REDIS_URL=redis://localhost:6379
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:3000`

### Frontend Setup

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the `frontend` directory:
```env
VITE_API_URL=http://localhost:3000
```

4. Start the development server:
```bash
npm run dev
```

The frontend will run on `http://localhost:5173`

### Running Both Servers

You can run both servers simultaneously using separate terminal windows:

**Terminal 1 (Backend):**
```bash
cd backend && npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend && npm run dev
```

## 7. Project Structure

```
uninexus/
├── backend/
│   ├── src/
│   │   ├── config/         # Configuration files
│   │   ├── controllers/    # Route controllers
│   │   ├── middlewares/    # Custom middleware (auth, validation)
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic
│   │   ├── utils/          # Helper functions
│   │   └── server.ts       # Entry point
│   ├── .env
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api/            # API client functions
│   │   ├── assets/         # Static assets
│   │   ├── components/     # React components
│   │   ├── context/        # React context providers
│   │   ├── hooks/          # Custom React hooks
│   │   ├── pages/          # Page components
│   │   ├── types/          # TypeScript types
│   │   ├── utils/          # Helper functions
│   │   ├── App.tsx         # Main app component
│   │   └── main.tsx        # Entry point
│   ├── .env
│   └── package.json
└── README.md
```

## 8. Contributing

We welcome contributions! Here's how you can help:

### Development Workflow

1. **Fork the repository** and clone your fork
2. **Create a feature branch**:
```bash
git checkout -b feature/your-feature-name
```

3. **Make your changes** following our coding standards:
   - Use TypeScript for type safety
   - Follow existing code structure and naming conventions
   - Write meaningful commit messages
   - Add comments for complex logic

4. **Test your changes**:
   - Ensure the backend server runs without errors
   - Verify frontend components render correctly
   - Test API endpoints using Postman or similar tools

5. **Commit your changes**:
```bash
git add .
git commit -m "feat: add your feature description"
```

6. **Push to your fork**:
```bash
git push origin feature/your-feature-name
```

7. **Open a Pull Request** with a clear description of your changes

### Commit Message Convention

Follow conventional commits format:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `refactor:` Code refactoring
- `test:` Adding or updating tests
- `chore:` Maintenance tasks

### Code Style

- **Backend**: Use **TypeScript** for all backend code
- **Frontend**: Use **JavaScript** for frontend flexibility (team preference)
- Follow **ESLint** rules (run `npm run lint`)
- Use **Prettier** for code formatting
- Write descriptive variable and function names
- Add JSDoc comments for functions and complex logic

### Areas to Contribute

- **Authentication System**: JWT implementation, password hashing, role management
- **Event Management**: CRUD operations, filtering, search, RSVP system
- **Comment System**: Threaded comments with materialized path pattern
- **UI Components**: Reusable React components with Tailwind CSS
- **AI Integration**: OpenAI embeddings, semantic search, thread summarization
- **Testing**: Unit tests, integration tests, API testing
- **Documentation**: API docs, component docs, setup tutorials

### Questions or Issues?

- Open an issue for bugs or feature requests
- Join discussions in existing issues
- Reach out to maintainers for guidance

## 9. License

This project is licensed under the ISC License.
