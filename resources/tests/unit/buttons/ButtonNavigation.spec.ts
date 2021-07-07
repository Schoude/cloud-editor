import { mount, config } from '@vue/test-utils';
import {
  createRouterMock,
  injectRouterMock,
  VueRouterMock,
} from 'vue-router-mock';
import ButtonNavigation from '../../../src/components/buttons/ButtonNavigation.vue';
import { ROUTE_NAMES } from '../../../src/router/routing-info';

const mockRoutes = [
  {
    path: '/',
    name: ROUTE_NAMES.HOME,
    redirect: '',
  },
  {
    path: '/edit',
    name: ROUTE_NAMES.EDIT,
    redirect: '',
  },
];

const router = createRouterMock({ routes: mockRoutes });
beforeEach(() => {
  injectRouterMock(router);
});

config.plugins.VueWrapper.install(VueRouterMock);

function createWrapper(
  wrapperProps?: Record<string, any>,
  slots?: Record<string, any>
) {
  return mount(ButtonNavigation, {
    props: {
      to: ROUTE_NAMES.HOME,
      ...wrapperProps,
    },
    slots,
  });
}

describe('ButtonNavigation', () => {
  it('renders the default slot content', () => {
    const wrapper = createWrapper(
      {},
      {
        default: 'Main Content',
      }
    );
    expect(wrapper.html()).toContain('Main Content');
  });

  it("has role 'button' by default", () => {
    const wrapper = createWrapper();
    expect(wrapper.attributes().role).toBe('button');
  });

  it('has a required prop that determines where to navigate to', () => {
    const wrapper = createWrapper();
    expect(wrapper.props().to).toBe(ROUTE_NAMES.HOME);
  });

  it('gets marked active if the current route matches the "to" prop', async () => {
    const wrapper = createWrapper();

    await wrapper.router.push({ name: ROUTE_NAMES.HOME });
    expect(wrapper.classes()).toContain('active');

    await wrapper.router.push({ name: ROUTE_NAMES.EDIT });
    expect(wrapper.classes()).not.toContain('active');
  });

  it('navigates when clicking the button', async () => {
    const wrapper = createWrapper();
    await wrapper.router.push({ name: ROUTE_NAMES.EDIT });
    await wrapper.trigger('click');
    expect(wrapper.router.currentRoute.value.name).toBe(ROUTE_NAMES.HOME);
  });
});
