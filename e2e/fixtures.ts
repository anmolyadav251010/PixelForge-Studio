import { chromium as playwrightChromium } from "@playwright/test";
import type { Browser } from "@playwright/test";
import chromium from "@sparticuz/chromium";
import { test as base } from "@playwright/test";

export const test = base.extend<{ browser: Browser }>({
  browser: async ({}, use) => {
    const browser = await playwrightChromium.launch({
      args: chromium.args,
      executablePath: await chromium.executablePath(),
      headless: true,
    });
    await use(browser);
    await browser.close();
  },
});

export { expect } from "@playwright/test";