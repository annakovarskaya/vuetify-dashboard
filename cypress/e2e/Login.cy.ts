import { users } from "./../../src/fixtures/app_fixture";
describe("Login", () => {
  it("should show error alert for wrong credentials", () => {
    cy.goToLoginPage().login("Anna", "password123");
    testErrorDialog();
  });
  it("should login with right credentials", () => {
    cy.goToLoginPage().login(users[0].name, users[0].password);
    cy.get('[data-cy="error-dialog"]').should("not.exist");
  });
  it("should check that name is case sensitive", () => {
    cy.goToLoginPage().login(convertString(users[0].name), users[0].password);
    testErrorDialog();
  });
  it("should check that password is case sensitive", () => {
    cy.goToLoginPage().login(users[0].name, convertString(users[0].password));
    testErrorDialog();
  });
  it("should check that password switches from hidden to visible and back", () => {
    cy.goToLoginPage();
    checkPasswordIsHidden();
    // Grabbing element in Cypress by its CSS selector ia a bad practice in general, but we have no choice is that particular case
    // eye button is inner vuetify element so we can't assign it data-cy attribute
    cy.get(".v-field__append-inner").click();
    checkPasswordIsVisible();
    cy.get(".v-field__append-inner").click();
    checkPasswordIsHidden();
  });
});

const testErrorDialog = (): void => {
  cy.get('[data-cy="error-dialog"]').should("be.visible");
  cy.get('[data-cy="error-dialog-close-button"]').should("be.visible").click();
  cy.get('[data-cy="error-dialog"]').should("not.exist");
};

const convertString = (text: string) =>
  [...text]
    .map((char) =>
      char === char.toUpperCase() ? char.toLowerCase() : char.toUpperCase(),
    )
    .join("");

const checkPasswordIsHidden = () => {
  cy.get('[data-cy="password-input"][data-cy-type="password"]').should(
    "be.visible",
  );
  cy.get('[data-cy="password-input"][data-cy-type="text"]').should("not.exist");
};

const checkPasswordIsVisible = () => {
  cy.get('[data-cy="password-input"][data-cy-type="password"]').should(
    "not.exist",
  );
  cy.get('[data-cy="password-input"][data-cy-type="text"]').should(
    "be.visible",
  );
};
