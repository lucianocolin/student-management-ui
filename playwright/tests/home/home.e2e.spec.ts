import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("should render the home page correctly", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Student Management");

    await expect(page.getByTestId("home-title")).toHaveText("Welcome, Student");
    await expect(page.getByTestId("home-msg")).toHaveText(
      "Access your academic information easily. You can check your grades and enroll in subjects for the upcoming term."
    );
  });
});
