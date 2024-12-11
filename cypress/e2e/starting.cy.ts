describe("Testin page functionality",()=>{
    it("checks for page routing", ()=>{
        cy.viewport(2304,1310)
        cy.visit("/")
        cy.get('a[href="/cartpage"]').click();
        cy.contains('button', 'Click here to buy now', {timeout:5000})})
})