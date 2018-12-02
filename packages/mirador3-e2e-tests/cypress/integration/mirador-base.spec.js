/* global cy */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    cy.visit('http://localhost:4000/mirador');
    cy.get('title').contains('Mirador');
  });
});
