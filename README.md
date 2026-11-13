# Constellation

A CLI tool for generating opinionated Astro components, pages, API routes, and actions.

## Setup

Clone this repository and link it globally:

```bash
git clone <repository-url>
cd constellation
npm install
npm run build
npm link
```

The `constellation` command will now be available globally on your machine.

## Commands

| Command | Alias | Description | Default Path |
|---------|-------|-------------|--------------|
| `constellation component [name]` | `c` | Generate an Astro component | `src/components` |
| `constellation page [name]` | `p` | Generate an Astro page | `src/pages` |
| `constellation api [name]` | `a` | Generate an API route | `src/pages/api` |
| `constellation action [name]` | omitted | Generate an Astro action | `src/actions` |

### Options

All commands support the following options:

- `-p, --path <path>` - Override the default output directory
- `-s, --skip-test` - Skip generating the test file
- `-d, --dry-run` - Preview files without creating them

## Usage Examples

### Fully qualified (non-interactive)

```bash
# Generate a component named Button
constellation component Button

# Generate a page with a custom path
constellation page checkout --path src/pages/store

# Generate an action without a test file
constellation action addToCart --skip-test

# Preview what would be generated
constellation api getProducts --dry-run
```

### Interactive mode

Omit the name argument to enter interactive mode:

```bash
constellation component
# ? Component name: Button
# ? Output path: src/components
# ? Include test file? Yes

constellation action
# ? Action name: addToCart
# ? Output path: src/actions
# ? Include test file? Yes
```

## TODO

Add the ability to provide provide different templates so this tool can be used across different projects with different needs.
  This could take the form of a config file or passing an extra argument for a template location.