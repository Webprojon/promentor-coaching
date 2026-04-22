import { test, expect, type Page } from "@playwright/test";

async function mockGuestSession(page: Page) {
  await page.route("**/auth/me", (route) =>
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: "{}",
    }),
  );
}

test.beforeEach(async ({ page }) => {
  await mockGuestSession(page);
});

test("home redirects to Teams and shows the Teams page", async ({ page }) => {
  await page.goto("/");
  await expect(page).toHaveURL(/\/teams$/);
  await expect(
    page.getByRole("heading", { name: "Teams", exact: true }),
  ).toBeVisible();
});

test("requests root redirects to sent; Received updates URL", async ({
  page,
}) => {
  await page.goto("/requests");
  await expect(page).toHaveURL(/\/requests\/sent$/);
  await expect(
    page.getByRole("heading", { name: "Requests", exact: true }),
  ).toBeVisible();
  await page.getByRole("link", { name: "Received" }).click();
  await expect(page).toHaveURL(/\/requests\/received$/);
  await expect(
    page.getByRole("heading", { name: "Requests", exact: true }),
  ).toBeVisible();
});
