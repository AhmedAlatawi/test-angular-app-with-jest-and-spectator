/// <reference types="cypress" />

context('Update Existing Article', () => {
    describe("Update Existing Article Test Suite", () => {
        it.only("Select the article with title 'The Dreamer' to update", () => {
            cy.visit("/");
            cy.get('table').contains('td', 'The Dreamer').wait(2000).click()
            cy.get("button[name='cancel']").wait(2000).click()
            cy.get('table').contains('td', 'The Dreamer').wait(2000).click()
            cy.get("button[name='edit']").wait(2000).click()
            cy.get("input[name='title']").clear().type("I'm Dreaming")
            cy.get("input[name='subjectMatter']").clear().type("Why Do I Dream?")
            cy.get("quill-editor[name='body']").should(e => {
                const [dom] = e.get();
                dom.querySelector('p').append(' story, which should be told in public.')
            })
            cy.get("input[id='next']").wait(1000).click()
            cy.get("textarea[name='bio']").type('I am a fiction books writer. I love what I do!')
            cy.get("input[type='submit']").wait(1000).click()

            cy.get('table').contains('td', "I'm Dreaming").should("exist")
        });
    });
});

