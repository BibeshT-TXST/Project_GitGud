# Book Inventory Application

A containerized full-stack application for managing book inventory with user authentication and CRUD operations.

## System Architecture

![System Architecture](./docs/architecture-diagram.png)

The application consists of three main components orchestrated with Docker Compose:

- **React Frontend** - User interface for authentication and book management
- **Express.js Backend** - REST API handling business logic and authentication
- **PostgreSQL Database** - Persistent storage for users and book data

## Features

- 🔐 **User Authentication & Authorization** - Secure login system with JWT tokens
- 📚 **Book Inventory Management** - Complete CRUD operations for books
- 🗄️ **Metadata Tracking** - Store and manage detailed book information
- 🐋 **Containerized Deployment** - Easy setup and deployment with Docker Compose

## Tech Stack

### Frontend
- React
- React Router (for navigation)
- Axios (for API calls)
- Modern CSS/Tailwind CSS

### Backend
- Node.js
- Express.js
- JWT for authentication
- bcrypt for password hashing

### Database
- PostgreSQL

### DevOps
- Docker & Docker Compose
- GitHub (Version Control)

