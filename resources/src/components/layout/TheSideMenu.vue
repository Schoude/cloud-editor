<template lang="pug">
aside.the-side-menu
  ButtonNavigation(:to='ROUTE_NAMES.HOME') 🏠 Home
  template(v-if='fileLoaded')
    ButtonNavigation(:to='ROUTE_NAMES.EDIT') ⚙️ Editor
    ButtonNavigation(:to='ROUTE_NAMES.MERGE') 🔗 Merge
    ButtonNavigation(:to='ROUTE_NAMES.DIFF') ⛓️ Diff
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useData } from '../../composables/use-data';
import { ROUTE_NAMES } from '../../router/routing-info';
import ButtonNavigation from '../buttons/ButtonNavigation.vue';

export default defineComponent({
  name: 'TheSideMenu',
  components: {
    ButtonNavigation,
  },
  setup: () => {
    const { fileLoaded } = useData();
    return {
      fileLoaded,
      ROUTE_NAMES,
    };
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