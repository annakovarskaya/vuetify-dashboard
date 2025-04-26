import { users } from "./../../src/fixtures/app_fixture";
describe("Login", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("should show error alert for wrong credentials", () => {
    cy.get('[data-cy="error-dialog"]').should("not.exist");
    cy.get('[data-cy="user-input"]')
      .should("exist")
      .should("be.visible")
      .type("Anna");
    cy.get('[data-cy="password-input"]')
      .should("exist")
      .should("be.visible")
      .type("password123");
    cy.get('[data-cy="login-button"]')
      .should("exist")
      .should("be.visible")
      .click();
    cy.get('[data-cy="error-dialog"]').should("exist");
    cy.get('[data-cy="error-dialog-close-button"]').click();
    cy.get('[data-cy="error-dialog"]').should("not.exist");
  });
  it("should login with right credentials", () => {
    cy.get('[data-cy="user-input"]').should("exist").type(users[0].name);
    cy.get('[data-cy="password-input"]')
      .should("exist")
      .type(users[0].password);
    cy.get('[data-cy="login-button"]').should("exist").click();
  });
});
