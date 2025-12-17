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

## Prerequisites

- Docker (v20.10 or higher)
- Docker Compose (v2.0 or higher)
- Git
- Node.js (v18 or higher) - for local development

## Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/book-inventory-app.git
cd book-inventory-app
```

### 2. Environment Configuration

Create a `.env` file in the root directory:

```env
# Database
POSTGRES_USER=bookuser
POSTGRES_PASSWORD=your_secure_password
POSTGRES_DB=bookstore
DATABASE_URL=postgresql://bookuser:your_secure_password@db:5432/bookstore

# Backend
PORT=5000
JWT_SECRET=your_jwt_secret_key
NODE_ENV=production

# Frontend
REACT_APP_API_URL=http://localhost:5000
```

### 3. Run with Docker Compose

```bash
# Build and start all containers
docker-compose up -d

# View logs
docker-compose logs -f

# Stop all containers
docker-compose down
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **Database**: localhost:5432

## Project Structure

```
book-inventory-app/
├── frontend/              # React application
│   ├── src/
│   │   ├── components/   # Reusable components
│   │   ├── pages/        # Page components
│   │   ├── services/     # API service layer
│   │   └── App.js
│   ├── Dockerfile
│   └── package.json
├── backend/              # Express API
│   ├── src/
│   │   ├── controllers/  # Request handlers
│   │   ├── models/       # Database models
│   │   ├── routes/       # API routes
│   │   ├── middleware/   # Auth & validation
│   │   └── server.js
│   ├── Dockerfile
│   └── package.json
├── database/             # Database scripts
│   └── init.sql         # Initial schema
├── docker-compose.yml
├── .env.example
└── README.md
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - User login
- `GET /api/auth/profile` - Get user profile (protected)

### Books
- `GET /api/books` - Get all books (protected)
- `GET /api/books/:id` - Get book by ID (protected)
- `POST /api/books` - Create new book (protected)
- `PUT /api/books/:id` - Update book (protected)
- `DELETE /api/books/:id` - Delete book (protected)

## Database Schema

### Users Table
```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  email VARCHAR(100) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### Books Table
```sql
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  isbn VARCHAR(13) UNIQUE,
  publisher VARCHAR(255),
  publication_year INTEGER,
  genre VARCHAR(100),
  quantity INTEGER DEFAULT 0,
  description TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

## Development

### Running Locally (without Docker)

1. **Start PostgreSQL**
```bash
# Install and start PostgreSQL locally
# Create database: bookstore
```

2. **Backend**
```bash
cd backend
npm install
npm run dev
```

3. **Frontend**
```bash
cd frontend
npm install
npm start
```

### Running Tests

```bash
# Backend tests
cd backend
npm test

# Frontend tests
cd frontend
npm test
```

## Docker Commands

```bash
# Rebuild containers after code changes
docker-compose up -d --build

# View container status
docker-compose ps

# Access container shell
docker-compose exec backend sh
docker-compose exec frontend sh
docker-compose exec db psql -U bookuser -d bookstore

# Remove all containers and volumes
docker-compose down -v
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL container is running: `docker-compose ps`
- Check database logs: `docker-compose logs db`
- Verify environment variables in `.env`

### Port Already in Use
- Change ports in `docker-compose.yml`
- Or stop the conflicting service

### Frontend Can't Reach Backend
- Verify `REACT_APP_API_URL` in `.env`
- Check CORS settings in backend
- Ensure backend container is running

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Authors

- Your Name - [GitHub Profile](https://github.com/yourusername)

## Acknowledgments

- React documentation
- Express.js guides
- PostgreSQL documentation
- Docker best practices