import { When } from 'cypress-cucumber-preprocessor/steps';

When('The User navigates to the TPP portal with UserName password and Press login', () => {
    cy.visit('https://leumi-open-banking.web.app')
    cy.get('#email') .type('dummy').should('have.value', 'dummy')
    cy.get('#password').type('Temp123$%^').should('have.value', 'Temp123$%^')
    cy.get('#login').click()
});

Then('The User can view the TPP portal', () => {

});
