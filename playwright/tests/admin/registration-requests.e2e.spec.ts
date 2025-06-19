import {
  APPROVE_REGISTRATION_REQUEST_ERROR,
  APPROVE_REGISTRATION_REQUEST_SUCCESS,
} from "./../../../src/constants/auth/registration-request-messages";
import test, { expect } from "@playwright/test";
import { loginUserResponse } from "../../fixture/auth/login-user-response";
import { myUserAdminResponse } from "../../fixture/user/my-user-admin-response";
import { LOGIN_USER_SUCCESS } from "../../../src/constants/auth/login-user-messages";
import { notApprovedUsersResponse } from "../../fixture/user/not-approved-users-response";
import { approveUserResponse } from "../../fixture/user/approve-user-response";

test.describe("Registration Requests Page", () => {
  test.beforeEach(async ({ page, context }) => {
    const loginUserModal = page.getByTestId("login-user-modal");
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const submitLoginButton = page.getByTestId("submit-login-btn");
    const loginButton = page.getByTestId("nav-login-btn");
    const registrationRequestsLink = page.getByTestId(
      "nav-registration-requests-link"
    );

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
        body: JSON.stringify(myUserAdminResponse),
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

    await expect(registrationRequestsLink).toBeVisible();
    await registrationRequestsLink.click();
  });

  test("should show the registration requests page", async ({
    page,
    context,
  }) => {
    const registrationRequestsTitle = page.getByTestId(
      "registration-requests-title"
    );

    await context.route("**/api/auth/not-approved-users", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(notApprovedUsersResponse),
      });
    });

    await expect(registrationRequestsTitle).toBeVisible();
    await expect(registrationRequestsTitle).toHaveText("Registration Requests");

    await expect(page.getByTestId("registration-requests-table")).toBeVisible();

    await expect(page.getByTestId("row-0")).toBeVisible();
  });

  test("should approve a registration request", async ({ page, context }) => {
    let notApprovedUsersCallCount = 0;

    await context.route(
      "**/api/auth/approve/d3031e17-7ee4-41a6-83fc-88bfb530e65f",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(approveUserResponse),
        });
      }
    );

    await context.route("**/api/auth/not-approved-users", async (route) => {
      notApprovedUsersCallCount++;

      if (notApprovedUsersCallCount === 1) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(notApprovedUsersResponse),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([]),
        });
      }
    });

    const approveRegistrationRequestButton = page.getByTestId(
      "approve-registration-request-btn-0"
    );

    await expect(approveRegistrationRequestButton).toBeVisible();
    await approveRegistrationRequestButton.click();

    await expect(
      page.getByText(APPROVE_REGISTRATION_REQUEST_SUCCESS)
    ).toBeVisible();
    await expect(page.getByTestId("row-0")).not.toBeVisible();
  });

  test("should show an error message if the approval fails", async ({
    page,
    context,
  }) => {
    await context.route("**/api/auth/not-approved-users", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(notApprovedUsersResponse),
      });
    });

    await context.route(
      "**/api/auth/approve/d3031e17-7ee4-41a6-83fc-88bfb530e65f",
      async (route) => {
        await route.fulfill({
          status: 500,
        });
      }
    );

    const approveRegistrationRequestButton = page.getByTestId(
      "approve-registration-request-btn-0"
    );

    await expect(approveRegistrationRequestButton).toBeVisible();
    await approveRegistrationRequestButton.click();

    await expect(
      page.getByText(APPROVE_REGISTRATION_REQUEST_ERROR)
    ).toBeVisible();
  });
});
