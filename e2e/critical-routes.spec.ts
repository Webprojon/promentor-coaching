import { test, expect, type Page } from "@playwright/test";

// These tests share a single Vite dev server; parallel navigations can race the
// first auth hydrate + lazy route chunk, leaving "/" without a redirect briefly.
test.describe.configure({ mode: "serial" });

async function mockGuestSession(page: Page) {
  await page.route("**/auth/me", (route) =>
    route.fulfill({
      status: 401,
      contentType: "application/json",
      body: "{}",
    }),
  );
}

async function mockMentorSession(page: Page) {
  await page.route("**/auth/me", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: JSON.stringify({
        id: "mentor-e2e",
        email: "mentor-e2e@example.com",
        fullName: "E2E Mentor",
        role: "MENTOR",
      }),
    }),
  );
}

async function mockEmptyParallelReceivedLists(page: Page) {
  await page.route("**/team-join-requests/received", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "[]",
    }),
  );
  await page.route("**/user-suggestions/received", (route) =>
    route.fulfill({
      status: 200,
      contentType: "application/json",
      body: "[]",
    }),
  );
}

test.describe("guest routing smoke", () => {
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
});

test.describe("mentor requests flows", () => {
  test.beforeEach(async ({ page }) => {
    await mockMentorSession(page);
  });

  test("sent broadcast: confirm cancel calls DELETE and closes dialog", async ({
    page,
  }) => {
    const broadcastId = "broadcast-e2e-1";
    const now = new Date().toISOString();
    const item = {
      id: broadcastId,
      scope: "INTERN" as const,
      teamId: null,
      menteeId: null,
      targetLabel: "All interns",
      contextLine: "Async updates",
      body: "Please adopt a short weekly summary.",
      status: "DELIVERED" as const,
      createdAt: now,
      updatedAt: now,
    };

    await mockEmptyParallelReceivedLists(page);
    await page.route("**/mentor-broadcast-requests/sent", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([item]),
      }),
    );

    let deleteCalled = false;
    await page.route(`**/mentor-broadcast-requests/${broadcastId}`, (route) => {
      if (route.request().method() === "DELETE") {
        deleteCalled = true;
        return route.fulfill({ status: 204, body: "" });
      }
      return route.continue();
    });

    await page.goto("/requests/sent");
    await expect(
      page.getByRole("heading", { name: "Requests", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: /All interns/ }),
    ).toBeVisible();

    await page.getByRole("button", { name: "Cancel request" }).click();
    const confirmDialog = page.getByRole("dialog", {
      name: "Cancel this request?",
    });
    await expect(confirmDialog).toBeVisible();
    await confirmDialog.getByRole("button", { name: "Cancel request" }).click();

    await expect(confirmDialog).not.toBeVisible();
    expect(deleteCalled).toBe(true);
  });

  test("received mentorship: accept issues PATCH and closes detail modal", async ({
    page,
  }) => {
    const requestId = "mentorship-e2e-1";
    const now = new Date().toISOString();
    const inboxItem = {
      id: requestId,
      mentorId: "mentor-e2e",
      menteeId: "mentee-e2e",
      menteeName: "Alex Intern",
      menteeAvatarUrl: null,
      message: "I'd like a regular critique cadence.",
      status: "PENDING" as const,
      createdAt: now,
      updatedAt: now,
    };

    await mockEmptyParallelReceivedLists(page);
    await page.route("**/mentorship-requests/received", (route) =>
      route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([inboxItem]),
      }),
    );

    let patchPayload: string | null = null;
    await page.route(`**/mentorship-requests/${requestId}`, (route) => {
      if (route.request().method() === "PATCH") {
        patchPayload = route.request().postData() ?? null;
        return route.fulfill({
          status: 200,
          contentType: "application/json",
          body: "{}",
        });
      }
      return route.continue();
    });

    await page.goto("/requests/received");
    await expect(
      page.getByRole("heading", { name: "Requests", exact: true }),
    ).toBeVisible();
    await expect(
      page.getByRole("heading", { name: "Mentorship · Alex Intern" }),
    ).toBeVisible();

    await page.getByRole("button", { name: "View full request" }).click();
    const detail = page.getByRole("dialog", {
      name: "Mentorship · Alex Intern",
    });
    await expect(detail).toBeVisible();
    await detail.getByRole("button", { name: "Accept" }).click();
    await expect(detail).not.toBeVisible();

    expect(patchPayload).toContain('"action":"accept"');
  });
});
