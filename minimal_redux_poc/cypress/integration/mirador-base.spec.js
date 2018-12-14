/* global cy */
describe('Mirador Base', () => {
  it('Visits Mirador Base', () => {
    cy.visit('http://localhost:4444/cypress/public/mirador/');
    cy.get('title').should('contain', 'Mirador');
    cy.get('#manifestURL').type('https://purl.stanford.edu/sn904cj3429/iiif/manifest');
    cy.get('#fetchBtn').click();
    cy.get('li').should('contain', 'https://purl.stanford.edu/sn904cj3429/iiif/manifest');
    cy.get('h3').should('contain', 'Peter\'s San Francisco Locator. The Birds-Eye-View Map of the Exposition City. Published by Locator Publishing Co');
    cy.get('li>button').click();
    cy.get('.mirador-window>img').should('have.attr', 'src', 'https://stacks.stanford.edu/image/iiif/sn904cj3429%2F12027000/full/!400,400/0/default.jpg');
    cy.get('.mirador-window-close').click();
    cy.get('mirador-window').should('not.exist');
  });
});
