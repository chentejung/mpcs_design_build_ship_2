import { defineConfig, devices } from "@playwright/test";

// Browser tests drive the built static site that references/serve.sh serves on port 8000.
// Run `bash references/serve.sh` first, then `npm test`.
export default defineConfig({
  testDir: "tests",
  use: { baseURL: process.env.BASE_URL ?? "http://localhost:8000", trace: "retain-on-failure" },
  projects: [
    { name: "desktop", use: { ...devices["Desktop Firefox"] } },
    { name: "phone", use: { browserName: "firefox", viewport: { width: 390, height: 844 } } },
  ],
});
