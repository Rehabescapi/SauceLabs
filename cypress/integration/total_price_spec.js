const { fillLogin, Users, fillStep1 } = require("./utils");

describe("Total Price Verification", () => {
  Users.forEach((example) => {
    it("Purchase compare price", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.Users);

      //Fun Todo get a list of available options. Select a ran # 1-4 and continue.
      cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
        .should("be.visible")
        .click();

      cy.get("[data-test=add-to-cart-sauce-labs-bike-light]")
        .should("be.visible")
        .click();

      //Part 2
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.get(".shopping_cart_link").click();
      cy.url().should("eq", "https://www.saucedemo.com/cart.html");
      cy.get("[data-test=checkout]").click();

      fillStep1();

      //On to the testing the final page area
      cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");

      let sum = 0.0;
      cy.get(".inventory_item_price")
        .each(($el) => {
          sum += parseFloat($el.text().replace("$", ""));
        })
        .then(() => {
          cy.contains("Item total:")
            .contains(sum)
            .then(() => {
              cy.get(".summary_tax_label")
                .each(($el) => {
                  sum += parseFloat($el.text().replace("Tax: $", ""));
                })
                .then(() => {
                  cy.get(".summary_total_label").contains(sum);
                });
            });
        });
    });
  });
});
