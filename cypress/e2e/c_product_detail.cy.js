before(() => {
  cy.visit("/");
  cy.login("standard_user", "secret_sauce");
  cy.url().should("include", "/inventory.html");
});
describe("Product Detail Tests", () => {
    it("Verify Product Detail Page", () => {
        cy.get("#item_4_title_link").find("[data-test='inventory-item-name']").invoke("text").then((productName) => {
            cy.get("#item_4_title_link").siblings().eq(0).invoke("text").then((productDescription) => {
                cy.get("#item_4_title_link").parent().siblings().find("[data-test='inventory-item-price']").invoke("text").then((productPrice) => {
                    cy.get("#item_4_title_link").click();
                    cy.url().should("include", "/inventory-item.html?id=");
                    cy.get("[data-test='inventory-item-name']").should("have.text", productName);
                    cy.get("[data-test='inventory-item-desc']").should("have.text", productDescription);
                    cy.get("[data-test='inventory-item-price']").should("have.text", productPrice);
                })
            })
        })
    });
});
