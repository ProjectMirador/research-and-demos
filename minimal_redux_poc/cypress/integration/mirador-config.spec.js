/* global cy */
describe('Config updating from instance', () => {
  it('can modify the config via api', () => {
    cy.visit('http://localhost:4444/cypress/public/mirador/');
    cy.window().then((win) => {
      const a = win.miradorInstance.actions.updateConfig({ foo: 'bat' });
      win.miradorInstance.store.dispatch(a);
      const configFromState = win.miradorInstance.store.getState().config;
      expect(configFromState.foo).to.equal('bat');
    });
  });
});
