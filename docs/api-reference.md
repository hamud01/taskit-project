# API Reference

## Overview

This document provides a comprehensive reference for all API endpoints and services available in the Taskit project.

## Core Infrastructure APIs

### Configuration API

The configuration system provides environment-based settings management.

#### Type: `ApplicationConfig`

```typescript
interface ApplicationConfig {
  httpServer: {
    host: string;
    port: number;
    cookieSecret: string;
    origin: string;
  };
  mongoDB: {
    uri: string;
  };
  security: {
    jwtSecret: string;
  };
}
```

#### Environment Variables

| Variable | Description | Default | Required |
|----------|-------------|---------|----------|
| `NODE_ENV` | Environment mode | - | No |
| `HOST` | Server host | localhost | No |
| `PORT` | Server port | 8000 | No |
| `ORIGIN` | CORS origin | http://localhost:3000 | No |
| `COOKIE_SECRET` | Cookie signing secret | secret | No |
| `MONGO_URI` | MongoDB connection string | mongodb://localhost:27017/taskit | No |
| `JWT_SECRET` | JWT signing secret | secret | No |

### Database API

#### MongoDB Connection Manager

**Token**: `core:mongo-db`

```typescript
class MongoDB {
  async connect(config: ApplicationConfig['mongoDB']): Promise<void>;
  async disconnect(): Promise<void>;
}
```

**Methods**:
- `connect()`: Establishes connection to MongoDB
- `disconnect()`: Closes MongoDB connection

### HTTP Server API

#### Express Server Manager

**Token**: `core:http-server`

```typescript
class HttpServer {
  run(config: ApplicationConfig['httpServer']): void;
  close(): void;
}
```

**Methods**:
- `run()`: Starts the HTTP server with provided configuration
- `close()`: Gracefully shuts down the HTTP server

### Global Middlewares API

#### Express Middleware Factory

**Token**: `core:global-middlewares`

```typescript
function GlobalMiddlewares(): (origin: string, cookieSecret: string) => RequestHandler[]
```

**Returns array of middleware**:
- `json()`: JSON body parser
- `urlencoded({ extended: true })`: URL-encoded body parser
- `cors({ origin, credentials: true })`: CORS middleware
- `helmet({ hidePoweredBy: true })`: Security headers
- `cookieParser(cookieSecret)`: Cookie parsing
- `morgan('dev')`: HTTP request logging

### Application API

#### Main Application Orchestrator

**Token**: `core:application`

```typescript
class Application {
  async start(): Promise<void>;
  async shutdown(): Promise<void>;
}
```

**Methods**:
- `start()`: Initializes and starts the application
- `shutdown()`: Gracefully shuts down the application

## Dependency Injection API

### Injectable Tokens

All injectable services use the pattern `[module]:[service]`:

| Token | Service | Module |
|-------|---------|--------|
| `core:config` | Application configuration | Core |
| `core:mongo-db` | MongoDB connection manager | Core |
| `core:http-server` | HTTP server manager | Core |
| `core:global-middlewares` | Express middlewares factory | Core |
| `core:application` | Main application orchestrator | Core |

### Auto-Injectable Patterns

#### Service Class Pattern

```typescript
import { injectable } from 'tsyringe';

@injectable()
export default class MyService {
  constructor(
    @inject('core:config') private config: ApplicationConfig
  ) {}
  
  // Service methods
}

export const token = 'my-module:my-service';
```

#### Factory Function Pattern

```typescript
export default function createService(config: ApplicationConfig) {
  return new MyService(config);
}

export const token = 'my-module:my-service-factory';
```

## Module Structure API

### Standard Module Layout

```
src/modules/[module-name]/
├── domain/
│   ├── entities/
│   ├── value-objects/
│   └── interfaces/
├── application/
│   ├── use_cases/
│   └── services/
├── infrastructure/
│   ├── repositories/
│   ├── models/
│   └── external/
└── presentation/
    ├── controllers/
    └── routes/
```

### Auto-Injectable Folders

The following folders are automatically scanned for injectable dependencies:

```typescript
const INJECTABLE_DEPENDENCIES = [
  'infrastructure',
  'use_cases', 
  'repositories',
  'routes',
  'services'
];
```

## Shared Components API

### Router Slice API

**Location**: `src/shared/infrastructure/RouterSlice.ts`

```typescript
abstract class RouterSlice {
  abstract get routes(): Router;
  abstract get path(): string;
}
```

### Value Object API

**Location**: `src/shared/domain/ValueObject.ts`

```typescript
abstract class ValueObject<T> {
  readonly value: T;
  
  protected constructor(value: T) {
    this.value = value;
  }
  
  equals(other: ValueObject<T>): boolean;
}
```

## Type Definitions

### Configuration Types

**Location**: `src/shared/types/Config.d.ts`

```typescript
interface ApplicationConfig {
  httpServer: HttpServerConfig;
  mongoDB: MongoDBConfig;
  security: SecurityConfig;
}
```

### Routing Types

**Location**: `src/shared/types/Routing.d.ts`

```typescript
interface RouteConfig {
  path: string;
  method: HttpMethod;
  handler: RequestHandler;
  middleware?: RequestHandler[];
}
```

## Error Handling

### Standard Error Types

```typescript
class ConfigurationError extends Error {
  constructor(message: string);
}

class DatabaseConnectionError extends Error {
  constructor(message: string);
}

class ServerStartupError extends Error {
  constructor(message: string);
}
```

## Lifecycle Events

### Application Events

- `SIGINT`: Graceful shutdown on interrupt
- `SIGTERM`: Graceful shutdown on termination
- `server:start`: Server started successfully
- `server:close`: Server closed successfully
- `db:connect`: Database connected
- `db:disconnect`: Database disconnected

## Development API

### Bootstrap Process

**Location**: `src/bootstrap.ts`

```typescript
async function bootstrap(): Promise<void> {
  // Initialize dependency injection container
  // Register all modules
  // Start application
}
```

### Entry Point

**Location**: `src/index.ts`

```typescript
import { bootstrap } from './bootstrap';

bootstrap().catch(console.error);
```

## Testing API

### Mock Services

```typescript
export class MockMongoDB implements MongoDB {
  async connect(): Promise<void> {
    // Mock implementation
  }
  
  async disconnect(): Promise<void> {
    // Mock implementation
  }
}
```

### Test Utilities

```typescript
export function createTestConfig(): ApplicationConfig {
  return {
    httpServer: {
      host: 'localhost',
      port: 3001,
      cookieSecret: 'test-secret',
      origin: 'http://localhost:3000'
    },
    mongoDB: {
      uri: 'mongodb://localhost:27017/test'
    },
    security: {
      jwtSecret: 'test-jwt-secret'
    }
  };
}
```