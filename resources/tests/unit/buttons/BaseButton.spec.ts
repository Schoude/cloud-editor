import { mount } from '@vue/test-utils';
import BaseButton from '../../../src/components/buttons/BaseButton.vue';

describe('BaseButton', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(BaseButton, {
      slots: {
        default: 'Main Content',
      },
    });
    expect(wrapper.html()).toContain('Main Content');
  });

  it("has role 'button' by default", () => {
    const wrapper = mount(BaseButton);
    expect(wrapper.attributes().role).toBe('button');
  });
});
