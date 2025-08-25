# Overview

StudyFlow is a comprehensive study productivity application that combines time management, task tracking, note-taking, and progress monitoring. Built as a full-stack web application, it features a Pomodoro timer, task management system with difficulty levels, note-taking with reminder capabilities, skill tracking, achievement system, and progress analytics. The application uses modern web technologies with a React frontend and Express backend, targeting students and learners who want to optimize their study sessions and track their academic progress.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
The client uses React with TypeScript in a single-page application (SPA) architecture. The UI is built with shadcn/ui components based on Radix UI primitives, styled with Tailwind CSS for consistent design. React Router (wouter) handles client-side routing between different sections like home, tasks, notes, FAQ, and contact. The application uses React Query (TanStack Query) for server state management, API calls, and caching. The frontend follows a component-based architecture with reusable UI components and custom hooks for shared logic like authentication.

## Backend Architecture
The server uses Express.js with TypeScript in an MVC pattern. Routes are organized in a centralized router that handles API endpoints for authentication, tasks, notes, skills, achievements, and study sessions. The application implements middleware for request logging, error handling, and authentication verification. File upload functionality is handled through Multer middleware for achievement certificates and other documents.

## Authentication System
Authentication is implemented using OpenID Connect (OIDC) with Replit's authentication service. The system uses Passport.js for authentication strategy handling and express-session for session management. Sessions are stored in PostgreSQL using connect-pg-simple for persistence across server restarts. Authentication middleware protects API routes and ensures users can only access their own data.

## Database Design
The application uses PostgreSQL as the primary database with Drizzle ORM for type-safe database operations. The schema includes users, tasks, notes, skills, achievements, study sessions, and session storage tables. All user-related tables include foreign key references to the users table with cascade deletion. The database uses UUID primary keys and includes proper indexing for session management.

## Data Models
- **Users**: Store profile information including email, name, and profile image
- **Tasks**: Include name, difficulty level (easy/medium/hard), completion status, and timestamps
- **Notes**: Support title, content, and optional reminder dates
- **Skills**: Track skill names, proficiency levels, and progress percentages
- **Achievements**: Store achievement details with optional certificate file uploads
- **Study Sessions**: Record session duration, type, and timestamps for analytics

## API Design
RESTful API endpoints follow standard HTTP methods and status codes. All endpoints require authentication except for the login flow. API responses are consistently formatted as JSON with proper error handling and status codes. File uploads are handled through multipart/form-data for achievement certificates.

## State Management
Client-side state is managed through React Query for server state and React hooks for local component state. The application implements optimistic updates for better user experience and automatic cache invalidation when data changes. Authentication state is managed globally through custom hooks.

# External Dependencies

## Database Services
- **Neon Database**: PostgreSQL hosting service accessed via connection pooling
- **@neondatabase/serverless**: Database driver optimized for serverless environments

## Authentication Provider
- **Replit Authentication**: OIDC-based authentication service for user management
- **OpenID Connect**: Standard authentication protocol implementation

## UI Component Libraries
- **Radix UI**: Headless UI components for accessibility and functionality
- **shadcn/ui**: Pre-built component library based on Radix UI
- **Tailwind CSS**: Utility-first CSS framework for styling

## Development Tools
- **Vite**: Build tool and development server for the frontend
- **TypeScript**: Type safety across the entire application
- **Drizzle ORM**: Type-safe database operations and migrations

## File Storage
- **Local File System**: Achievement certificate uploads stored in uploads directory
- **Multer**: File upload middleware with type and size restrictions

## Additional Libraries
- **React Query**: Server state management and caching
- **Chart.js**: Data visualization for progress tracking
- **date-fns**: Date manipulation and formatting
- **Wouter**: Lightweight client-side routing