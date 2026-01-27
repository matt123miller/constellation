# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Constellation is a CLI tool for generating opinionated Astro components, pages, and API routes. It uses Commander.js for CLI parsing, EJS for templating, and Inquirer for interactive prompts.

## Build Commands

```bash
npm run build    # Compile TypeScript and copy templates to dist/
npm run dev      # Watch mode for TypeScript compilation
npm run tsc      # Type check only
```

The build process compiles TypeScript to `dist/` and copies `src/templates/` to `dist/templates/` (templates must be available at runtime).

## Architecture

### Command Flow

1. **Entry point** (`src/index.ts`): Registers three commands using Commander
2. **Command handlers** (`src/commands/`): Parse arguments, trigger prompts if needed, orchestrate file generation
3. **Utilities** (`src/utils/`): Handle naming conventions, template rendering, and interactive prompts
4. **Templates** (`src/templates/`): EJS templates for generated files

### CLI Commands

All commands support both interactive (no args) and non-interactive (with name argument) modes:

```bash
constellation component [name]  # alias: c
constellation page [name]       # alias: p
constellation api [name]        # alias: a
```

Common options: `-p, --path <path>`, `-s, --skip-test`, `-d, --dry-run`

### Naming Conventions

- **Components**: PascalCase filenames (`MyComponent.astro`)
- **Pages/APIs**: kebab-case filenames (`my-page.astro`, `my-api.ts`)

The `src/utils/naming.ts` module provides `toPascalCase`, `toKebabCase`, and `toCamelCase` converters.

### Template System

Templates in `src/templates/` use EJS with these variables:
- `name` - original input
- `pascalName`, `kebabName`, `camelName` - converted versions

Each artifact type has a main template and a test template (e.g., `component.astro.ejs`, `component.test.ts.ejs`).

### File Generation

`src/utils/generator.ts` handles:
- Template resolution via `import.meta.url`
- Directory creation with `mkdir -p` semantics
- Skip behavior if file already exists
- Dry-run mode for previewing output

### Default Output Paths

- Components: `src/components`
- Pages: `src/pages`
- API routes: `src/pages/api`
