

// visit the home login page
before(() => {
    cy.visit(Cypress.env('url')+'/login')
})



// Check Home Page layout
context('[AS.G0] | Check the Home Login Page Layout', () => {

    it('[AS.G0.T1] | Pass in Valid credentials to login for the first time', () => {
        cy.title().should('include', 'The Internet')
        cy.document().should('have.property', 'charset').and('eq', 'UTF-8')
        cy.get('[id=username]').should('contain','')
        cy.get('[id=password]').should('contain','')
        // check for icon class
        cy.get('button[type=submit] i').should('have.class','fa-sign-in')
    })

})


// Happy Path Test cases with Valid Credentials
context('[AS.G1] | Check if we can login to Home login page with valid credentials', () => {

    it('[AS.G1.T1] | Pass in Valid credentials to login for the first time', () => {
        cy.get('[id=username]').type(Cypress.env('username'))
        cy.get('[id=password]').type(Cypress.env('password'))
        cy.get('button[type=submit]').click()
    })

    it('[AS.G1.T2] | Verify if Login worked',() => {
        cy.url().should('eq', Cypress.env('url')+'/secure') 
        cy.get('.subheader').should('contain','Welcome to the Secure Area. When you are done click logout below.')
        cy.get('#flash').should('contain','You logged into a secure area!')        
    })

    it('[AS.G1.T3] | Logout of page and verify result',() => {
        cy.get('.icon-signout').click()   
        cy.url().should('eq', Cypress.env('url')+'/login')
        cy.clearCookies()
    })
})

// Negative Test case with wrong credentials
context('[AS.G2] | Check if we can login to Home login page with InValid credentials', () => {

    it('[AS.G2.T1] | Pass in InValid credentials ', () => {
        cy.get('[id=username]').type(Cypress.env('username')+'test')
        cy.get('[id=password]').type(Cypress.env('password'))
        cy.get('button[type=submit]').click()
    })

    it('[AS.G2.T2] | Verify if Login failed',() => {
        cy.url().should('eq', Cypress.env('url')+'/login') 
        cy.get('h2').should('contain','Login Page')
        cy.get('#flash').should('contain','Your username is invalid!')        
    })
    
})

// View Port Test case 
context('[AS.G3] | Verify View Port for Iphone Views', () => {

    beforeEach(() => {
        cy.viewport(Cypress.env('mobile_viewport'))
    })

    it('[AS.G3.T1] | Pass in Valid credentials to login for the first time', () => {
        cy.get('[id=username]').type(Cypress.env('username'))
        cy.get('[id=password]').type(Cypress.env('password'))
        cy.get('button[type=submit]').click()
    })

    it('[AS.G3.T2] | Verify Login success message width is has per mobile view',() => {
        cy.url().should('eq', Cypress.env('url')+'/secure') 
        cy.get('.subheader').should('contain','Welcome to the Secure Area. When you are done click logout below.')
        cy.get('#flash').should('contain','You logged into a secure area!')       
        cy.get('.flash')
            .should('have.css', 'width')
            .and('eq', '290px')
    })
    
})