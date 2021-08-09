describe('Suitable Hours user flows', () => {

  beforeEach(() => {
    cy.loadCalendar();
  });

  it('The url should be url/good_weather', () => {
    cy.url().should('include', '/good_weather')
  });

  it('The site should display the name of the app at all times', () => {
    cy.get('h1').contains('Can I look at a tree?')
  });

  it('The app title should be a link home', () => {
    cy.get('h1').click()
      .url().should('include', '/')
  });

  it('A user should see a subheader for the page', () => {
    cy.get('h2').contains(`Suitable hours to be outside`)
  });

  it('A user should see instructions for adding hours to their calendar', () => {
    cy.contains(
      `Click on an hour to add or delete it from your calendar`
    )
  });

  it('User should see a link to their calendar', () => {
    cy.get('section[class="possBlurb"]').children('a')
      .should('have.attr', 'href')
      .and('includes', '/calendar')
  });

  it('The user should be taken to the calendar page after clicking the link', () => {
    cy.get('section[class="possBlurb"]').children('a').click()
    cy.url().should('include', '/calendar') 
  });

  // The following test does currently not work as Cypress does not currently
  // support typing enter on an "unfocused" element
  // https://github.com/cypress-io/cypress/issues/8267
  // it('The page can be navigated using the keyboard', () => {
  //   cy.get('body').tab().tab().type('{enter}')
  //   cy.url().should('include', '/calendar')  
  // });

});

describe('Suitable Hours with hours user flows', () => {

  beforeEach(() => {
    cy.loadCalendarWithAdjustedDate();
  });

  it('Given certain thresholds/upcoming weather should see certain "good" hours', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').should('have.length', 6)
    cy.contains('5 PM')
    cy.contains('6 PM')
    cy.contains('7 PM')
    cy.contains('8 PM')
    cy.contains('9 PM')
    cy.contains('10 PM')
  });

  it('Given certain thresholds/upcoming weather should see certain "good" hours', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('90')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').should('have.length', 4)
    cy.contains('7 PM')
    cy.contains('8 PM')
    cy.contains('9 PM')
    cy.contains('10 PM')
  });

  it('Given certain thresholds/upcoming weather should see certain "good" hours', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('20')
      .get('select[name="precipProbability"]').select('70')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').should('have.length', 4)
    cy.contains('5 PM')
    cy.contains('6 PM')
    cy.contains('9 PM')
    cy.contains('10 PM')
  });

  it('Given certain thresholds/upcoming weather should see certain "good" hours', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('50')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.get('.card').should('have.length', 4)
    cy.contains('5 PM')
    cy.contains('6 PM')
    cy.contains('7 PM')
    cy.contains('8 PM')
  });

  it('Each hour card contains a date, hour, temp, wind speed, & poss of precip', () => {
    cy.get('select[name="minTemp"]').select('40')
      .get('select[name="maxTemp"]').select('100')
      .get('select[name="wind"]').select('30')
      .get('select[name="precipProbability"]').select('50')
      .get('button').click()
    cy.get('section[class="results"]').children('a').click()
    cy.contains('December 30')
    cy.contains('5 PM')
    cy.contains('99')
    cy.contains('19')
    cy.contains('20%')
  });

});