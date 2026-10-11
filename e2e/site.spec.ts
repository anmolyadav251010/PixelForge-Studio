import { expect, test } from "./fixtures";
import { randomUUID } from "node:crypto";

test("primary navigation reaches services and selected work", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Services" }).first().click();
  await expect(page).toHaveURL(/\/services$/);
  await expect(page.getByRole("heading", { name: "Web development" }).first()).toBeVisible();
  await page.getByRole("link", { name: "Selected work" }).click();
  await expect(page).toHaveURL(/\/portfolio$/);
  await expect(page.getByRole("heading", { name: "Form & Field" })).toBeVisible();
});

test("mobile navigation opens and follows a selected page", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: "Open navigation menu" });
  await expect(menu).toBeVisible();
  await menu.click();
  await expect(page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" })).toBeVisible();
  await page.getByRole("navigation", { name: "Main navigation" }).getByRole("link", { name: "About" }).click();
  await expect(page).toHaveURL(/\/about$/);
  await expect(page.getByRole("heading", { name: /Small by intention/ })).toBeVisible();
});

test("portfolio category filters update the visible fictional projects", async ({ page }) => {
  await page.goto("/portfolio");
  await expect(page.locator(".portfolio-grid .project-card")).toHaveCount(6);
  await page.getByRole("button", { name: /Digital product/ }).click();
  await expect(page.locator(".portfolio-grid .project-card")).toHaveCount(2);
  await expect(page.getByRole("heading", { name: "Openwater" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Common Ground" })).toBeVisible();
  await page.getByRole("button", { name: /All work/ }).click();
  await expect(page.locator(".portfolio-grid .project-card")).toHaveCount(6);
});

test("project details show the fictional brief, approach, features, and stack", async ({ page }) => {
  await page.goto("/portfolio/form-and-field");
  await expect(page.getByText("Fictional concept project")).toBeVisible();
  await expect(page.getByRole("heading", { name: "The brief" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Our approach" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "What we explored" })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Built with" })).toBeVisible();
});

test("contact enquiry is validated and saved to the configured database", async ({ page }) => {
  const visitorName = `Playwright visitor ${randomUUID()}`;
  const unauthenticated = await page.request.get("/api/admin/enquiries");
  expect(unauthenticated.status()).toBe(401);
  await page.goto("/contact");
  await page.getByLabel("Your name").fill(visitorName);
  await page.getByLabel("Email address").fill("visitor@example.com");
  await page.getByLabel("What can we help with?").selectOption({ label: "Web development" });
  await page.getByLabel("A little about the project").fill("I would love to discuss building a thoughtful new website for my independent studio.");
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await expect(page.getByRole("status")).toContainText("Your note is with us.");
  await page.goto("/admin");
  await page.getByLabel("Administrator password").fill("playwright-test-password");
  await page.getByRole("button", { name: "Sign in" }).click();
  await expect(page.getByRole("heading", { name: "Your enquiries" })).toBeVisible();
  await expect(page.getByRole("heading", { name: visitorName, exact: true })).toBeVisible();
});

test("contact submissions receive a user-visible validation error", async ({ page }) => {
  await page.goto("/contact");
  await page.getByLabel("Your name").fill("M");
  await page.getByLabel("Email address").fill("not-an-email");
  await page.getByLabel("What can we help with?").selectOption({ label: "Web development" });
  await page.getByLabel("A little about the project").fill("This is a sufficiently long message to pass browser-side validation.");
  await page.getByRole("button", { name: "Send your enquiry" }).click();
  await expect(page.getByLabel("Your name")).toHaveAttribute("minlength", "2");
  await expect(page.locator("input[name=email]:invalid")).toHaveCount(1);
});