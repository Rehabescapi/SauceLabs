describe("Login with valid Credentials", () => {
  it("is able to use Basic Login", () => {
    cy.visit("https://www.saucedemo.com/");
    cy.get("[data-test=username]").type("standard_user");
    cy.get("[data-test=password]").type("secret_sauce");
    cy.get("[data-test=login-button]").click();
    cy.url().should("eq", "https://www.saucedemo.com/inventory.html");

    cy.get("[data-test=add-to-cart-sauce-labs-backpack]")
      .should("be.visible")
      .click();
    cy.get("[data-test=remove-sauce-labs-backpack]")
      .should("be.visible")
      .click();
  });
});

describe("Test All the Things shirt is visible", () => {
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
