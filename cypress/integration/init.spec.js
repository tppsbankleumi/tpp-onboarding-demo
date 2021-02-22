describe('Cypress', () => {
    it('is working', () => {
      expect(true).to.equal(true)
    })

    it('visits the app', () => {
        cy.visit('http://localhost:3006')
    })
    it('it test login', () => {
        cy.get('#email')
        .type('dummy')
        .should('have.value', 'dummy')
        cy.get('#password')
        .type('Temp123$%^')
        .should('have.value', 'Temp123$%^')
        cy.get('#login')
        .click()
      })
      it('it test sign up', () => {
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
      })
      it('it test verify phone', () => {
        cy.wait(2000)
        cy.get('#phone')
        .type('0519458856')
        .should('have.value', '0519458856')
        cy.get('#sendOtp')
        .click()
      })

      it('it test verify otp code', () => {
        cy.wait(2000)
        cy.get('#otp')
        .type('123456')
        .should('have.value', '123456')
        cy.get('#verifyOtp')
        .click()
      })

      it('it choose account ', () => {
        cy.wait(4000)
        cy.get('#0').click()
        cy.get('#approveAccount')
        .click()
        cy.wait(4000)
      })



      
  })    