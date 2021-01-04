/// <reference types="cypress" />

context('Delete Existing Article', () => {
    describe("Cancel Deleting Article Test Suite", () => {
        it.only("Select the article with title 'The Civil War' to delete", () => {
            cy.visit("/");
            cy.get('table').contains('td', 'The Civil War').wait(2000).click()
            cy.get("button[name='delete']").wait(1000).click()
            cy.on('window:confirm', () => false);
            cy.get("button[name='cancel']").wait(2000).click()
            cy.get('table').contains('td', 'The Civil War').should("exist")
        });
    });

    describe("Confirming Deleting Article Test Suite", () => {
        it.only("Select the article with title 'The Civil War' to delete", () => {
            cy.visit("/");
            cy.get('table').contains('td', 'The Civil War').wait(2000).click()
            cy.get("button[name='delete']").wait(1000).click()
            cy.on('window:confirm', () => true);
            cy.get('table').contains('td', 'The Civil War').should("not.exist")
        });
    });
});

