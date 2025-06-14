describe('Test remove todo item', () => {

    let uid;
    let task_id;
    let todo_id;
    let email;

    before(function () {
        cy.fixture('user.json')
            .then((user) => {
                cy.request({
                    method: 'POST',
                    url: 'http://localhost:5000/users/create',
                    form: true,
                    body: user
                }).then((userResponse) => {
                    uid = userResponse.body._id.$oid;
                    email = userResponse.body.email;
                    cy.log(userResponse.body.firstName);
                    cy.log(userResponse.body._id.$oid);

                    cy.log('Created user with ID: ' + uid);

                    const data = new URLSearchParams();
                    data.append('title', "title");
                    data.append('description', '(add a description here)');
                    data.append('userid', uid);
                    data.append('url', "https://example.com");
                    data.append('todos', JSON.stringify(['Initial Test Todo']));

                    cy.request({
                        method: 'POST',
                        url: `http://localhost:5000/tasks/create`,
                        body: data.toString(),
                        headers: {
                            'Content-Type': 'application/x-www-form-urlencoded'
                        }
                    }).then((taskResponse) => {
                        cy.log(taskResponse.body);

                        task_id = taskResponse.body[0]._id.$oid;
                        todo_id = taskResponse.body[0].todos[0]._id.$oid;

                        cy.log(task_id);
                        cy.log(todo_id);
                    });

                })
            })

    });

    beforeEach(function () {
        // Log in the user before each test case
        cy.visit('http://localhost:3000');
        cy.contains('div', 'Email Address')
            .find('input[type=text]')
            .type(email);
        cy.get('form').submit();

        // After login, click on the created task to open its detail view (Popup)
        cy.contains('div.title-overlay', 'title')
            .click();
    });

    it('Test remove todo item', () => {

        // should exists todo item: ['Initial Test Todo']
        cy.contains(".todo-item", '["Initial Test Todo"]').as('todoItemToDelete').find('.remover').click();

        // should not exists todo item: ['Initial Test Todo']
        cy.get('@todoItemToDelete').should('not.exist');
    })

    after(function () {
        cy.request({
            method: 'DELETE',
            url: `http://localhost:5000/users/${uid}`
        }).then((response) => {
            cy.log(response.body)
        })
    })
})
