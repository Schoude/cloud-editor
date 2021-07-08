import { mount } from '@vue/test-utils';
import UnitListItem from '../../../src/components/list/UnitListItem.vue';
import UnitsList from '../../../src/components/list/UnitsList.vue';
import { TheUnitSchema } from '../../../src/types/property';

const mockUnits: TheUnitSchema[] = [
  {
    guid: '12345',
    status: 'AVAILABLE',
    meta: {
      default: {
        name: 'Unit 1',
      },
    },
  },
  {
    guid: '12345',
    status: 'AVAILABLE',
    meta: {
      default: {
        name: 'Unit 2',
      },
    },
  },
  {
    guid: '12345',
    status: 'AVAILABLE',
    meta: {
      default: {
        name: 'Unit 3',
      },
    },
  },
];

describe('UnitsList', () => {
  it('renders a list of units given as a prop', () => {
    const wrapper = mount(UnitsList, { props: { units: mockUnits } });
    expect(wrapper.findAllComponents(UnitListItem).length).toEqual(
      mockUnits.length
    );
  });
});
