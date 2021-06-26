
<template lang="pug">
.the-json-file-loader
  BaseButton(@click='openJsonFile') JSON-Datei öffnen
  span.loaded-file__name(v-if='fileLoaded') <b>{{ currentFileName }}</b> geladen <small>(Schema-Version: {{ currentFile?.version }})</small>.
  span.loaded-file__name(v-else) Keine Datei geladen.
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../buttons/BaseButton.vue';
import { useData } from '../../composables/use-data';

export default defineComponent({
  name: 'TheJsonFileLoader',
  components: {
    BaseButton,
  },
  setup: () => {
    const { openJsonFile, currentFile, currentFileName, fileLoaded } =
      useData();

    return {
      openJsonFile,
      currentFile,
      currentFileName,
      fileLoaded,
    };
  },
});
</script>

<style lang="scss" scoped>
.loaded-file__name {
  margin-left: 1em;
}
</style>