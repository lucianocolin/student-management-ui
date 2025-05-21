import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("should render the home page correctly", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Student Management");

    await expect(page.getByTestId("home-title")).toHaveText(
      "Student Management"
    );
    await expect(page.getByTestId("home-msg")).toHaveText(
      "Welcome to the administrative panel. From here you can manage students, courses, enrollments and grades efficiently and securely."
    );

    await expect(
      page.getByRole("button", { name: "Go to Control Panel" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "View Reports" })
    ).toBeVisible();
  });
});
