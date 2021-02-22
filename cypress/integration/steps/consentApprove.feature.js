import { When } from 'cypress-cucumber-preprocessor/steps';

When('User press Signup And login to bank application', () => {
    cy.get('#signUp') .click()
    cy.wait(2000)
    cy.get('#email')
    .type('gmrtgs2')
    .should('have.value', 'gmrtgs2')
    cy.get('#password')
    .type('TST001')
    .should('have.value', 'TST001')
    cy.get('#login')
    .click()
});

When('User Enter his personal Phone', () => {
    cy.wait(2000)
    cy.get('#phone')
    .type('0519458856')
    .should('have.value', '0519458856')
    cy.get('#sendOtp')
    .click()
});

When('User Enter OTP code', () => {
    cy.wait(2000)
    cy.get('#otp')
    .type('123456')
    .should('have.value', '123456')
    cy.get('#verifyOtp')
    .click()
});
When('User Approve Consent Account', () => {
    cy.wait(8000)
        cy.get('#0').click()
        cy.get('#approveAccount')
        .click()
        cy.wait(4000)
});




Then('The User can view His Balance', () => {
    cy.wait(16000)

});
