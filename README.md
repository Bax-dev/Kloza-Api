#  Kloza Ideas API

[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Jest](https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white)](https://jestjs.io/)
[![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)](https://swagger.io/)

A robust REST API for managing ideas, collaborations, and discussions in the Kloza ecosystem. Built with modern technologies and best practices for scalability and maintainability.

## Table of Contents

- [ Features](#-features)
- [ Architecture](#️-architecture)
- [ Tech Stack](#️-tech-stack)
- [ Prerequisites](#-prerequisites)
- [ Installation](#-installation)
- [ Configuration](#️-configuration)
- [ Running the Application](#️-running-the-application)
- [ API Documentation](#-api-documentation)
- [ Testing](#-testing)
- [Project Structure](#-project-structure)
- [ Contributing](#-contributing)
- [ License](#-license)

## Features

- **Idea Management**: Create, read, and manage innovative ideas with status tracking
- **Collaboration System**: Turn ideas into actionable projects with participant management
- **Discussion Threads**: Enable team communication within collaboration contexts
- **RESTful API**: Well-structured endpoints following REST principles
- **Type Safety**: Full TypeScript implementation with strict typing
- **Database Integration**: MongoDB with Mongoose ODM
- **API Documentation**: Interactive Swagger/OpenAPI documentation
- **Comprehensive Testing**: Unit and integration tests with Jest
- **Error Handling**: Robust error handling and validation
- **Input Sanitization**: Secure input processing and validation
- **Pagination**: Efficient data retrieval with pagination support
- **Health Checks**: Built-in health monitoring endpoints

## Architecture

The API follows a layered architecture pattern:

```
┌─────────────────┐
│   Controllers   │ ← Handle HTTP requests & responses
├─────────────────┤
│    Services     │ ← Business logic layer
├─────────────────┤
│   Repositories  │ ← Data access layer
├─────────────────┤
│    Database     │ ← MongoDB with Mongoose
└─────────────────┘
```

### Business Model

The system operates on a hierarchical structure:
- **Ideas**: Core concepts or proposals (draft → approved → archived)
- **Kollabs**: Active collaborations based on approved ideas (active → completed → cancelled)
- **Discussions**: Communication threads within kollabs

##  Tech Stack

- **Runtime**: Node.js (≥18)
- **Language**: TypeScript
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Testing**: Jest with Supertest
- **Documentation**: Swagger/OpenAPI
- **Development**: ts-node-dev for hot reloading
- **Validation**: Custom validators with input sanitization
- **Middleware**: Morgan (logging), CORS, body parsing

## Prerequisites

Before running this application, make sure you have:

- **Node.js** (>= 18.0.0)
- **npm** or **yarn**
- **MongoDB** (local installation or cloud instance like MongoDB Atlas)

## Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Bax-dev/Kloza-Api.git
   cd kloza-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

## Configuration

Create a `.env` file in the root directory with the following variables:

```env
# Database Configuration
MONGODB_URI=mongodb://localhost:27017/kloza-app

# Server Configuration
PORT=3000
NODE_ENV=development
```

### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `MONGODB_URI` | MongoDB connection string | `mongodb://localhost:27017/kloza-app` | No |
| `PORT` | HTTP server port | `3000` | No |
| `NODE_ENV` | Environment mode | `development` | No |

## Running the Application

### Development Mode

```bash
npm run dev
```

Starts the server with hot reloading using `ts-node-dev`.

### Production Mode

```bash
npm run build
npm start
```

Compiles TypeScript and runs the optimized JavaScript build.

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server with hot reload |
| `npm run build` | Compile TypeScript to JavaScript |
| `npm start` | Start production server |
| `npm run type-check` | Run TypeScript type checking |
| `npm test` | Run tests once |
| `npm run test:watch` | Run tests in watch mode |
| `npm run test:coverage` | Generate test coverage report |

## API Documentation

### Base URL
```
http://localhost:3000
```

### API Endpoints

#### Health & Status
- `GET /` - Server status
- `GET /health` - Health check

#### Ideas Management
- `POST /api/ideas` - Create a new idea
- `GET /api/ideas` - Get all ideas (paginated)
- `GET /api/ideas/:id` - Get idea by ID

#### Kollabs Management
- `POST /api/kollabs` - Create a kollab from an approved idea
- `GET /api/kollabs` - Get all kollabs (paginated)
- `GET /api/kollabs/:id` - Get kollab by ID
- `PATCH /api/kollabs/:id/status` - Update kollab status

#### Discussions
- `POST /api/discussions` - Create a discussion message
- `GET /api/discussions/:kollabId` - Get discussions for a kollab

### Interactive Documentation

Access the Swagger UI at:
```
http://localhost:3000/swagger
```

## Testing

The project includes comprehensive testing with Jest and Supertest.

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:coverage
```

### Test Structure

Tests are organized in `src/__tests__/` with:
- **Unit tests** for utilities and services
- **Integration tests** for API endpoints
- **Controller tests** for business logic

## Project Structure

```
kloza-app/
├── src/
│   ├── __tests__/           # Test files
│   │   └── controllers/
│   ├── config/              # Configuration files
│   │   ├── database.ts      # MongoDB connection
│   │   └── swagger.ts       # API documentation config
│   ├── controllers/         # Route handlers
│   │   ├── ideaController.ts
│   │   ├── kollabController.ts
│   │   └── discussionController.ts
│   ├── routes/              # Route definitions
│   │   ├── ideaRoutes.ts
│   │   └── kollabRoutes.ts
│   ├── schemas/             # MongoDB schemas
│   │   ├── Idea.ts
│   │   ├── Kollab.ts
│   │   └── Discussion.ts
│   ├── services/            # Business logic services
│   ├── types/               # TypeScript type definitions
│   │   ├── idea.ts
│   │   ├── kollab.ts
│   │   └── discussion.ts
│   ├── utils/               # Utility functions
│   │   ├── constants.ts     # Application constants
│   │   ├── response.ts      # Response helpers
│   │   └── validators.ts    # Input validation
│   └── index.ts             # Application entry point
├── .env.example             # Environment variables template
├── jest.config.js           # Jest configuration
├── package.json             # Dependencies and scripts
├── tsconfig.json            # TypeScript configuration
└── README.md               # This file
```

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

**Built for the Kloza community**

For questions or support, please open an issue in this repository.
