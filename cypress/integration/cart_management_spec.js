/**
 * Verify that items can be added to the cart
 * Verify that items can be removed from the cart
 * Verify that the “Test.allTheThings” shirt is available for purchase
 */

describe("Basic Cart Management", () => {
  it("Able to confirm that Items can be added and removed from the cart.", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

    //
    cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
      .should("be.visible")
      .click();
    cy.get("[data-test=remove-sauce-labs-backpack]")
      .should("be.visible")
      .click();
  });
});

describe('As a user I can ensure that the "All the Things shirt" is visible', () => {
  it.only("is able to use Basic Login", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
    /*  cy.get("#item_3_title_link > .inventory_item_name").contains(
      "Test.allTheThings()"
    );*/
    cy.get("#item_3_title_link > .inventory_item_name").should(($lis) => {
      expect($lis).to.contain("Test.allTheThings()");
    });
  });
});
