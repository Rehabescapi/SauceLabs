/**
 * Verify that items can be added to the cart
 * Verify that items can be removed from the cart
 * Verify that the “Test.allTheThings” shirt is available for purchase
 */

const { fillLogin, Users } = require("../fixtures/utils");

describe("Basic Cart Management", () => {
  Users.forEach((example) => {
    it("Able to confirm that Items can be added and removed from the cart.", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);
      //
      cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
        .should("be.visible")
        .click();
      cy.get(".shopping_cart_badge").should("contain.text", "1");

      cy.get("[data-test=remove-sauce-labs-backpack]")
        .should("be.visible")
        .click();

      cy.get(".shopping_cart_badge").should("not.exist");
    });

    it("Able to confirm that Items can be added from the cart.", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);
      //
      cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
        .should("be.visible")
        .click();
      cy.get(".shopping_cart_badge").should("contain.text", "1");
    });
  });
});

describe('As a user I can ensure that the "All the Things shirt" is visible', () => {
  Users.forEach((example) => {
    it("is able to use Basic Login and confirm", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);

      cy.get("#item_3_title_link > .inventory_item_name").should(($lis) => {
        expect($lis).to.contain("Test.allTheThings()");
      });
    });
  });
});
