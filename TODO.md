# Dependencies injection automatically

see `src/di/index.ts`

- [x] refactore each function in individual file 
- [x] document each function
- [x] document how to create a auto injectable module (requires a default export and a token) with examples
- [x] document which folders can be auto injected.

  ```typescript
  const INJECTABLE_DEPENDENCIES = ['infrastructure', 'use_cases', 'repositories', 'routes', 'services']
  ```

