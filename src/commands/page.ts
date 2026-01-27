import * as path from 'node:path';
import { toPascalCase, toKebabCase, toCamelCase } from '../utils/naming.js';
import { generateFiles, type GenerateOptions } from '../utils/generator.js';
import { promptForPage } from '../utils/prompts.js';

export interface PageCommandOptions {
  path?: string;
  skipTest?: boolean;
  dryRun?: boolean;
}

const DEFAULT_PATH = 'src/pages';

export async function pageCommand(
  name: string | undefined,
  options: PageCommandOptions
): Promise<void> {
  let pageName: string;
  let outputPath: string;
  let includeTest: boolean;

  if (name) {
    // Non-interactive mode
    pageName = name;
    outputPath = options.path ?? DEFAULT_PATH;
    includeTest = !options.skipTest;
  } else {
    // Interactive mode
    const answers = await promptForPage(DEFAULT_PATH);
    pageName = answers.name;
    outputPath = answers.path;
    includeTest = answers.includeTest;
  }

  const pascalName = toPascalCase(pageName);
  const kebabName = toKebabCase(pageName);
  const camelName = toCamelCase(pageName);

  const data: GenerateOptions = {
    name: pageName,
    pascalName,
    kebabName,
    camelName,
  };

  // Pages use kebab-case filenames for URL routing
  const templates = [
    { template: 'page.astro.ejs', outputFile: `${kebabName}.astro` },
  ];

  if (includeTest) {
    templates.push({
      template: 'page.test.ts.ejs',
      outputFile: `${kebabName}.test.ts`,
    });
  }

  const outputDir = path.resolve(process.cwd(), outputPath);
  const results = await generateFiles(outputDir, templates, data, options.dryRun ?? false);

  const createdCount = results.filter((r) => r.created).length;
  if (!options.dryRun && createdCount > 0) {
    console.log(`\nPage "${kebabName}" generated successfully!`);
  }
}
