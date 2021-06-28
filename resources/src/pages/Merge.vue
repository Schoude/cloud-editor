<template lang="pug">
section.merge
  h1.title CSV to JSON-Merger
  .meta-info
    .file-selection
      BaseButton(@click='onLoadCSVClick') Wähle eine CSV-Datei zum Mergen aus
    .loaded-json
      h2.title-filename JSON-Datei, in die gemerged wird
      .filename {{ currentFileName }}
  .units-list
    .summary(v-if='csvUnitsWithData.length > 0')
      ButtonFab(color='red', title='Liste leeren', @click='clearCSVUnits') 🗑️
      .count Anzahl Einheiten: {{ csvUnitsWithData.length }}
    .units-list
      .unit(v-for='unit of csvUnitsWithData', :key='unit.guid')
        | {{ unit.guid }}: {{ unit.meta.default.name }}
</template> 

<script lang="ts">
import { defineComponent } from 'vue';
import BaseButton from '../components/buttons/BaseButton.vue';
import ButtonFab from '../components/buttons/ButtonFab.vue';
import { useData } from '../composables/use-data';
import { useMerge } from '../composables/use-merge';
import { FileData } from '../helpers/file-loader';

export default defineComponent({
  name: 'Merge',
  components: {
    BaseButton,
    ButtonFab,
  },
  setup: () => {
    const { currentFileName } = useData();
    const {
      loadCSVFile,
      generateUnitsFromCSVFile,
      csvUnitsWithData,
      clearCSVUnits,
    } = useMerge();

    async function onLoadCSVClick() {
      generateUnitsFromCSVFile((await loadCSVFile()) as FileData);
    }

    return {
      currentFileName,
      onLoadCSVClick,
      csvUnitsWithData,
      clearCSVUnits,
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

.summary {
  display: flex;
  align-items: center;
  height: 80px;

  .count {
    margin-left: 1.5em;
  }
}
</style>