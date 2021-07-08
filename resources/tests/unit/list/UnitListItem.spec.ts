import { mount } from '@vue/test-utils';
import UnitListItem from '../../../src/components/list/UnitListItem.vue';
import { TheUnitSchema } from '../../../src/types/property';

const mockUnit: TheUnitSchema = {
  guid: '12345',
  status: 'AVAILABLE',
  meta: {
    default: {
      name: 'Unit 1',
    },
  },
};

const mockUnitRef: TheUnitSchema = { ...mockUnit, unitReferenceGuid: '456789' };

describe('UnitListItem', () => {
  it('displays name and guid of the given unit', () => {
    const wrapper = mount(UnitListItem, { props: { unit: mockUnitRef } });
    expect(wrapper.html()).toContain(mockUnit.meta.default.name);
    expect(wrapper.html()).toContain(mockUnit.guid);
  });

  it('gets flagged as a ref unit', () => {
    const wrapper = mount(UnitListItem, { props: { unit: mockUnit } });
    expect(wrapper.classes()).toContain('ref-unit');
  });
});
