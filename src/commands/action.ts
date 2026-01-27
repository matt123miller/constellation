import * as path from "node:path";
import { generateFiles, type GenerateOptions } from "../utils/generator.js";
import { toCamelCase, toKebabCase, toPascalCase } from "../utils/naming.js";
import { promptForAction } from "../utils/prompts.js";

export interface ActionCommandOptions {
  path?: string;
  skipTest?: boolean;
  dryRun?: boolean;
}

const DEFAULT_PATH = "src/actions";

export async function actionCommand(
  name: string | undefined,
  options: ActionCommandOptions,
): Promise<void> {
  let actionName: string;
  let outputPath: string;
  let includeTest: boolean;

  if (name) {
    // Non-interactive mode
    actionName = name;
    outputPath = options.path ?? DEFAULT_PATH;
    includeTest = !options.skipTest;
  } else {
    // Interactive mode
    const answers = await promptForAction(DEFAULT_PATH);
    actionName = answers.name;
    outputPath = answers.path;
    includeTest = answers.includeTest;
  }

  const pascalName = toPascalCase(actionName);
  const kebabName = toKebabCase(actionName);
  const camelName = toCamelCase(actionName);

  const data: GenerateOptions = {
    name: actionName,
    pascalName,
    kebabName,
    camelName,
  };

  // Actions use camelCase filenames to match the exported action name
  const templates = [
    { template: "action.ts.ejs", outputFile: `${camelName}.ts` },
  ];

  if (includeTest) {
    templates.push({
      template: "action.test.ts.ejs",
      outputFile: `${camelName}.test.ts`,
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
    console.log(`\nAction "${camelName}" generated successfully!`);
  }
}
