# Creating Auto-Injectable Modules

## Requirements

To create a module that can be automatically injected, your file must have:

1. **Default Export** - The class, function, or object to be injected
2. **Token Export** - A named export called `token` that serves as the injection token

## Examples

### Class-based Service

```typescript
// src/modules/services/user.service.ts
import { injectable } from 'tsyringe'
import type { InjectionToken } from 'tsyringe'

@injectable()
export default class UserService {
  getUsers() {
    return ['user1', 'user2']
  }
}

export const token: InjectionToken<UserService> = 'UserService'
```

### Repository Class

```typescript
// src/modules/repositories/user.repository.ts
import { injectable } from 'tsyringe'
import type { InjectionToken } from 'tsyringe'

@injectable()
export default class UserRepository {
  findById(id: string) {
    // Database logic here
    return { id, name: 'John Doe' }
  }
}

export const token: InjectionToken<UserRepository> = 'UserRepository'
```

### Use Case Class

```typescript
// src/modules/use_cases/get-user.usecase.ts
import { injectable } from 'tsyringe'
import type { InjectionToken } from 'tsyringe'
import { UserRepository } from '../repositories/user.repository'

@injectable()
export default class GetUserUseCase {
  constructor(private userRepository: UserRepository) {}

  execute(id: string) {
    return this.userRepository.findById(id)
  }
}

export const token: InjectionToken<GetUserUseCase> = 'GetUserUseCase'
```

### Value-based Configuration

```typescript
// src/modules/infrastructure/database.config.ts
import type { InjectionToken } from 'tsyringe'

export default {
  host: 'localhost',
  port: 5432,
  database: 'myapp'
}

export const token: InjectionToken<typeof databaseConfig> = 'DatabaseConfig'
```

### Route Handler

```typescript
// src/modules/routes/user.routes.ts
import { Router } from 'express'
import type { InjectionToken } from 'tsyringe'

export default function userRoutes() {
  const router = Router()
  
  router.get('/users', (req, res) => {
    res.json(['user1', 'user2'])
  })
  
  return router
}

export const token: InjectionToken<ReturnType<typeof userRoutes>> = 'UserRoutes'
```

## Best Practices

1. **Use descriptive tokens** - Make tokens unique and descriptive
2. **Add TypeScript types** - Always type your tokens for better type safety
3. **Use `@injectable()` decorator** - For classes, use the tsyringe decorator
4. **Keep files focused** - One module per file
5. **Follow naming conventions** - Use consistent naming for files and tokens

## File Structure

Place your modules in the appropriate directory under `src/modules/`:

```
src/modules/
├── infrastructure/
│   ├── database.config.ts
│   └── logger.service.ts
├── repositories/
│   ├── user.repository.ts
│   └── product.repository.ts
├── services/
│   ├── user.service.ts
│   └── email.service.ts
├── use_cases/
│   ├── get-user.usecase.ts
│   └── create-user.usecase.ts
└── routes/
    ├── user.routes.ts
    └── product.routes.ts
```