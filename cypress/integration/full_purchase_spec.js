const Users = [{ name: "standard_user" }, { name: "performance_glitch_user" }];

describe("Fully Purchase ", () => {
  Users.forEach((example) => {
    it("Purchase Full", () => {
      cy.visit("https://www.saucedemo.com/");
      cy.get("[data-test=username]").type(example.name);
      cy.get("[data-test=password]").type("secret_sauce");
      cy.get("[data-test=login-button]").click();
      cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

      cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
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

      cy.url().should("eq", "https://www.saucedemo.com/checkout-step-two.html");

      cy.get(".summary_info > :nth-child(4)")
        .should("be.visible")
        .contains("FREE PONY EXPRESS DELIVERY");
      cy.get("[data-test=finish]").click();

      cy.get(".pony_express").should("be.visible");
    });
  });
});
