/// <reference types="cypress" />

context('Create New Article', () => {
    describe("Create New Article Test Suite", () => {
        it.only("Click on Write Article button to start", () => {
            cy.visit("/");
            cy.get("button[name='createArticle']").wait(2000).click()
            cy.get("button[name='cancel']").wait(1000).click()
            cy.get("button[name='createArticle']").wait(2000).click()
            cy.get("input[name='title']").type("The Programmer")
            cy.get("input[name='subjectMatter']").type("Learn JavaScript")
            cy.get("quill-editor[name='body']").should(e => {
                const [dom] = e.get();
                dom.querySelector('p').append('Learning JavaScript is fun!')
            })
            cy.get("input[id='next']").wait(1000).click()

            cy.get("input[name='name']").type("Sarah Doe")
            cy.get("input[name='gender']").check('female')
            cy.get("input[name='birthday']").type('1980-11-27')
            cy.get("input[name='numberOfPublications']").clear().type(5)
            cy.get("textarea[name='bio']").type('I am a JavaScript writer and speaker.')

            cy.get("input[type='submit']").wait(1000).click()

            cy.get('table').contains('td', 'The Programmer').should("exist")
        });
    });
});

