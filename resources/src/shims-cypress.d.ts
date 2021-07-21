// /// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * Returns the Vue wrapper from vue test Utils
     * @example .vue().then((wrapper) => {
        expect(wrapper.attributes().role).to.equal('button');
      });
     */
    vue(): Promise<any>;
  }
}
