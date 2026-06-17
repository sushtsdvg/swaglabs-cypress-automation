before(() => {
  cy.visit("/");
  cy.login("standard_user", "secret_sauce");
  cy.url().should("include", "/inventory.html");
});
describe("Cart Page Tests", () => {
    it("Verify that Continue Shopping button redirects to inventory page",()=>{
      cy.get('#shopping_cart_container').should('be.visible').click();
      cy.url().should('include', '/cart.html');
      cy.get('#continue-shopping').should('be.visible').click();
      cy.url().should('include', '/inventory.html');
    })

    it("Verify that Remove button removes a product from cart",()=>{
      cy.get('#add-to-cart-sauce-labs-backpack').should('be.visible').click();
      cy.get("[data-test='shopping-cart-link']").should('be.visible').click();
      cy.url().should('include', '/cart.html');
      cy.get("#remove-sauce-labs-backpack").should('be.visible').click();
    })

    it("Verify that Checkout button redirects to checkout page",()=>{
      cy.get('#checkout').should('be.visible').click();
      cy.url().should('include', '/checkout-step-one.html');
    })   
})