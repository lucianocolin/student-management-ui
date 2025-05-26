import {
  CREATE_STUDENT_ERROR,
  CREATE_STUDENT_SUCCESS,
} from "./../../../src/constants/student/student-messages";
import test, { expect } from "@playwright/test";
import { myUserWithoutStudentResponse } from "../../fixture/user/my-user-without-student-response";
import { studentResponse } from "../../fixture/student/student-response";
import { careersResponse } from "../../fixture/career/careers-response";
import { LOGIN_USER_SUCCESS } from "../../../src/constants/auth/login-user-messages";
import { loginUserResponse } from "../../fixture/auth/login-user-response";
import { myUserResponse } from "../../fixture/user/my-user-response";

test.describe("Student Page", () => {
  test.beforeEach(async ({ page, context }) => {
    const loginUserModal = page.getByTestId("login-user-modal");
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const submitLoginButton = page.getByTestId("submit-login-btn");
    const loginButton = page.getByTestId("nav-login-btn");

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

    await expect(emailInput).toBeVisible();
    await emailInput.fill("6tM0V@example.com");

    await expect(passwordInput).toBeVisible();
    await passwordInput.fill("Password123?");

    await expect(loginButton).toBeVisible();
    await submitLoginButton.click();

    await expect(loginUserModal).not.toBeVisible();
    await expect(page.getByText(LOGIN_USER_SUCCESS)).toBeVisible();
  });

  test("should create a new student", async ({ page, context }) => {
    const createStudentButton = page.getByTestId("nav-create-student-btn");
    const careerSelectInput = page.getByTestId("career-select");
    const submitCreateStudentButton = page.getByTestId(
      "submit-create-student-btn"
    );
    let authCallCount = 0;

    await context.route("**/api/auth/me", async (route) => {
      authCallCount++;

      if (authCallCount === 1) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(myUserWithoutStudentResponse),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(myUserResponse),
        });
      }
    });

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 201,
        contentType: "application/json",
        body: JSON.stringify(studentResponse),
      });
    });

    await context.route("**/api/career", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(careersResponse),
      });
    });

    await page.goto("/");

    await expect(createStudentButton).toBeVisible();
    await createStudentButton.click();

    await expect(page.getByTestId("create-student-modal")).toBeVisible();
    await expect(careerSelectInput).toBeVisible();
    await careerSelectInput.selectOption({ label: "Computer Science" });

    await expect(submitCreateStudentButton).toBeVisible();
    await submitCreateStudentButton.click();

    await expect(page.getByTestId("create-student-modal")).not.toBeVisible();
    await expect(page.getByText(CREATE_STUDENT_SUCCESS)).toBeVisible();

    await expect(page.getByTestId("nav-grades-link")).toBeVisible();
  });

  test("should show an error message if career is not selected", async ({
    page,
    context,
  }) => {
    const createStudentButton = page.getByTestId("nav-create-student-btn");
    const submitCreateStudentButton = page.getByTestId(
      "submit-create-student-btn"
    );

    await context.route("**/api/auth/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(myUserWithoutStudentResponse),
      });
    });

    await context.route("**/api/career", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(careersResponse),
      });
    });

    await page.goto("/");

    await expect(createStudentButton).toBeVisible();
    await createStudentButton.click();

    await expect(page.getByTestId("create-student-modal")).toBeVisible();
    await expect(submitCreateStudentButton).toBeVisible();
    await submitCreateStudentButton.click();

    await expect(page.getByTestId("career-error")).toBeVisible();
  });

  test("should show an error message if student creation fails", async ({
    page,
    context,
  }) => {
    const createStudentButton = page.getByTestId("nav-create-student-btn");
    const careerSelectInput = page.getByTestId("career-select");
    const submitCreateStudentButton = page.getByTestId(
      "submit-create-student-btn"
    );

    await context.route("**/api/auth/me", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(myUserWithoutStudentResponse),
      });
    });

    await context.route("**/api/career", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(careersResponse),
      });
    });

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 500,
      });
    });

    await page.goto("/");

    await expect(createStudentButton).toBeVisible();
    await createStudentButton.click();

    await expect(page.getByTestId("create-student-modal")).toBeVisible();
    await expect(careerSelectInput).toBeVisible();
    await careerSelectInput.selectOption({ label: "Computer Science" });

    await expect(submitCreateStudentButton).toBeVisible();
    await submitCreateStudentButton.click();

    await expect(page.getByText(CREATE_STUDENT_ERROR)).toBeVisible();
  });
});
