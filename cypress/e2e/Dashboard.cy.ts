// As far as we don't have any API it's nothing to mock here so we just share same fuxtures between app and tests.
// In real world we would stub real API call in tests and mock its response with test fixtures.
// App wouldn't have any fixtures at all in this case.
import { user1, user2, users } from "./../../src/fixtures/app_fixture";
describe("Dashboard", () => {
  // The plan is to list here all possible tests i can imagine but not implement them for now so I can send task today
  // There is real full coverage of Login screen so i think it's sensible to list cases and i can add any/come real tests for dashboard by additional request if needed
  it("should check that column set is right for fixture's user1", () => {
    cy.goToLoginPage().login(user1.name, user1.password);
    cy.get('[data-cy="error-dialog"]').should("not.exist");
    // todo
  });
  it("should check that column set is right for fixture's user2", () => {
    cy.goToLoginPage().login(user2.name, user2.password);
    cy.get('[data-cy="error-dialog"]').should("not.exist");
    // todo
  });
  // in real world we shouldn't check sorting, filtering, pagination for our particlular case
  // this functionality is handled by vuetify's data table server component and API - both parties should be tested and trusted by the point we use them
  it("should add a product", () => {
    cy.goToLoginPage().login(user2.name, user2.password);
    cy.get('[data-cy="error-dialog"]').should("not.exist");
    // todo
  });
  it("should delete a product", () => {
    cy.goToLoginPage().login(user2.name, user2.password);
    cy.get('[data-cy="error-dialog"]').should("not.exist");
    // todo
  });
  it("should edit a product", () => {
    cy.goToLoginPage().login(user2.name, user2.password);
    cy.get('[data-cy="error-dialog"]').should("not.exist");
    // todo
  });
});
