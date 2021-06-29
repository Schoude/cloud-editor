<template lang="pug">
.units-list
  UnitListItem(v-for='unit of units', :key='unit?.guid', :unit='unit')
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { TheUnitSchema } from '../../types/property';
import UnitListItem from './UnitListItem.vue';

export default defineComponent({
  name: 'UnitsList',
  components: {
    UnitListItem,
  },
  props: {
    units: {
      type: Object as PropType<TheUnitSchema[]>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
</style>