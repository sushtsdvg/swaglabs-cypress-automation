describe('Login Tests', () =>{
    it('Invalid Username',()=>{
        cy.visit('/')
        cy.get('#login-button').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain','Username is required')
        cy.get('#user-name').type('standard_user')
        cy.get('#login-button').click()
        cy.get('[data-test="error"]').should('be.visible').and('contain','Password is required')
        cy.reload()

        // Username and password error
        cy.login('invalid_user', 'secret_sauce')
        cy.get('[data-test="error"]').should('be.visible').and('contain','Username and password do not match any user in this service')
        cy.reload()

        // Lockedout user error
        cy.login('locked_out_user', 'secret_sauce')
        cy.get('[data-test="error"]').should('be.visible').and('contain','Sorry, this user has been locked out.')
        cy.reload()
    })
    it('Verify Login with valid credentials',()=>{
        cy.visit('/')
        cy.login('standard_user', 'secret_sauce')
        cy.url().should('include','/inventory.html')
    })
})