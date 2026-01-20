# System Architecture

## Overview

This project follows a clean architecture pattern with dependency injection, organized into modular layers. Each module maintains its own separation of concerns while sharing common infrastructure.

## Module Structure

All modules are located in `src/modules/` and follow this consistent structure:

```
src/modules/[module-name]/
├── domain/           # Business logic and entities
├── application/      # Use cases and application logic
├── infrastructure/  # External dependencies and data access
└── presentation/    # API endpoints and UI controllers
```

## Core Modules

### #core Module
The core module provides fundamental infrastructure for the entire application:

- **Configuration**: Environment variable management and validation
- **Database**: MongoDB connection management
- **HTTP Server**: Express server setup and middleware orchestration
- **Application**: Main application lifecycle management
- **Global Middlewares**: Shared Express middleware (CORS, security, logging)

### #user Module
The user module handles user-related functionality:

- **Domain**: User entities and business rules
- **Application**: User use cases (registration, authentication, etc.)
- **Infrastructure**: User data persistence and external services
- **Presentation**: User API endpoints

## Shared Components

The `src/shared/` directory contains common functionality used across modules:

### Infrastructure
- **RouterSlice**: Abstract base class for API routing
- Common middleware and utilities

### Domain
- **ValueObject**: Abstract base class for value objects (currently supports string validation)
- Shared domain logic and interfaces

### Types
- **Config**: Application configuration type definitions
- **Routing**: Routing-related type definitions
- Common type definitions used throughout the system

## Dependency Injection

The system uses automatic dependency injection with the following conventions:

### Auto-Injectable Folders
```typescript
const INJECTABLE_DEPENDENCIES = ['infrastructure', 'use_cases', 'repositories', 'routes', 'services']
```

### Creating an Auto-Injectable Module
To create a module that can be automatically injected:

1. **Default Export**: The module must have a default export
2. **Token Export**: The module must export a `token` constant
3. **Location**: Place in one of the injectable folders

Example:
```typescript
// src/modules/user/infrastructure/UserRepository.ts
import { injectable } from 'tsyringe'

@injectable()
export default class UserRepository {
  // Implementation
}

export const token = 'user:user-repository'
```

## Layer Separation

### Domain Layer
- Contains business logic and entities
- No external dependencies
- Pure TypeScript/JavaScript

### Application Layer  
- Contains use cases and application logic
- Depends on domain and infrastructure interfaces
- Orchestrates business workflows

### Infrastructure Layer
- Contains external dependencies
- Database connections, external APIs, file systems
- Implements interfaces defined in domain/application layers

### Presentation Layer
- Contains API controllers and routes
- Handles HTTP requests/responses
- Depends on application layer use cases

## Benefits of This Architecture

1. **Modularity**: Each module is self-contained and can be developed independently
2. **Testability**: Clear separation allows for easy unit testing
3. **Maintainability**: Changes in one layer don't affect others
4. **Scalability**: New modules can be added following the same pattern
5. **Dependency Injection**: Automatic wiring reduces boilerplate and improves flexibility