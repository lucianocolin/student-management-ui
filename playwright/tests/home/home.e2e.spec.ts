import { test, expect } from "@playwright/test";

test.describe("Home", () => {
  test("should render the home page correctly", async ({ page }) => {
    await page.goto("/");

    await expect(page).toHaveTitle("Student Management");

    await expect(page.getByTestId("home-title")).toHaveText("Welcome, Student");
    await expect(page.getByTestId("home-msg")).toHaveText(
      "Access your academic information easily. Here you can review your grades, track your tariff payments, and stay informed about your academic progress."
    );

    await expect(
      page.getByRole("button", { name: "View Grades" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Tariff Status" })
    ).toBeVisible();
  });
});
