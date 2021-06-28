<template lang="pug">
section.merge
  h1.title CSV to JSON-Merger
  .meta-info
    .file-selection
      BaseButton(@click='onLoadCSVClick') Wähle eine CSV-Datei zum Mergen aus
    .loaded-json
      h2.title-filename JSON-Datei, in die gemerged wird
      .filename {{ currentFileName }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../components/buttons/BaseButton.vue';
import { useData } from '../composables/use-data';
import { useMerge } from '../composables/use-merge';

export default defineComponent({
  name: 'Merge',
  components: {
    BaseButton,
  },
  setup: () => {
    const { currentFileName } = useData();
    const { loadCSVFile } = useMerge();

    async function onLoadCSVClick() {
      const file = await loadCSVFile();
      console.log(file);
    }

    return {
      currentFileName,
      onLoadCSVClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.title {
  margin-bottom: 1.5em;
}

.meta-info {
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>