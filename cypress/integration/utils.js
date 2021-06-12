export const fillStep1 = () => {
  cy.url().should("eq", "https://www.saucedemo.com/checkout-step-one.html");
  cy.get("[data-test=firstName]").type("Jason");
  cy.get("[data-test=lastName]").type("Lehmann");
  cy.get("[data-test=postalCode]").type("60640");
  cy.get("[data-test=continue]").click();
};

export const fillLogin = (name) => {
  cy.get("[data-test=username]").type(name);
  cy.get("[data-test=password]").type("secret_sauce");
  cy.get("[data-test=login-button]").click();
  cy.url().should("eq", "https://www.saucedemo.com/inventory.html");
};

export const Users = [
  { name: "standard_user" },
  { name: "performance_glitch_user" },
];
