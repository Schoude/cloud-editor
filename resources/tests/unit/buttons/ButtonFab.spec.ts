import { mount } from '@vue/test-utils';
import ButtonFab from '../../../src/components/buttons/ButtonFab.vue';

describe('ButtonFab', () => {
  it('renders the default slot content', () => {
    const wrapper = mount(ButtonFab, {
      slots: {
        default: 'Main Content',
      },
    });
    expect(wrapper.html()).toContain('Main Content');
  });

  it("has role 'button' by default", () => {
    const wrapper = mount(ButtonFab);
    expect(wrapper.attributes().role).toBe('button');
  });

  it('has a color prop that adds a class', () => {
    const wrapper = mount(ButtonFab, { props: { color: 'red' } });
    expect(wrapper.classes()).toContain('red');
  });
});
