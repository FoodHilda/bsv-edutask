describe('Test remove todo item', () => {
    it('Test remove todo item', () => {
        // navigate to sign up page
        cy.visit('http://localhost:3000')
        cy.contains('a', 'Click here to sign up').click()
        // sign up
        cy.get('input#email').type('test@example.com');
        cy.get('input#firstname').type('firstname');
        cy.get('input#lastname').type('lastname');
        cy.contains('input', 'Sign Up').click()
        // create task
        cy.get('input#title').type('example title');
        cy.get('input#url').type('https://www.youtube.com/watch?v=dQw4w9WgXcQ');
        cy.contains('input', 'Create new Task').click()
        // navigate to detail view
        cy.get('a').contains('example title').click()

        // should exists todo item: watch video
        cy.contains("span", "Watch video").parent().should('exist');

        cy.get('span.remover').click();

        // should not exists todo item: watch video
        cy.contains("span", "Watch video").parent().should('not.exist');
    })
})
