import * as path from "node:path";
import { generateFiles, type GenerateOptions } from "../utils/generator.js";
import { toCamelCase, toKebabCase, toPascalCase } from "../utils/naming.js";
import { promptForApi } from "../utils/prompts.js";

export interface ApiCommandOptions {
  path?: string;
  skipTest?: boolean;
  dryRun?: boolean;
}

const DEFAULT_PATH = "src/pages/api";

export async function apiCommand(
  name: string | undefined,
  options: ApiCommandOptions,
): Promise<void> {
  let apiName: string;
  let outputPath: string;
  let includeTest: boolean;

  if (name) {
    // Non-interactive mode
    apiName = name;
    outputPath = options.path ?? DEFAULT_PATH;
    includeTest = !options.skipTest;
  } else {
    // Interactive mode
    const answers = await promptForApi(DEFAULT_PATH);
    apiName = answers.name;
    outputPath = answers.path;
    includeTest = answers.includeTest;
  }

  const pascalName = toPascalCase(apiName);
  const kebabName = toKebabCase(apiName);
  const camelName = toCamelCase(apiName);

  const data: GenerateOptions = {
    name: apiName,
    pascalName,
    kebabName,
    camelName,
  };

  // API routes use kebab-case filenames for URL routing
  const templates = [{ template: "api.ts.ejs", outputFile: `${kebabName}.ts` }];

  if (includeTest) {
    templates.push({
      template: "api.test.ts.ejs",
      outputFile: `${kebabName}.test.ts`,
    });
  }

  const outputDir = path.resolve(process.cwd(), outputPath);
  const results = await generateFiles(
    outputDir,
    templates,
    data,
    options.dryRun ?? false,
  );

  const createdCount = results.filter((r) => r.created).length;
  if (!options.dryRun && createdCount > 0) {
    console.log(`\nAPI route "${kebabName}" generated successfully!`);
  }
}
