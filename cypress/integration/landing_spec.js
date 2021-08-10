describe('Landing user flows', () => {

  beforeEach(() => {
    cy.loadHome();
  });

  it('The url should be url/', () => {
    cy.url().should('include', '/')
  });

  it('The site should display the name of the app at all times', () => {
    cy.get('h1').contains('Can I look at a tree?')
  });

  it('The app title should be a link home', () => {
    cy.get('h1').click()
      .url().should('include', '/')
  });

  it('When a user first visits the site it should contain instructions', () => {
    cy.contains(
      `Select your weather thresholds and find out if you can go outside`
    )
  });

  it('Should have a form with default values', () => {
    cy.get('select[name="minTemp"]').should('have.value', '50')
      .get('select[name="maxTemp"]').should('have.value', '90')
      .get('select[name="wind"]').should('have.value', '10')
      .get('select[name="precipProbability"]').should('have.value', '50')
  });

  it('User can choose a different value than the default value', () => {
    cy.get('select[name="minTemp"]').select('40').should('have.value', '40')
      .get('select[name="minTemp"]').select('60').should('have.value', '60')

      .get('select[name="maxTemp"]').select('80').should('have.value', '80')
      .get('select[name="maxTemp"]').select('100').should('have.value', '100')

      .get('select[name="wind"]').select('5').should('have.value', '5')
      .get('select[name="wind"]').select('20').should('have.value', '20')
      .get('select[name="wind"]').select('30').should('have.value', '30')

      .get('select[name="precipProbability"]').select('30')
        .should('have.value', '30')
      .get('select[name="precipProbability"]').select('70')
        .should('have.value', '70')
  });

  it('The user should be taken to the results page after clicking submit', () => {
    cy.get('a[name="submit"]').click()
    cy.url().should('include', '/results')  
  });

  // The following test does currently not work as Cypress does not currently
  // support typing enter on an "unfocused" element
  // https://github.com/cypress-io/cypress/issues/8267
  // it('The homepage can be navigated using the keyboard', () => {
  //   cy.get('body').tab().tab().tab().tab().tab().tab().type('{enter}')
  //   cy.url().should('include', '/results')  
  // });

});