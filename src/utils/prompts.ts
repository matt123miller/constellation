import { confirm, input } from "@inquirer/prompts";

export interface ComponentPromptResult {
  name: string;
  path: string;
  includeTest: boolean;
}
type EntityType = "Component" | "Page" | "API route" | "Action";

export async function promptForComponent(
  defaultPath: string,
): Promise<ComponentPromptResult> {
  const name = await input({
    message: "Component name:",
    validate: (value) => validateInputNameMatchesPattern(value, "Component"),
  });

  const path = await input({
    message: "Output path:",
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: "Include test file?",
    default: true,
  });

  return { name, path, includeTest };
}

export async function promptForPage(
  defaultPath: string,
): Promise<ComponentPromptResult> {
  const name = await input({
    message: "Page name:",
    validate: (value) => validateInputNameMatchesPattern(value, "Page"),
  });

  const path = await input({
    message: "Output path:",
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: "Include test file?",
    default: true,
  });

  return { name, path, includeTest };
}

export async function promptForApi(
  defaultPath: string,
): Promise<ComponentPromptResult> {
  const name = await input({
    message: "API route name:",
    validate: (value) => validateInputNameMatchesPattern(value, "API route"),
  });

  const path = await input({
    message: "Output path:",
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: "Include test file?",
    default: true,
  });

  return { name, path, includeTest };
}

export async function promptForAction(
  defaultPath: string,
): Promise<ComponentPromptResult> {
  const name = await input({
    message: "Action name:",
    validate: (value) => validateInputNameMatchesPattern(value, "Action"),
  });

  const path = await input({
    message: "Output path:",
    default: defaultPath,
  });

  const includeTest = await confirm({
    message: "Include test file?",
    default: true,
  });

  return { name, path, includeTest };
}

function validateInputNameMatchesPattern(
  value: string,
  entityType: EntityType,
) {
  if (!value.trim()) {
    return `${entityType} name is required`;
  }
  if (!/^[a-zA-Z][a-zA-Z0-9-_]*$/.test(value)) {
    return `${entityType} name must start with a letter and contain only letters, numbers, hyphens, or underscores`;
  }
  return true;
}
