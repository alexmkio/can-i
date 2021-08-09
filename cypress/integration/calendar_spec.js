describe('Calendar user flows', () => {

  beforeEach(() => {
    cy.loadList();
  });

  it('The url should be url/calendar', () => {
    cy.get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('section[class="possBlurb"]').children('a').click()
    cy.url().should('include', '/calendar')
  });

  it('The site should display the name of the app at all times', () => {
    cy.get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('section[class="possBlurb"]').children('a').click()
    cy.get('h1').contains('Can I look at a tree?')
  });

  it('The app title should be a link home', () => {
    cy.get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('section[class="possBlurb"]').children('a').click()
    cy.get('h1').click()
      .url().should('include', '/')
  });

  it('A user should see a subheader for the page', () => {
    cy.get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('section[class="possBlurb"]').children('a').click()
    cy.get('h2').contains(`Your calendar`)
  });

  it('A user should see instructions for adding hours to their calendar',
  () => {
    cy.get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('section[class="possBlurb"]').children('a').click()
    cy.contains(
      `Click on an hour to add or delete it from your calendar`
    )
  });

  it('A user should be able to add an hour to their calendar', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').first().click()
      .get('section[class="possBlurb"]').children('a').click()
    cy.get('.card').should('have.length', 1)
  });

  it('A user should be able to add multiple hours to their calendar', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').first().click()
      .get('.card').eq(3).click()
      .get('section[class="possBlurb"]').children('a').click()
    cy.get('.card').should('have.length', 2)
  });

  it('A user should be able to delete an hour from their calendar', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').first().click()
      .get('.card').eq(3).click()
      .get('section[class="possBlurb"]').children('a').click()
    cy.get('.card').first().click()
    cy.get('.card').should('have.length', 1)
  });

  it(
    'Each hour card contains a date, hour, temp, wind speed, & poss of precip', 
  () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').last().click()
      .get('section[class="possBlurb"]').children('a').click()
    cy.contains('December 30')
    cy.contains('10 PM')
    cy.contains('49')
    cy.contains('9')
    cy.contains('60%')
  });

});