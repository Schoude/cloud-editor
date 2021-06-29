<template lang="pug">
section.merge
  h1.title CSV to JSON-Merger
  .meta-info
    .file-selection
      BaseButton(@click='onLoadCSVClick') Wähle eine CSV-Datei zum Mergen aus
    .loaded-json
      h2.title-filename JSON-Datei, in die gemerged wird
      .filename {{ currentFileName }}
  .summary(v-if='csvUnitsWithData.length > 0')
    .count Anzahl Einheiten: {{ csvUnitsWithData.length }}
    .form-field
      label(for='merge-key') Feld in das gemerged wird
      input#merge-key(type='text', v-model='fieldToMergeInto')
    ButtonFab(color='red', title='Liste leeren', @click='clearCSVUnits') 🗑️
  .units-list
    // TODO: make into component - merge all and single merge
    .unit(v-for='unit of csvUnitsWithData', :key='unit.guid')
      | {{ unit.guid }}: {{ unit.meta.default.name }}
</template> 

<script lang="ts">
import { defineComponent, ref } from 'vue';
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
    const fieldToMergeInto = ref('units');
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
      fieldToMergeInto,
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
  column-gap: 1.5em;
  margin-bottom: 1.5em;
}

.count {
  font-size: 1.25em;
}
</style>