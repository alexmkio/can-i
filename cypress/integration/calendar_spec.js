describe('Calendar user flows', () => {

  beforeEach(() => {
    cy.loadList();
  });

  it('The url should be url/', 
  () => {
    cy.url().should('include', '/')
  });

});