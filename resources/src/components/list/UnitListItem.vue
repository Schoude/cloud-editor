<template lang="pug">
.unit-list-item(:class='{ "ref-unit": isRefUnit }')
  b.name {{ unit.meta.default.name }}
  .guid {{ unit.guid }}
</template>

<script lang="ts">
import { computed, defineComponent, PropType } from 'vue';
import { TheUnitSchema } from '../../types/property';

export default defineComponent({
  name: 'UnitListItem',
  props: {
    unit: {
      type: Object as PropType<TheUnitSchema>,
      required: true,
    },
  },
  setup: (props) => {
    const isRefUnit = computed(() => props.unit.unitReferenceGuid == null);

    return {
      isRefUnit,
    };
  },
});
</script>

<style lang="scss" scoped>
  @use '../../styles/_variables' as *;

  .unit-list-item {
    padding: 0.25em 0.5em;
    background-color: $color-element-alt;
    width: 25em;
    border-radius: 0.25em;
    transition: background-color 0.35s ease;

    &:hover {
      background-color: lighten($color-element-alt, 10);
    }

    & ~ & {
      margin-top: 0.5em;
    }

    &.ref-unit {
      background-color: rgba($color-secondary, 0.5);

      &:hover {
        background-color: rgba($color-secondary, 0.8);
      }
    }
  }
</style>