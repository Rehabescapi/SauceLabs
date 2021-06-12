/// <reference types="Cypress" />
/**
 * Verify the title of the browser tab when on the website (no login required)

Verify that a user can log into the site with valid credentials

Verify that a user cannot log into the site with invalid credentials

Verify that a locked out user cannot log in, even with valid credentials

 */

describe("Able to load the login Page", () => {
  it("Does not do much!", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.title().should("eq", "Swag Labs");
  });
});

describe("Login with valid Credentials", () => {
  it("is able to use Basic Login", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });

  it("is able to use Basic Login with Performance User", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("performance_glitch_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
  });
});

describe("Invalid Login Flow", () => {
  it.only("User cannot log in", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("performance_glitch_user");
    cy.get("[data-test=password]").type("secret_sauceS");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]").should("be.visible");
  });

  it.only("User is locked out log in", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("locked_out_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();

    cy.get("[data-test=error]")
      .should("be.visible")
      .contains("Sorry, this user has been locked out.");
  });
});
