<template lang="pug">
header.the-header
  h1 Cloud Editor
  span.current-file__name(v-if='showFileName') geladene Datei: <b>{{ currentFileName }}</b>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import { useData } from '../../composables/use-data';
import { ROUTE_NAMES } from '../../router/routing-info';

export default defineComponent({
  name: 'TheHeader',
  setup: () => {
    const router = useRouter();
    const { currentFileName, fileLoaded } = useData();

    const showFileName = computed(
      () => fileLoaded && router.currentRoute.value.name !== ROUTE_NAMES.HOME
    );

    return {
      currentFileName,
      fileLoaded,
      showFileName,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.the-header {
  padding: 0.5em 2em;
  background-color: $color-element;
  display: flex;
  align-items: center;
  justify-content: space-between;
  // column-gap: 3em;
}

h1 {
  font-size: 1.25em;
}

.current-file__name {
  font-size: 14px;
}
</style>