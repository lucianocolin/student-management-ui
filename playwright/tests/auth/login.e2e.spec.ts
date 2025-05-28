import { LOGIN_USER_SUCCESS } from "./../../../src/constants/auth/login-user-messages";
import test, { expect } from "@playwright/test";
import { loginUserResponse } from "../../fixture/auth/login-user-response";
import {
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
} from "../../../src/constants/auth/auth-schema-errors";
import { myUserResponse } from "../../fixture/user/my-user-response";

test.describe("Login Form", () => {
  test.beforeEach(async ({ page }) => {
    const loginButton = page.getByTestId("nav-login-btn");
    const loginUserModal = page.getByTestId("login-user-modal");

    await page.goto("/");

    await expect(loginButton).toBeVisible();
    await loginButton.click();
    await expect(loginUserModal).toBeVisible();
  });

  test("should login a user successfully", async ({ page, context }) => {
    const loginUserModal = page.getByTestId("login-user-modal");
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const loginButton = page.getByTestId("submit-login-btn");

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
    await loginButton.click();

    await expect(loginUserModal).not.toBeVisible();
    await expect(page.getByText(LOGIN_USER_SUCCESS)).toBeVisible();

    await expect(page.getByTestId("nav-grades-link")).toBeVisible();
    await expect(page.getByTestId("nav-logout-btn")).toBeVisible();

    await expect(
      page.getByRole("button", { name: "View Grades" })
    ).toBeVisible();
    await expect(
      page.getByRole("button", { name: "Enroll in Subjects" })
    ).toBeVisible();
  });

  test("should show error messages if inputs are empty", async ({ page }) => {
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const loginButton = page.getByTestId("submit-login-btn");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("");

    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await expect(page.getByText(EMAIL_REQUIRED)).toBeVisible();
    await expect(page.getByText(PASSWORD_REQUIRED)).toBeVisible();
  });

  test("should show error messages if inputs are invalid", async ({ page }) => {
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const loginButton = page.getByTestId("submit-login-btn");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("invalid-email");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123");

    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await expect(page.getByText(EMAIL_FORMAT)).toBeVisible();
    await expect(page.getByText(PASSWORD_FORMAT)).toBeVisible();
  });

  test("should show an error message if user is not registered", async ({
    page,
    context,
  }) => {
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const loginButton = page.getByTestId("submit-login-btn");

    await context.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "User with email 6tM0@example.com not found",
        }),
      });
    });

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await expect(
      page.getByText("User with email 6tM0@example.com not found")
    ).toBeVisible();
  });

  test("should show an error message if password is incorrect", async ({
    page,
    context,
  }) => {
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const loginButton = page.getByTestId("submit-login-btn");

    await context.route("**/api/auth/login", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "Invalid password",
        }),
      });
    });

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123???");

    await expect(loginButton).toBeVisible();
    await loginButton.click();

    await expect(page.getByText("Invalid password")).toBeVisible();
  });
});
