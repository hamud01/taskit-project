# Auto-Injectable Folders

## Overview

The dependency injection system automatically scans specific folders for modules that can be injected. Only files in these folders will be processed for auto-injection.

## Injectable Folders

The following folders are configured for auto-injection:

```typescript
const INJECTABLE_DEPENDENCIES = [
  'infrastructure',
  'use_cases', 
  'repositories',
  'presentation',
  'services',
]
```

### 1. `infrastructure/`

**Purpose:** Low-level system components and configurations

**Examples:**
- Database configurations
- Logger implementations
- External service clients
- Cache implementations
- Message queue connections

**File Structure:**
```
src/modules/infrastructure/
├── database.config.ts
├── logger.service.ts
├── redis.client.ts
└── email.client.ts
```

### 2. `use_cases/`

**Purpose:** Business logic and application use cases

**Examples:**
- User management operations
- Order processing logic
- Authentication flows
- Data validation rules

**File Structure:**
```
src/modules/use_cases/
├── get-user.usecase.ts
├── create-user.usecase.ts
├── process-order.usecase.ts
└── authenticate-user.usecase.ts
```

### 3. `repositories/`

**Purpose:** Data access layer and database operations

**Examples:**
- User repositories
- Product repositories
- Order repositories
- Custom query builders

**File Structure:**
```
src/modules/repositories/
├── user.repository.ts
├── product.repository.ts
├── order.repository.ts
└── base.repository.ts
```

### 4. `routes/`

**Purpose:** HTTP route definitions and API endpoints

**Examples:**
- User routes
- Product routes
- Order routes
- Health check routes

**File Structure:**
```
src/modules/routes/
├── user.routes.ts
├── product.routes.ts
├── order.routes.ts
└── health.routes.ts
```

### 5. `presentation/`

**Purpose:** HTTP controllers, middleware, and API presentation layer

**Examples:**
- API controllers
- Request/response middleware
- Error handlers
- API transformers

**File Structure:**
```
src/modules/presentation/
├── controllers/
│   ├── user.controller.ts
│   └── product.controller.ts
├── middleware/
│   ├── auth.middleware.ts
│   └── validation.middleware.ts
└── error.handler.ts
```

### 6. `services/`

**Purpose:** Application services and business logic coordination

**Examples:**
- User services
- Email services
- Payment services
- Notification services

**File Structure:**
```
src/modules/services/
├── user.service.ts
├── email.service.ts
├── payment.service.ts
└── notification.service.ts
```

## Folder Hierarchy

All injectable folders must be located under:
```
src/modules/
├── infrastructure/
├── use_cases/
├── repositories/
├── presentation/
├── routes/
└── services/
```

## Adding New Folders

To add a new folder to the auto-injection system:

1. **Update the constant** in `src/di/config/constants.ts`:
```typescript
export const INJECTABLE_DEPENDENCIES = [
  'infrastructure', 
  'use_cases', 
  'repositories', 
  'presentation',
  'routes', 
  'services',
  'your_new_folder'  // Add your new folder here
]
```

2. **Create the folder** under `src/modules/`
3. **Add modules** that follow the auto-injectable pattern

## Excluded Folders

Any folder not listed in `INJECTABLE_DEPENDENCIES` will be ignored by the auto-injection system, even if it's under `src/modules/`. This includes:

- `controllers/`
- `middleware/`
- `utils/`
- `types/`
- `interfaces/`
- `tests/`
- `__tests__/`

## Best Practices

1. **Keep folders focused** - Each folder should have a single, clear responsibility
2. **Follow naming conventions** - Use consistent naming across your modules
3. **Avoid deep nesting** - Keep the folder structure flat and maintainable
4. **Use descriptive names** - Make folder names self-explanatory