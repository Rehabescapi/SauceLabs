import { fillLogin, fillStep1, Users } from "./utils";
/**
 * Verify that the Pony Express image appears after a successful purchase
 */

describe("Fully Purchase ", () => {
  Users.forEach((example) => {
    it("Purchase Full", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);

      cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
        .should("be.visible")
        .click();

      //Part 2
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.get(".shopping_cart_link").click();
      cy.url().should("eq", "https://www.saucedemo.com/cart.html");
      cy.get("[data-test=checkout]").click();

      fillStep1();

      cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");
      cy.get(".summary_info > :nth-child(4)")
        .should("be.visible")
        .contains("FREE PONY EXPRESS DELIVERY");
      cy.get("[data-test=finish]").click();

      cy.get(".pony_express").should("be.visible");
    });
  });
});
