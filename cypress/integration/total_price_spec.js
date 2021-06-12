const Users = [{ name: "standard_user" }, { name: "performance_glitch_user" }];

describe("Total Price Verification", () => {
  Users.forEach((example) => {
    it("Purchase compare price", () => {
      cy.visit("https://www.saucedemo.com/");
      cy.get("[data-test=username]").type(example.name);
      cy.get("[data-test=password]").type("secret_sauce");
      cy.get("[data-test=login-button]").click();
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

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
      cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
      cy.get("[data-test=firstName]").type("Jason");
      cy.get("[data-test=lastName]").type("Lehmann");
      cy.get("[data-test=postalCode]").type("60640");

      cy.get("[data-test=continue]").click();

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
