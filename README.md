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
PORT=5000
MONGO_URI=mongodb://localhost:27017/uninexus
JWT_SECRET=your_jwt_secret_key_here
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
AWS_REGION=your_aws_region
AWS_S3_BUCKET=your_s3_bucket_name
OPENAI_API_KEY=your_openai_api_key
```

4. Start the development server:
```bash
npm run dev
```

The backend will run on `http://localhost:5000`

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
VITE_API_URL=http://localhost:5000
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

- Use **TypeScript** for all new code
- Follow **ESLint** rules (run `npm run lint`)
- Use **Prettier** for code formatting
- Write descriptive variable and function names
- Add JSDoc comments for functions and complex logic

### Areas to Contribute

- **Authentication System**: JWT implementation, password hashing
- **Event Management**: CRUD operations, filtering, search
- **Comment System**: Threaded comments with materialized path
- **UI Components**: Reusable React components with Tailwind
- **AI Integration**: OpenAI embeddings and summarization
- **Testing**: Unit tests, integration tests
- **Documentation**: API docs, component docs, tutorials

### Questions or Issues?

- Open an issue for bugs or feature requests
- Join discussions in existing issues
- Reach out to maintainers for guidance

## 9. License

This project is licensed under the ISC License.
