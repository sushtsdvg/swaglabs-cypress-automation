before(() => {
  cy.visit("/");
  cy.login("standard_user", "secret_sauce");
  cy.url().should("include", "/inventory.html");
});

describe("Inventory Tests", () => {
  context("Sort Tests", () => {
    it("Verify that products are sorted by name A-Z", () => {
      cy.get('.product_sort_container').select("Name (A to Z)");

      cy.get(".inventory_item_name")
        .should("exist")
        .then(($items) => {
          const names = [...$items].map((el) => el.innerText.trim());
          cy.log("Product Names:", JSON.stringify(names));
          const expected = [...names].sort((a, b) => a.localeCompare(b));
          cy.log("Expected Names:", JSON.stringify(expected));
          expect(JSON.stringify(names)).to.be.equal(JSON.stringify(expected));
        });
    });
    it("Verify that products are sorted by name Z-A", () => {
      cy.get('.product_sort_container').select("Name (Z to A)");

      cy.get(".inventory_item_name")
        .should("exist")
        .then(($items) => {
          const names = [...$items].map((el) => el.innerText.trim());
          cy.log("Product Names:", JSON.stringify(names));
          const expected = [...names].sort((a, b) => b.localeCompare(a));
          cy.log("Expected Names:", JSON.stringify(expected));
          expect(JSON.stringify(names)).to.be.equal(JSON.stringify(expected));
        });
    });
    it("Verify that products are sorted by Price (low to high)", () => {
      cy.get('.product_sort_container').select("Price (low to high)");

      cy.get(".inventory_item_price")
        .should("exist")
        .then(($items) => {
          const prices = [...$items].map((el) => el.innerText.trim());
          // cy.log("Product Prices:", JSON.stringify(prices).split('$')[0]);
          const expected = [...prices].sort((a, b) => parseFloat(a) - parseFloat(b));
          // cy.log("Expected Prices:", JSON.stringify(expected).split('$')[0]);
          expect(JSON.stringify(prices)).to.be.equal(JSON.stringify(expected));
        });
    });
    it("Verify that products are sorted by Price (high to low)", () => {
      cy.get('.product_sort_container').select("Price (high to low)");

      cy.get(".inventory_item_price")
        .should("exist")
        .then(($items) => {
          const prices = [...$items].map((el) => el.innerText.trim());
          // cy.log("Product Prices:", JSON.stringify(prices).split('$')[0]);
          const expected = [...prices].sort((a, b) => parseFloat(b) - parseFloat(a));
          // cy.log("Expected Prices:", JSON.stringify(expected).split('$')[0]);
          expect(JSON.stringify(prices)).to.be.equal(JSON.stringify(expected));
        });
    });
  });
  context("Cart Tests", () => {
    it("Verify that user can add a product to cart", () => {
      cy.get(".inventory_item_name").should("exist").then(($items) => {
        $items.each((index, item) => {
          const name = item.innerText.trim();
          cy.log("Product Name:", JSON.stringify(name));
        });
      });
      cy.get("#add-to-cart-sauce-labs-fleece-jacket").click();
      cy.get("[data-test='shopping-cart-badge']").should("have.text", "1");
    })
    it("Verify that user can remove a product from cart through inventory page", () => {
      cy.get(".inventory_item_name").should("exist").then(($items) => {
        $items.each((index, item) => {
          const name = item.innerText.trim();
          cy.log("Product Name:", JSON.stringify(name));
        });
      });
      cy.get("#remove-sauce-labs-fleece-jacket").click();
    })
  })
});
