describe('Sad path testing', () => {

  it("Should alert the user with an error if the fetch call fails", () => {
    cy.intercept('GET', `http://ip-api.com/json/?fields=49600`, 
      {
        statusCode: 404, 
        body: {
          locked: false
        }
      })
      .visit('http://localhost:3000')
    cy.contains('404')
  })

  it("Should alert the user with an error if the fetch call fails", () => {
    cy.intercept('GET', `http://ip-api.com/json/?fields=49600`, 
      {
        statusCode: 500, 
        body: {
          locked: false
        }
      })
      .visit('http://localhost:3000')
    cy.contains('500')
  })

  it("The error page should have a back button that takes the user home", () => {
    cy.intercept('GET', `http://ip-api.com/json/?fields=49600`, 
      {
        statusCode: 500, 
        body: {
          locked: false
        }
      })
      .visit('http://localhost:3000')
    cy.get('div[class="error-div"]').children('a')
      .should('have.attr', 'href').and('includes', '/')
  })

  it("The user is taken to an error page if they type in an invalid url", () => {
    cy.visit('http://localhost:3000/invalid')
    cy.url().should('include', '/404')
  })

  it("The error page should have a back button that takes the user home", () => {
    cy.visit('http://localhost:3000/invalid')
    cy.url().should('include', '/404')
      .get('div[class="error-div"]').children('a').click()
    cy.url().should('include', '/')
  })

})