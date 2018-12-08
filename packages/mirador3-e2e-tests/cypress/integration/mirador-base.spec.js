/* global cy */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    cy.visit('http://localhost:4000/mirador-base');
    cy.get('title').contains('Mirador');
  });
});
