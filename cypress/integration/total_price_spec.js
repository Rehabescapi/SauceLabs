const { fillLogin, Users, fillStep1 } = require("../fixtures/utils");

describe("Total Price Verification", () => {
  Users.forEach((example) => {
    it("Purchase compare price", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);

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

      let subTotal = 0.0;
      let total = 0.0;

      cy.get(".inventory_item_price")
        .each(($el) => {
          //Grabs each inventory price
          subTotal += parseFloat($el.text().replace("$", ""));
        })
        .then(() => {
          //Because cypress reset variables at the end of each cy command.
          //https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Return-Values
          //This test pipes
          cy.contains("Item total:")
            .contains(subTotal)
            .then(() => {
              cy.get(".summary_tax_label")
                //Tax should only happen once. better clarity here
                .each(($el) => {
                  total =
                    subTotal + parseFloat($el.text().replace("Tax: $", ""));
                })
                .then(() => {
                  cy.get(".summary_total_label").contains(total);
                });
            });
        });
    });
  });
});

describe("Total Price Verification Buy Everything", () => {
  Users.forEach((example) => {
    it("Purchase compare price if everythin is bought", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);

      cy.get(".btn_inventory").each(($el) => {
        cy.wrap($el).click();
      });

      //Part 2
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.get(".shopping_cart_link").click();
      cy.url().should("eq", "https://www.saucedemo.com/cart.html");
      cy.get("[data-test=checkout]").click();

      fillStep1();

      //On to the testing the final page area
      cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");

      let subTotal = 0.0;
      let total = 0.0;

      cy.get(".inventory_item_price")
        .each(($el) => {
          //Grabs each inventory price
          subTotal += parseFloat($el.text().replace("$", ""));
        })
        .then(() => {
          //Because cypress reset variables at the end of each cy command.
          //https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Return-Values
          //This test pipes
          cy.contains("Item total:")
            .contains(subTotal)
            .then(() => {
              cy.get(".summary_tax_label")
                //Tax should only happen once. better clarity here
                .each(($el) => {
                  total =
                    subTotal + parseFloat($el.text().replace("Tax: $", ""));
                })
                .then(() => {
                  cy.get(".summary_total_label").contains(total);
                });
            });
        });
    });
  });
});

describe("Total Price Verification Buy Nothing", () => {
  Users.forEach((example) => {
    it.only("Purchase compare price if nothing is bought", () => {
      cy.visit("https://www.saucedemo.com/");
      fillLogin(example.name);

      //Part 2
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
      cy.get(".shopping_cart_link").click();
      cy.url().should("eq", "https://www.saucedemo.com/cart.html");
      cy.get("[data-test=checkout]").click();

      fillStep1();

      //On to the testing the final page area
      cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");

      let subTotal = 0.0;
      let total = 0.0;

      cy.contains("Item total:")
        .contains(subTotal)
        .then(() => {
          cy.get(".summary_tax_label")
            //Tax should only happen once. better clarity here
            .each(($el) => {
              total = subTotal + parseFloat($el.text().replace("Tax: $", ""));
            })
            .then(() => {
              cy.get(".summary_total_label").contains(total);
            });
        });
    });
  });
});
