Cypress.Commands.add('loadList', () => {
  cy.intercept('GET', 'http://ip-api.com/json/?fields=49600', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
});