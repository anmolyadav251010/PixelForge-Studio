import { spawnSync } from "node:child_process";

const scenarios = [
  "primary navigation",
  "mobile navigation",
  "portfolio category filters",
  "project details",
  "contact enquiry is validated",
  "contact submissions receive a user-visible validation error",
];

const playwrightCli = require.resolve("@playwright/test/cli");

for (const scenario of scenarios) {
  const result = spawnSync(process.execPath, [playwrightCli, "test", "--grep", scenario], { stdio: "inherit" });
  if (result.error) throw result.error;
  if (result.status !== 0) process.exit(result.status ?? 1);
}