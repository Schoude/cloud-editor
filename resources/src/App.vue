<template lang="pug">
TheHeader
.app-content
  TheSideMenu
  RouterView.page
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import TheHeader from './components/layout/TheHeader.vue';
import TheSideMenu from './components/layout/TheSideMenu.vue';
import { useSchema } from './composables/use-schema';

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheSideMenu,
  },
  setup: () => {
    const { loadSchema } = useSchema();
    onMounted(async () => await loadSchema());
  },
});
</script>

<style lang="scss">
@use './styles/_scrollbar' as *;

#app {
  display: flex;
  flex-direction: column;

  .app-content {
    flex: 1;
    display: flex;
    overflow: auto;
  }
}

p {
  font-size: 1.25em;
}

.page {
  flex: 1;
  overflow: auto;
  padding: 1em;
  @include scrollbar();
}
</style>
