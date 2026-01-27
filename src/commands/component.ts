import * as path from 'node:path';
import { toPascalCase, toKebabCase, toCamelCase } from '../utils/naming.js';
import { generateFiles, type GenerateOptions } from '../utils/generator.js';
import { promptForComponent } from '../utils/prompts.js';

export interface ComponentCommandOptions {
  path?: string;
  skipTest?: boolean;
  dryRun?: boolean;
}

const DEFAULT_PATH = 'src/components';

export async function componentCommand(
  name: string | undefined,
  options: ComponentCommandOptions
): Promise<void> {
  let componentName: string;
  let outputPath: string;
  let includeTest: boolean;

  if (name) {
    // Non-interactive mode
    componentName = name;
    outputPath = options.path ?? DEFAULT_PATH;
    includeTest = !options.skipTest;
  } else {
    // Interactive mode
    const answers = await promptForComponent(DEFAULT_PATH);
    componentName = answers.name;
    outputPath = answers.path;
    includeTest = answers.includeTest;
  }

  const pascalName = toPascalCase(componentName);
  const kebabName = toKebabCase(componentName);
  const camelName = toCamelCase(componentName);

  const data: GenerateOptions = {
    name: componentName,
    pascalName,
    kebabName,
    camelName,
  };

  const templates = [
    { template: 'component.astro.ejs', outputFile: `${pascalName}.astro` },
  ];

  if (includeTest) {
    templates.push({
      template: 'component.test.ts.ejs',
      outputFile: `${pascalName}.test.ts`,
    });
  }

  const outputDir = path.resolve(process.cwd(), outputPath);
  const results = await generateFiles(outputDir, templates, data, options.dryRun ?? false);

  const createdCount = results.filter((r) => r.created).length;
  if (!options.dryRun && createdCount > 0) {
    console.log(`\nComponent "${pascalName}" generated successfully!`);
  }
}
