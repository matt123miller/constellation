export interface ApiCommandOptions {
  path?: string;
  skipTest?: boolean;
  dryRun?: boolean;
}

const DEFAULT_PATH = "src/pages/api";

export async function apiCommand(
  name: string | undefined,
  options: ApiCommandOptions,
): Promise<void> {}
