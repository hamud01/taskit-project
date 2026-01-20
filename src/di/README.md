# Dependency Injection Documentation

## Overview

This dependency injection system automatically discovers and registers modules from specific directories in your project.

## Documentation Files

- **[Functions Documentation](./README.md)** - Detailed documentation of all functions
- **[Auto-Injectable Modules Guide](./AUTO_INJECTABLE_GUIDE.md)** - How to create auto-injectable modules with examples
- **[Injectable Folders Guide](./FOLDERS_GUIDE.md)** - Which folders can be auto-injected and their purposes

## Quick Start

1. Create a module in one of the injectable folders (`infrastructure`, `use_cases`, `repositories`, `routes`, `services`)
2. Export a default export and a `token` named export
3. Call `injectDependencies()` to register all modules

See the guides above for detailed examples and best practices.