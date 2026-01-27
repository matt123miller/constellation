import * as fs from 'node:fs';
import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
import ejs from 'ejs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const TEMPLATES_DIR = path.join(__dirname, '..', 'templates');

export interface GenerateOptions {
  name: string;
  pascalName: string;
  kebabName: string;
  camelName: string;
}

export interface GenerateResult {
  filePath: string;
  created: boolean;
}

/**
 * Renders an EJS template with the given data
 */
export async function renderTemplate(templateName: string, data: GenerateOptions): Promise<string> {
  const templatePath = path.join(TEMPLATES_DIR, templateName);
  const template = await fs.promises.readFile(templatePath, 'utf-8');
  return ejs.render(template, data);
}

/**
 * Writes content to a file, creating directories as needed
 */
export async function writeFile(filePath: string, content: string, dryRun: boolean): Promise<GenerateResult> {
  if (dryRun) {
    console.log(`[dry-run] Would create: ${filePath}`);
    return { filePath, created: false };
  }

  const dir = path.dirname(filePath);
  await fs.promises.mkdir(dir, { recursive: true });

  if (fs.existsSync(filePath)) {
    console.log(`File already exists, skipping: ${filePath}`);
    return { filePath, created: false };
  }

  await fs.promises.writeFile(filePath, content, 'utf-8');
  console.log(`Created: ${filePath}`);
  return { filePath, created: true };
}

/**
 * Generates files from templates
 */
export async function generateFiles(
  outputDir: string,
  templates: Array<{ template: string; outputFile: string }>,
  data: GenerateOptions,
  dryRun: boolean
): Promise<GenerateResult[]> {
  const results: GenerateResult[] = [];

  for (const { template, outputFile } of templates) {
    const content = await renderTemplate(template, data);
    const filePath = path.join(outputDir, outputFile);
    const result = await writeFile(filePath, content, dryRun);
    results.push(result);
  }

  return results;
}
