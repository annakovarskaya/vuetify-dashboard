/// <reference types="cypress" />
// ***********************************************
// This example commands.ts shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
Cypress.Commands.add("goToLoginPage", (): void => {
  cy.visit("/");
  cy.get('[data-cy="error-dialog"]').should("not.exist");
});

Cypress.Commands.add("login", (name: string, password: string): void => {
  cy.get('[data-cy="user-input"]').should("be.visible").type(name);
  // we don't want to see password in logs
  cy.get('[data-cy="password-input"]')
    .should("be.visible")
    .type(password, { log: false });
  cy.get('[data-cy="login-button"]').should("be.visible").click();
});

//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
//
declare global {
  namespace Cypress {
    interface Chainable {
      login(email: string, password: string): Chainable<void>;
      drag(subject: string, options?: Partial<TypeOptions>): Chainable<Element>;
      dismiss(
        subject: string,
        options?: Partial<TypeOptions>,
      ): Chainable<Element>;
      visit(
        originalFn: CommandOriginalFn,
        url: string,
        options: Partial<VisitOptions>,
      ): Chainable<Element>;
    }
  }
}
