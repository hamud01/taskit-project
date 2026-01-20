# Dependency Injection Documentation

## Overview

This dependency injection system automatically discovers and registers modules from specific directories in your project.

## Functions

### `injectDependencies()`

**Location:** `src/di/index.ts:43`

Main function that orchestrates the dependency injection process. It scans the configured directories, processes each file, and registers valid modules in the DI container.

**Process:**
1. Gets the base directory (`src/modules`)
2. Scans all files recursively
3. Filters files by injectable dependency types
4. Processes each file to extract dependency and token
5. Registers valid modules in the container

### `getAllFiles(dir, acc)`

**Location:** `src/di/utils/file-scanner.ts:11`

Recursively scans a directory and returns all file paths.

**Parameters:**
- `dir` (string): Directory path to search
- `acc` (string[], optional): Accumulator array for file paths

**Returns:** Array of file paths

### `processFile(filePath)`

**Location:** `src/di/utils/file-processor.ts:11`

Dynamically imports a file and extracts the default export and token.

**Parameters:**
- `filePath` (string): Path to the file to process

**Returns:** Object containing:
- `dependency`: The default export
- `token`: The injection token

### `registerModule(dependency, token)`

**Location:** `src/di/utils/module-register.ts:11`

Registers a module in the tsyringe dependency injection container.

**Parameters:**
- `dependency`: The dependency to register
- `token`: The injection token for the dependency

**Behavior:**
- If dependency is a function: registers as singleton
- Otherwise: registers as value

### `getBaseDir()`

**Location:** `src/di/config/constants.ts:13`

Returns the base directory for modules.

**Returns:** Base directory path (`src/modules`)

## Constants

### `INJECTABLE_DEPENDENCIES`

**Location:** `src/di/config/constants.ts:5`

Array of folder names that can be auto-injected:
```typescript
['infrastructure', 'use_cases', 'repositories', 'routes', 'services']
```

### `rootDir`

**Location:** `src/di/config/constants.ts:7`

The current working directory of the process.