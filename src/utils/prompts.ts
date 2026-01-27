import { input, confirm } from '@inquirer/prompts';

export interface ComponentPromptResult {
  name: string;
  path: string;
  includeTest: boolean;
}

export async function promptForComponent(defaultPath: string): Promise<ComponentPromptResult> {
  const name = await input({
    message: 'Component name:',
    validate: (value) => {
      if (!value.trim()) return 'Component name is required';
      if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value)) {
        return 'Component name must start with a letter and contain only letters, numbers, hyphens, or underscores';
      }
      return true;
    },
  });

  const path = await input({
    message: 'Output path:',
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: 'Include test file?',
    default: true,
  });

  return { name, path, includeTest };
}

export async function promptForPage(defaultPath: string): Promise<ComponentPromptResult> {
  const name = await input({
    message: 'Page name:',
    validate: (value) => {
      if (!value.trim()) return 'Page name is required';
      if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value)) {
        return 'Page name must start with a letter and contain only letters, numbers, hyphens, or underscores';
      }
      return true;
    },
  });

  const path = await input({
    message: 'Output path:',
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: 'Include test file?',
    default: true,
  });

  return { name, path, includeTest };
}

export async function promptForApi(defaultPath: string): Promise<ComponentPromptResult> {
  const name = await input({
    message: 'API route name:',
    validate: (value) => {
      if (!value.trim()) return 'API route name is required';
      if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value)) {
        return 'API route name must start with a letter and contain only letters, numbers, hyphens, or underscores';
      }
      return true;
    },
  });

  const path = await input({
    message: 'Output path:',
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: 'Include test file?',
    default: true,
  });

  return { name, path, includeTest };
}
