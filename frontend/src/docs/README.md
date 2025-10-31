# ImpactX Documentation

Welcome to the ImpactX documentation. This documentation covers all aspects of the platform, from user guides to technical implementation details.

## Table of Contents

1. [User Guides](#user-guides)
2. [Technical Documentation](#technical-documentation)
3. [API Reference](#api-reference)
4. [Development Guides](#development-guides)
5. [Deployment](#deployment)

## User Guides

- [Analytics Guide](ANALYTICS_GUIDE.md) - How to use the analytics features
- [User Management](USER_MANAGEMENT.md) - Account and preference management
- [Projects Guide](PROJECTS_GUIDE.md) - Browsing and donating to projects
- [Impact Stories](IMPACT_STORIES.md) - Reading and sharing impact stories

## Technical Documentation

- [Architecture Overview](../../architecture.md) - System architecture and design
- [Technology Stack](../../README.md#technology-stack) - Technologies used in the platform
- [Database Schema](../../backend/prisma/schema.prisma) - Database structure and relationships
- [Smart Contracts](../../backend/algorand/contracts/) - TEAL smart contract documentation

## API Reference

The ImpactX API provides programmatic access to platform features:

### Authentication
```
POST /api/auth/login
POST /api/auth/register
POST /api/auth/logout
GET /api/auth/profile
```

### Projects
```
GET /api/projects
GET /api/projects/:id
POST /api/projects/:id/donate
GET /api/projects/:id/impact
```

### Analytics
```
GET /api/analytics/overview
GET /api/analytics/donations
GET /api/analytics/projects
GET /api/analytics/impact
```

### User Management
```
GET /api/users/profile
PUT /api/users/profile
GET /api/users/preferences
PUT /api/users/preferences
```

## Development Guides

### Frontend Development

The frontend is built with React, Vite, and Tailwind CSS:

- Components are located in `src/components/`
- Pages are located in `src/pages/`
- Hooks are located in `src/hooks/`
- Services are located in `src/services/`
- Utilities are located in `src/utils/`

### Backend Development

The backend is built with Node.js and Express:

- Controllers are located in `backend/src/controllers/`
- Services are located in `backend/src/services/`
- Routes are located in `backend/src/routes/`
- Middleware is located in `backend/src/middleware/`

### Smart Contract Development

Smart contracts are written in TEAL:

- Contracts are located in `backend/algorand/contracts/`
- Deployment scripts are in `backend/algorand/scripts/`
- Tests are in `backend/algorand/test/`

## Deployment

### Local Development

1. Clone the repository
2. Install dependencies:
   ```bash
   cd frontend && npm install
   cd backend && npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
4. Run the development servers:
   ```bash
   cd frontend && npm run dev
   cd backend && npm run dev
   ```

### Production Deployment

1. Build the frontend:
   ```bash
   cd frontend && npm run build
   ```
2. Set up production environment variables
3. Run the production server:
   ```bash
   cd backend && npm start
   ```

### Docker Deployment

```bash
docker-compose -f docker-compose.prod.yml up --build
```

### Kubernetes Deployment

Apply the manifests in the `k8s/` directory:
```bash
kubectl apply -f k8s/
```

## Contributing

We welcome contributions to ImpactX. Please see [CONTRIBUTING.md](../../CONTRIBUTING.md) for details on how to contribute.

## License

This project is licensed under the MIT License. See [LICENSE](../../LICENSE) for details.