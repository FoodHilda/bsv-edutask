describe('Test todo item status becomes done when click on active todo item', () => {
  it('Test todo item status becomes done when click on active todo item', () => {
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
    cy.contains('input', 'Create new Task').click();
    // navigate to detail view
    cy.get('a').contains('example title').click();
    // click active todo item
    cy.contains("span", "Watch video").parent().find('span.checker.unchecked').click();
    // check so example todo status is done
    cy.contains("span", "Watch video").parent().find('span.checker.unchecked').should('not.exist');
    cy.contains("span", "Watch video").parent().find('span.checker.checked').should('exist');
  })
})

describe('Test todo item status becomes active when click on done todo item', () => {
  it('Test todo item status becomes active when click on done todo item', () => {
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
    cy.contains('input', 'Create new Task').click();
    // navigate to detail view
    cy.get('a').contains('example title').click();
    // create todo status done
    cy.contains("span", "Watch video").parent().find('span.checker.unchecked').click();
    // click done todo item
    cy.contains("span", "Watch video").parent().find('span.checker.checked').click();
    // check so example todo status is active
    cy.contains("span", "Watch video").parent().find('span.checker.unchecked').should('exist');
    cy.contains("span", "Watch video").parent().find('span.checker.checked').should('not.exist');
  })
})