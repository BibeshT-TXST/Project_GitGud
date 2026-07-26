# Book Inventory Application

A containerized full-stack web application designed for tracking and managing book inventory. Features a secure user authentication system, interactive data grids with search and filtering, analytical dashboards, and complete CRUD operations.

## System Architecture

![System Architecture](./docs/bookinv-diagram.png)

The application is structured into three decoupled layers and orchestrated using Docker Compose:

- **React Frontend (Nginx)** - Modern single-page application (SPA) built with React and Vite, styled with Tailwind CSS and Material-UI (MUI), and served in production via Nginx reverse proxy.
- **Express.js Backend API** - RESTful API server handling business logic, PostgreSQL database transactions, and secure JWT-based user authentication.
- **PostgreSQL Database** - Persistent relational storage initialized with custom schemas and seed data.

## Features

- 🔐 **User Security** - Secure authentication utilizing **Argon2** password hashing combined with server-side peppering and stateless **JSON Web Tokens (JWT)**. Includes an in-memory token blacklist middleware to immediately revoke credentials upon logout.
- 📚 **Complete Inventory CRUD** - Create, read, update, and delete book records with rich metadata tracking (ISBN, Title, Book Type, Current Status, and Purchase Date). Includes transactional support for wholesale inventory clearing.
- 🔍 **Interactive Filtering & Export** - Search books by title or ISBN, filter records by status (`Available`, `Checked Out`, etc.) or format (`Hardcover`, `Paperback`, etc.), and export selected inventory rows directly to CSV.
- 📊 **Real-Time Analytics Dashboard** - Overview metrics presenting total collection counts alongside breakdowns by book status and binding format.
- 🐋 **Production-Ready Containerization** - Multi-stage Docker builds with Nginx reverse-proxying API calls directly to the Express backend container.

## Tech Stack

### Frontend
- **React 18** / **Vite**
- **Material-UI (MUI) & X-Data-Grid** for responsive data tables and UI components
- **Tailwind CSS** for modern utility styling
- **React Router DOM** for client-side routing and protected routes
- **Axios** with request/response interceptors for token handling

### Backend
- **Node.js** & **Express.js**
- **Argon2** & **Crypto** for password hashing and peppering
- **JSON Web Tokens (JWT)** for stateless authentication
- **pg (node-postgres)** connection pool for database queries
- **Jest** & **Supertest** for automated API integration testing

### Database & DevOps
- **PostgreSQL 16 (Alpine)**
- **Docker & Docker Compose**
- **Nginx** (SPA routing and API reverse-proxy)

## Prerequisites

- **Docker** and **Docker Compose** installed on your system
- **Git** for cloning the repository
- **Node.js** (v18+) and **npm** (optional, only required for local development outside Docker)

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/BibeshT-TXST/Project_GitGud.git
cd Project_GitGud
```

### 2. Environment Configuration

Create a `.env` file in the project root directory. The values below match the default credentials used in the database Dockerfile:

```env
# Database Credentials
DB_USER=postgres
DB_PASSWORD=postgres
DB_HOST=inventory-db
DB_PORT=5432
DB_NAME=books

# Security Secrets
JWT_SECRET=your_super_secret_jwt_key_here
PEPPER_SECRET=your_super_secret_pepper_string_here
```

### 3. Run with Docker Compose

Build and launch all services in detached mode:

```bash
docker-compose up --build -d
```

Check logs to verify all containers started successfully:

```bash
docker-compose logs -f
```

Once running, access the services at:
- **Frontend Application**: [http://localhost](http://localhost) (or `http://localhost:80`)
- **Backend API Server**: [http://localhost:5000](http://localhost:5000)
- **PostgreSQL Database**: `localhost:5432`

To shut down and remove all containers:

```bash
docker-compose down
```

## Project Structure

```
Project_GitGud/
├── client/                  # React frontend application
│   ├── src/
│   │   ├── api/             # Axios instance & token interceptors
│   │   ├── components/      # UI components (Navbar, Searchbar, Tables, Modals)
│   │   ├── context/         # AuthContext for managing user state & JWT
│   │   ├── pages/           # Page views (Login, Landing, Dashboard, Inventory)
│   │   └── utils/           # Helper utilities (CSV export, table filtering)
│   ├── Dockerfile           # Multi-stage Docker build with Nginx
│   └── nginx.conf           # Nginx reverse proxy & SPA routing config
├── server/                  # Express.js REST API backend
│   ├── app.js               # Express application, middleware, & routes
│   ├── server.js            # Server HTTP port binding
│   ├── db.js                # PostgreSQL connection pool setup
│   ├── tests/               # Jest & Supertest integration tests
│   └── Dockerfile           # Node.js backend container config
├── database/                # Database configuration & initialization
│   ├── init.sql             # Schema definitions (books & users tables)
│   ├── seed.sql             # Initial sample inventory data
│   └── Dockerfile           # Custom PostgreSQL database image
├── docs/                    # Architecture diagrams & documentation
└── docker-compose.yml       # Multi-container service orchestration
```

## API Endpoints

### Authentication
- `POST /auth/signup` - Register a new user account (hashed with Argon2 + pepper)
- `POST /auth/login` - Authenticate user and receive JWT bearer token
- `POST /auth/logout` - Revoke current JWT token (added to in-memory blacklist)

### Inventory Management
- `GET /api/inventory/stats` - Retrieve inventory statistics (total count and category breakdowns)
- `GET /api/inventory` - Fetch all books in the database
- `POST /api/inventory/add` - Create and add a new book record
- `PUT /api/inventory/:isbn` - Update an existing book's details by ISBN
- `DELETE /api/inventory/:isbn` - Delete a specific book by ISBN
- `DELETE /api/inventory` - Delete all books (protected by an atomic database transaction)

## Running Tests

To run automated backend API tests locally:

```bash
cd server
npm install
npm test
```

## License

This project is open-source and available under standard terms.

