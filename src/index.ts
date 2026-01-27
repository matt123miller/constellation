#!/usr/bin/env node

import { Command } from "commander";
import { apiCommand } from "./commands/api.js";
import { componentCommand } from "./commands/component.js";
import { pageCommand } from "./commands/page.js";

const program = new Command();

program
  .name("constellation")
  .description(
    "CLI tool for generating Astro components, pages, and API routes",
  )
  .version("0.1.0");

program
  .command("component [name]")
  .alias("c")
  .description(
    "Generate an Astro component. Omitting the name triggers interactive mode.",
  )
  .option("-p, --path <path>", "Output directory (default: src/components)")
  .option("-s, --skip-test", "Skip generating test file")
  .option("-d, --dry-run", "Preview files without creating them")
  .action(componentCommand);

program
  .command("page [name]")
  .alias("p")
  .description(
    "Generate an Astro page. Omitting the name triggers interactive mode.",
  )
  .option("-p, --path <path>", "Output directory (default: src/pages)")
  .option("-s, --skip-test", "Skip generating test file")
  .option("-d, --dry-run", "Preview files without creating them")
  .action(pageCommand);

program
  .command("api [name]")
  .alias("a")
  .description(
    "Generate an API route. Omitting the name triggers interactive mode.",
  )
  .option("-p, --path <path>", "Output directory (default: src/pages/api)")
  .option("-s, --skip-test", "Skip generating test file")
  .option("-d, --dry-run", "Preview files without creating them")
  .action(apiCommand);

program.parse();
