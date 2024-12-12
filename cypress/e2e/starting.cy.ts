describe("Testin page functionality",()=>{
    beforeEach(() => {
        cy.viewport(2304,1310)
        cy.visit("/")
        cy.exec('npm run db:clean', {failOnNonZeroExit: false})
        cy.exec('npm run db', {failOnNonZeroExit: false});
    })
    it("checks for adding items to cart", ()=>{
        cy.get('a[href="/cartpage"]').click();

        cy.request('POST', 'http://localhost:3000/api/cart', { id: 1 }).then(
            (response) => {
                console.log(response.body)
              expect(response.body.cartItem).to.have.property("title", "Essence Mascara Lash Princess")
              expect(response.body.cartItem).to.have.property("description", "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.")
            }
          )
        cy.contains('button', 'Click here to buy now', {timeout:5000}).click();
        cy.get('a[href="/history"]').click();
        cy.contains('Essence Mascara Lash Princess', {timeout:5000});
    })
    it("checks for proper navigation", ()=>{
        cy.visit("/")
        cy.get('a[href="/history"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}/history`);
        cy.get('a[href="/cartpage"]').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}cartpage`);
        cy.contains('a', 'Home').click();
        cy.url().should('eq', `${Cypress.config().baseUrl}`);
    })
})