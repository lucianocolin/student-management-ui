import {
  EMAIL_FORMAT,
  EMAIL_REQUIRED,
  FULL_NAME_MAX,
  FULL_NAME_MIN,
  FULL_NAME_REQUIRED,
  PASSWORD_FORMAT,
  PASSWORD_REQUIRED,
  PHONE_NUMBER_MIN,
  PHONE_NUMBER_REQUIRED,
} from "./../../../src/constants/auth/register-user-schema-errors";
import { registerUserResponse } from "../../fixture/auth/register-user-response";
import {
  REGISTER_USER_ERROR,
  REGISTER_USER_SUCCESS,
} from "../../../src/constants/auth/register-user-messages";
import test, { expect } from "@playwright/test";

test.describe("Register Form", () => {
  test.beforeEach(async ({ page }) => {
    const signUpButton = page.getByTestId("nav-signup-btn");
    const registerUserModal = page.getByTestId("register-user-modal");

    await page.goto("/");

    await expect(signUpButton).toBeVisible();
    await signUpButton.click();
    await expect(registerUserModal).toBeVisible();
  });

  test("should register a user successfully", async ({ page, context }) => {
    const registerUserModal = page.getByTestId("register-user-modal");
    const fullNameInput = page.getByTestId("register-full-name-input");
    const emailInput = page.getByTestId("register-email-input");
    const passwordInput = page.getByTestId("register-password-input");
    const phoneNumberInput = page.getByTestId("register-phone-number-input");
    const registerButton = page.getByTestId("submit-register-btn");

    await context.route("**/api/auth/register", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(registerUserResponse),
      });
    });

    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill("John Doe");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(phoneNumberInput).toBeVisible();
    await phoneNumberInput.fill("1234567890");

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(registerUserModal).not.toBeVisible();
    await expect(page.getByText(REGISTER_USER_SUCCESS)).toBeVisible();
  });

  test("should show error messages if inputs are empty", async ({ page }) => {
    const fullNameInput = page.getByTestId("register-full-name-input");
    const emailInput = page.getByTestId("register-email-input");
    const passwordInput = page.getByTestId("register-password-input");
    const phoneNumberInput = page.getByTestId("register-phone-number-input");
    const registerButton = page.getByTestId("submit-register-btn");

    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill("");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("");

    await expect(phoneNumberInput).toBeVisible();
    await phoneNumberInput.fill("");

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(page.getByText(FULL_NAME_REQUIRED)).toBeVisible();
    await expect(page.getByText(EMAIL_REQUIRED)).toBeVisible();
    await expect(page.getByText(PASSWORD_REQUIRED)).toBeVisible();
    await expect(page.getByText(PHONE_NUMBER_REQUIRED)).toBeVisible();
  });

  test("should show error messages if inputs are invalid", async ({ page }) => {
    const fullNameInput = page.getByTestId("register-full-name-input");
    const emailInput = page.getByTestId("register-email-input");
    const passwordInput = page.getByTestId("register-password-input");
    const phoneNumberInput = page.getByTestId("register-phone-number-input");
    const registerButton = page.getByTestId("submit-register-btn");

    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill(
      "AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"
    );

    await expect(emailInput).toBeVisible();
    await emailInput.fill("invalid-email");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123");

    await expect(phoneNumberInput).toBeVisible();
    await phoneNumberInput.fill("1");

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(page.getByText(FULL_NAME_MAX)).toBeVisible();
    await expect(page.getByText(EMAIL_FORMAT)).toBeVisible();
    await expect(page.getByText(PASSWORD_FORMAT)).toBeVisible();
    await expect(page.getByText(PHONE_NUMBER_MIN)).toBeVisible();
  });

  test("should show an error message if full name is too short", async ({
    page,
  }) => {
    const fullNameInput = page.getByTestId("register-full-name-input");
    const emailInput = page.getByTestId("register-email-input");
    const passwordInput = page.getByTestId("register-password-input");
    const phoneNumberInput = page.getByTestId("register-phone-number-input");
    const registerButton = page.getByTestId("submit-register-btn");

    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill("J");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(phoneNumberInput).toBeVisible();
    await phoneNumberInput.fill("1234567890");

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(page.getByText(FULL_NAME_MIN)).toBeVisible();
  });

  test("should show an error message if user is already registered", async ({
    page,
    context,
  }) => {
    const fullNameInput = page.getByTestId("register-full-name-input");
    const emailInput = page.getByTestId("register-email-input");
    const passwordInput = page.getByTestId("register-password-input");
    const phoneNumberInput = page.getByTestId("register-phone-number-input");
    const registerButton = page.getByTestId("submit-register-btn");

    await context.route("**/api/auth/register", async (route) => {
      await route.fulfill({
        status: 400,
        contentType: "application/json",
        body: JSON.stringify({
          message: "User with email 6tM0V@example.com already exists",
        }),
      });
    });

    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill("John Doe");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(phoneNumberInput).toBeVisible();
    await phoneNumberInput.fill("1234567890");

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(
      page.getByText("User with email 6tM0V@example.com already exists")
    ).toBeVisible();
  });

  test("should show an error message if fails to register a user", async ({
    page,
    context,
  }) => {
    const fullNameInput = page.getByTestId("register-full-name-input");
    const emailInput = page.getByTestId("register-email-input");
    const passwordInput = page.getByTestId("register-password-input");
    const phoneNumberInput = page.getByTestId("register-phone-number-input");
    const registerButton = page.getByTestId("submit-register-btn");

    await context.route("**/api/auth/register", async (route) => {
      await route.fulfill({
        status: 500,
      });
    });

    await expect(fullNameInput).toBeVisible();
    await fullNameInput.fill("John Doe");

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(phoneNumberInput).toBeVisible();
    await phoneNumberInput.fill("1234567890");

    await expect(registerButton).toBeVisible();
    await registerButton.click();

    await expect(page.getByText(REGISTER_USER_ERROR)).toBeVisible();
  });
});
