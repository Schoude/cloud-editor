<template lang="pug">
aside.the-side-menu
  ButtonNavigation(:to='ROUTE_NAMES.HOME') 🏠 Home
  ButtonNavigation(:to='ROUTE_NAMES.EDIT') ⚙️ Edit
  ButtonNavigation(:to='ROUTE_NAMES.MERGE') 🔗 Merge
  ButtonNavigation(:to='ROUTE_NAMES.DIFF') ⛓️ Diff
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { ROUTE_NAMES } from '../../router/routing-info';
import ButtonNavigation from '../buttons/ButtonNavigation.vue';

export default defineComponent({
  name: 'TheSideMenu',
  components: {
    ButtonNavigation,
  },
  setup: () => {
    return { ROUTE_NAMES };
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.the-side-menu {
  width: 150px;
  background-color: $color-element-alt;
  padding-top: 1em;

  .button-navigation {
    width: 100%;
  }
}
</style>