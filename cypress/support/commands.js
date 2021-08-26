Cypress.Commands.add('loadHome', () => {
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
});

Cypress.Commands.add('loadResults', () => {
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
    .get('form').children('a').click()
});

Cypress.Commands.add('loadGoodResults', () => {
  const now = new Date("2029-12-30T22:01:01.449Z")
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .clock(now)
    .visit('http://localhost:3000')
    .get('select[name="low"]').select('40')
    .get('select[name="high"]').select('100')
    .get('select[name="wind"]').select('30')
    .get('select[name="precipProbability"]').select('70')
    .get('form').children('a').click()
});

Cypress.Commands.add('loadBadResults', () => {
  const now = new Date("2029-12-30T13:01:01.449Z")
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .clock(now)
    .visit('http://localhost:3000')
    .get('select[name="low"]').select('40')
    .get('select[name="high"]').select('100')
    .get('select[name="wind"]').select('30')
    .get('select[name="precipProbability"]').select('70')
    .get('form').children('a').click()
});

Cypress.Commands.add('loadSuitableHours', () => {
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
    .get('form').children('a').click()
  cy.get('section[class="results"]').children('a').click()
});

Cypress.Commands.add('loadSuitableHoursWithAdjustedDate', () => {
  const now = new Date("2029-12-30T22:01:01.449Z")
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .clock(now)
    .visit('http://localhost:3000')
});

Cypress.Commands.add('loadCalendar', () => {
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
    .get('form').children('a').click()
  cy.get('section[class="results"]').children('a').click()
  cy.get('section[class="possBlurb"]').children('a').click()
});

Cypress.Commands.add('loadCalendar', () => {
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
    .get('form').children('a').click()
  cy.get('section[class="results"]').children('a').click()
  cy.get('section[class="possBlurb"]').children('a').click()
});

Cypress.Commands.add('loadSuitableHoursWithHours', () => {
  cy.intercept('GET', 'https://api.ipgeolocation.io/ipgeo?apiKey=103a0ac5b110412c9a639e3ab5afd99f&fields=latitude,longitude,time_zone', 
      { statusCode: 200, fixture: 'coordinates.json' })
    .intercept('GET', 'https://api.weather.gov/points/66.6666,-66.666', 
      { fixture: 'weatherFromCoord.json' })
    .intercept('GET', 'https://api.weather.gov/gridpoints/GNV/66,66', 
    { fixture: 'weather.json' })
    .visit('http://localhost:3000')
    .get('select[name="low"]').select('40')
    .get('select[name="high"]').select('100')
    .get('select[name="wind"]').select('30')
    .get('select[name="precipProbability"]').select('70')
    .get('form').children('a').click()
  cy.get('section[class="results"]').children('a').click()
});