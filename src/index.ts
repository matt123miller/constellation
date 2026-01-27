#!/usr/bin/env node

import { Command } from "commander";
import { apiCommand } from "./commands/api.js";

const program = new Command();

program
  .name("constellation")
  .description(
    "CLI tool for generating Astro components, pages, and API routes",
  )
  .version("0.1.0");

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
