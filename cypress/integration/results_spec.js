describe('Results user flows', () => {

  beforeEach(() => {
    cy.loadList()
      .get('button').click()
  });

  it('The url should be url/results', 
  () => {
    cy.url().should('include', '/results')
  });

  it('The site should display the name of the app at all times', 
  () => {
    cy.get('h1').contains('Can I look at a tree?')
  });

  it('The app title should be a link home', 
  () => {
    cy.get('h1').click()
      .url().should('include', '/')
  });

  it('Given weather fixtures far into the future the user should see bad news', 
  () => {
    cy.get('h2').contains('Bad news')
      .get('p').contains(`You can't go outside for`)
  });

  it('User should see a link to see good weather in the future', 
  () => {
    cy.get('section[class="results"]').children('a').should('have.attr', 'href')
      .and('includes', '/good_weather')
  });

  it('The user should be taken to the results page after clicking the link', 
  () => {
    cy.get('section[class="results"]').children('a').click()
    cy.url().should('include', '/good_weather') 
  });

  // The following test does currently not work as Cypress does not currently
  // support typing enter on an "unfocused" element
  // https://github.com/cypress-io/cypress/issues/8267
  // it('The page can be fully navigated using the keyboard', () => {
  //   cy.get('body').tab().tab().type('{enter}')
  //   cy.url().should('include', '/good_weather')  
  // });

});