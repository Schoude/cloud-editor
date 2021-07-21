import { mount } from '@cypress/vue';
import BaseButton from './BaseButton.vue';

function mountAndGet() {
  return mount(BaseButton, { slots: { default: 'Test' } }).get('button');
}

describe('BaseButton', () => {
  beforeEach(() => {
    cy.viewport('iphone-3');
  });

  it("has a slot for it's label", () => {
    mountAndGet().should('have.text', 'Test');
  });

  it('has the role of "button"', () => {
    mountAndGet()
      .should('have.attr', 'role')
      .vue()
      .then((wrapper) => {
        expect(wrapper.attributes().role).to.equal('button');
      });
  });
});
