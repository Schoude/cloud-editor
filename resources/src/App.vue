<template lang="pug">
TheHeader
.content
  TheSideMenu
  RouterView.page
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue';
import TheHeader from './components/layout/TheHeader.vue';
import TheSideMenu from './components/layout/TheSideMenu.vue';
import { useValidation } from './composables/use-validation';

export default defineComponent({
  name: 'App',
  components: {
    TheHeader,
    TheSideMenu,
  },
  setup: () => {
    const { loadSchema } = useValidation();
    onMounted(async () => await loadSchema());
  },
});
</script>

<style lang="scss">
@use './styles/_scrollbar' as *;

#app {
  display: flex;
  flex-direction: column;
}

.content {
  flex: 1;
  display: flex;
  overflow: auto;
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
