# Dependencies injection automatically

see `src/di/index.ts`

- [x] refactore each function in individual file 
- [x] document each function
- [x] document how to create a auto injectable module (requires a default export and a token) with examples
- [x] document which folders can be auto injected.

  ```typescript
  const INJECTABLE_DEPENDENCIES = ['infrastructure', 'use_cases', 'repositories', 'routes', 'services']
  ```

# Documentation

- [x] Create ./docs folder and put all documentation *.md file into
- [x] Document the architecture of my system  
  - and I have separated the layers into several modules each with a 'domain' - 'application' - 'infrastructure' - 'presentation' structure
  - all modules are in src/modules. cite modules #core, #user...
  - src/shared groups all these common characteristics, for example Router slice abstraction (it is part of infrastructure), domain/ValueObject is the abstract value object from which all value objects inherit (at the moment it only supports strings)

- [x] Document the dependencies injection system updates (add new INJECTABLE_DEPENDENCIES)

- [x] update documentation auto injectable dependencies require explicitly to export dependencie as a function(not arrow function) or classes by default

- [x] commit previous changes and push to remote repo