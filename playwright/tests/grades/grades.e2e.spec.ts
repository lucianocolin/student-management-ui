import test, { expect } from "@playwright/test";
import { loginUserResponse } from "../../fixture/auth/login-user-response";
import { LOGIN_USER_SUCCESS } from "../../../src/constants/auth/login-user-messages";
import { myUserResponse } from "../../fixture/user/my-user-response";
import { studentResponse } from "../../fixture/student/student-response";

test.describe("Grades Page", () => {
  test.beforeEach(async ({ page, context }) => {
    const loginUserModal = page.getByTestId("login-user-modal");
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const submitLoginButton = page.getByTestId("submit-login-btn");
    const loginButton = page.getByTestId("nav-login-btn");
    const gradesPageButton = page.getByTestId("nav-grades-link");

    await page.goto("/");

    await expect(loginButton).toBeVisible();
    await loginButton.click();
    await expect(loginUserModal).toBeVisible();

    await context.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(loginUserResponse),
      });
    });

    await context.route("**/api/auth/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(myUserResponse),
      });
    });

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(loginButton).toBeVisible();
    await submitLoginButton.click();

    await expect(loginUserModal).not.toBeVisible();
    await expect(page.getByText(LOGIN_USER_SUCCESS)).toBeVisible();

    await expect(gradesPageButton).toBeVisible();
    await gradesPageButton.click();
  });

  test("should render the grades page correctly", async ({ page, context }) => {
    const gradesTitle = page.getByTestId("grades-title");

    await context.route("**/api/auth/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(myUserResponse),
      });
    });

    await context.route(
      "**/api/student/c325d451-258f-480d-b0d9-7a09ff1556de",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(studentResponse),
        });
      }
    );

    await expect(gradesTitle).toBeVisible();
    await expect(gradesTitle).toHaveText("Grades: Test User");
  });
});
