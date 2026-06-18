before(() => {
  cy.visit("/");
  cy.login("standard_user", "secret_sauce");
  cy.url().should("include", "/inventory.html");
});
describe("Checkout Tests", () => {
    it("Verify Checkout with valid credentials", () => {
        // Add inventory items to cart

        cy.get(".inventory_item_name").should("exist").then(($items) => {
        $items.each((index, item) => {
          const name = item.innerText.trim();
          cy.log("Product Name:", JSON.stringify(name));
        });
      });
      cy.get(".inventory_item_price").should("exist").then(($items) => {
        $items.each((index, item) => {
          const price = item.innerText.trim();
          cy.log("Product Price:", JSON.stringify(price));
        });
      });
      cy.get("#add-to-cart-sauce-labs-fleece-jacket").click();
      cy.get("[data-test='shopping-cart-badge']").should("have.text", "1");

      // Go to cart and checkout
      cy.get("[data-test='shopping-cart-link']").click();
      cy.url().should("include", "/cart.html");
      cy.get("[data-test='checkout']").click();
      cy.url().should("include", "/checkout-step-one.html");

      // Fill in checkout information
      cy.get("#continue").click();
      cy.get("[data-test='error']").should("be.visible").and("contain", "First Name is required");
      cy.get("#first-name").type("John");
      cy.get("#continue").click();
      cy.get("[data-test='error']").should("be.visible").and("contain", "Last Name is required");
      cy.get("#last-name").type("Doe");
      cy.get("#continue").click();
      cy.get("[data-test='error']").should("be.visible").and("contain", "Postal Code is required");
      cy.get("#postal-code").type("12345");
      cy.get("#continue").click();
      cy.url().should("include", "/checkout-step-two.html");

      // Verify order summary and finish checkout
      cy.get(".inventory_item_name").should("exist").then(($items) => {
        const names = [...$items].map((el) => el.innerText.trim());
        cy.log("Product Names in Summary:", JSON.stringify(names));
        expect(names).to.include("Sauce Labs Fleece Jacket");
      });
      cy.get(".inventory_item_price").should("exist").then(($items) => {
        const prices = [...$items].map((el) => el.innerText.trim());
        cy.log("Product Prices in Summary:", JSON.stringify(prices));
        expect(prices).to.include("$49.99");
      });
      cy.get("#finish").click();
      cy.url().should("include", "/checkout-complete.html");
      cy.get(".complete-header").should("be.visible").and("contain", "Thank you for your order!");
      cy.contains("Your order has been dispatched, and will arrive just as fast as the pony can get there!").should("be.visible");
      cy.get("#back-to-products").should("be.visible").and("contain", "Back Home").click();
      cy.url().should("include", "/inventory.html");
    })
})