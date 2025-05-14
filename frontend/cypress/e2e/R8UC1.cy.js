describe('Test add empty todo item', () => {
  it('Test add empty todo item', () => {
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


    //create new todo item with description empty
    cy.get("input[placeholder='Add a new todo item']").clear()
    // check if the button is disabled
    cy.contains('input', 'Add')
      .should('exist')       // First, ensure it exists
      .and('be.disabled');   // Then check if it's disabled
  })
})
describe('Test add non-empty todo item', () => {
  it('Test add non-empty todo item', () => {
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


    //create new todo item with a description
    cy.get("input[placeholder='Add a new todo item']").type('example todo item')
    // check if the button is enabled
    cy.contains('input', 'Add')
      .should('exist')       // First, ensure it exists
      .and('be.enabled');   // Then check if it's enabled
  })
})