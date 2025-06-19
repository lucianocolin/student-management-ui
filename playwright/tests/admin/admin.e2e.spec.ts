import {
  ASSIGN_GRADE_ERROR,
  ASSIGN_GRADE_SUCCESS,
} from "./../../../src/constants/enrollment/enrollment-messages";
import test, { expect } from "@playwright/test";
import { LOGIN_USER_SUCCESS } from "../../../src/constants/auth/login-user-messages";
import { myUserAdminResponse } from "../../fixture/user/my-user-admin-response";
import { loginUserResponse } from "../../fixture/auth/login-user-response";
import { studentsResponse } from "../../fixture/student/students-response";
import { studentResponse } from "../../fixture/student/student-response";
import {
  DELETE_STUDENT_ERROR,
  DELETE_STUDENT_SUCCESS,
} from "../../../src/constants/student/student-messages";
import { enrollmentsResponse } from "../../fixture/enrollment/enrollmentsResponse";
import { enrollmentUpdatedResponse } from "../../fixture/enrollment/enrollmentUpdatedResponse";

test.describe("Admin Page", () => {
  test.beforeEach(async ({ page, context }) => {
    const loginUserModal = page.getByTestId("login-user-modal");
    const emailInput = page.getByTestId("login-email-input");
    const passwordInput = page.getByTestId("login-password-input");
    const submitLoginButton = page.getByTestId("submit-login-btn");
    const loginButton = page.getByTestId("nav-login-btn");
    const adminLink = page.getByTestId("nav-admin-link");

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

    await expect(adminLink).toBeVisible();
    await adminLink.click();
  });

  test("should show the admin page", async ({ page, context }) => {
    const adminTitle = page.getByTestId("admin-title");

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(studentsResponse),
      });
    });

    await expect(adminTitle).toBeVisible();
    await expect(adminTitle).toHaveText("Admin Panel - Students");

    await expect(page.getByTestId("admin-search-input")).toBeVisible();
    await expect(page.getByTestId("students-table")).toBeVisible();

    await expect(page.getByTestId("row-0")).toBeVisible();
    await expect(page.getByTestId("row-1")).toBeVisible();
  });

  test("should search for a student", async ({ page, context }) => {
    const searchInput = page.getByTestId("admin-search-input");

    await context.route("**/api/student?search=Test%20User", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([studentResponse]),
      });
    });

    await searchInput.fill("Test User");
    await expect(page.getByTestId("row-0")).toBeVisible();
    await expect(page.getByTestId("cell-0_fullName")).toHaveText("Test User");
  });

  test("should be able to delete a student", async ({ page, context }) => {
    const deleteButton = page.getByTestId("delete-student-btn-1");
    let studentCallCount = 0;

    await context.route("**/api/student", async (route) => {
      studentCallCount++;

      if (studentCallCount === 1) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(studentsResponse),
        });
      } else {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify([studentResponse]),
        });
      }
    });

    await context.route(
      "**/api/student/c325d451-258f-480d-b0d9-7a09ff1556df",
      async (route) => {
        await route.fulfill({
          status: 204,
        });
      }
    );

    await expect(page.getByTestId("row-0")).toBeVisible();
    await expect(page.getByTestId("row-1")).toBeVisible();

    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    await expect(page.getByText(DELETE_STUDENT_SUCCESS)).toBeVisible();
    await expect(page.getByTestId("row-0")).toBeVisible();
    await expect(page.getByTestId("row-1")).not.toBeVisible();
  });

  test("should show an error message if there is an error deleting a student", async ({
    page,
    context,
  }) => {
    const deleteButton = page.getByTestId("delete-student-btn-1");

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(studentsResponse),
      });
    });

    await context.route(
      "**/api/student/c325d451-258f-480d-b0d9-7a09ff1556df",
      async (route) => {
        await route.fulfill({
          status: 500,
        });
      }
    );

    await expect(page.getByTestId("row-0")).toBeVisible();
    await expect(page.getByTestId("row-1")).toBeVisible();

    await expect(deleteButton).toBeVisible();
    await deleteButton.click();

    await expect(page.getByText(DELETE_STUDENT_ERROR)).toBeVisible();
  });

  test("should be able to assign grades to a student", async ({
    page,
    context,
  }) => {
    const addGradeButton = page.getByTestId("add-grade-btn-0");
    const assignGradesTitle = page.getByTestId("assign-grades-title");
    const assignGradesSubject = page.getByTestId("subject-name");
    const assignGradeInput = page.getByTestId("grade-input");
    const assignGradeButton = page.getByTestId("assign-grade-btn");

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(studentsResponse),
      });
    });

    await context.route("**/api/enrollment?studentId=", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(enrollmentsResponse),
      });
    });

    await context.route(
      "**/api/enrollment/c325d451-258f-480d-b0d9-7a09ff1556dd",
      async (route) => {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify(enrollmentUpdatedResponse),
        });
      }
    );

    await expect(addGradeButton).toBeVisible();
    await addGradeButton.click();

    await expect(page.getByTestId("assign-grades-modal")).toBeVisible();
    await expect(assignGradesTitle).toBeVisible();
    await expect(assignGradesTitle).toHaveText("Assign Grades");

    await expect(assignGradesSubject).toHaveCount(3);

    await expect(assignGradeInput).toHaveCount(3);

    await assignGradeInput.first().fill("7");
    await assignGradeButton.first().click();

    await expect(page.getByText(ASSIGN_GRADE_SUCCESS)).toBeVisible();
  });

  test("should render a no enrollments message if a student has no enrollments", async ({
    page,
    context,
  }) => {
    const addGradeButton = page.getByTestId("add-grade-btn-0");
    const assignGradesTitle = page.getByTestId("assign-grades-title");
    const noEnrollmentMessage = page.getByTestId("no-enrollments-message");

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(studentsResponse),
      });
    });

    await context.route("**/api/enrollment?studentId=", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify([]),
      });
    });

    await expect(addGradeButton).toBeVisible();
    await addGradeButton.click();

    await expect(page.getByTestId("assign-grades-modal")).toBeVisible();
    await expect(assignGradesTitle).toBeVisible();
    await expect(assignGradesTitle).toHaveText("Assign Grades");

    await expect(noEnrollmentMessage).toBeVisible();
    await expect(noEnrollmentMessage).toHaveText(
      "This student hasn't enrolled in any subjects"
    );
  });

  test("should show an error message if there is an error assigning a grade", async ({
    page,
    context,
  }) => {
    const addGradeButton = page.getByTestId("add-grade-btn-0");
    const assignGradesTitle = page.getByTestId("assign-grades-title");
    const assignGradesSubject = page.getByTestId("subject-name");
    const assignGradeInput = page.getByTestId("grade-input");
    const assignGradeButton = page.getByTestId("assign-grade-btn");

    await context.route("**/api/student", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(studentsResponse),
      });
    });

    await context.route("**/api/enrollment?studentId=", async (route) => {
      await route.fulfill({
        status: 200,
        contentType: "application/json",
        body: JSON.stringify(enrollmentsResponse),
      });
    });

    await context.route(
      "**/api/enrollment/c325d451-258f-480d-b0d9-7a09ff1556dd",
      async (route) => {
        await route.fulfill({
          status: 500,
        });
      }
    );

    await expect(addGradeButton).toBeVisible();
    await addGradeButton.click();

    await expect(page.getByTestId("assign-grades-modal")).toBeVisible();
    await expect(assignGradesTitle).toBeVisible();
    await expect(assignGradesTitle).toHaveText("Assign Grades");

    await expect(assignGradesSubject).toHaveCount(3);

    await expect(assignGradeInput).toHaveCount(3);

    await assignGradeInput.first().fill("7");
    await assignGradeButton.first().click();

    await expect(page.getByText(ASSIGN_GRADE_ERROR)).toBeVisible();
  });
});
