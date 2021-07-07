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
      input#merge-key(type='text', v-model='fieldToMergeInto', readonly)
    ButtonFab(color='red', title='Liste leeren', @click='clearCSVUnits') 🗑️

  BaseButton.btn-merge-all(
    v-if='csvUnitsWithData.length > 0',
    @click='onMergeALlUnitsClick'
  ) Alle Einheiten mergen

  UnitsList(v-if='csvUnitsWithData.length > 0', :units='csvUnitsWithData')
</template> 

<script lang="ts">
import { defineComponent, Ref, ref } from 'vue';
import BaseButton from '../components/buttons/BaseButton.vue';
import ButtonFab from '../components/buttons/ButtonFab.vue';
import UnitsList from '../components/list/UnitsList.vue';
import { useData } from '../composables/use-data';
import { useMerge } from '../composables/use-merge';
import { FileData } from '../helpers/file-loader';
import { TheInrealCloudProperty } from '../types/property';

export default defineComponent({
  name: 'Merge',
  components: {
    BaseButton,
    ButtonFab,
    UnitsList,
  },
  setup: () => {
    const fieldToMergeInto: Ref<keyof TheInrealCloudProperty> = ref('units');
    const { currentFileName } = useData();
    const {
      loadCSVFile,
      generateUnitsFromCSVFile,
      csvUnitsWithData,
      clearCSVUnits,
      mergeAllUnits,
    } = useMerge();

    async function onLoadCSVClick() {
      generateUnitsFromCSVFile((await loadCSVFile()) as FileData);
    }

    function onMergeALlUnitsClick() {
      mergeAllUnits();
      clearCSVUnits();
    }

    return {
      currentFileName,
      onLoadCSVClick,
      csvUnitsWithData,
      clearCSVUnits,
      fieldToMergeInto,
      onMergeALlUnitsClick,
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

  .btn-merge-all {
    margin-bottom: 1em;
    width: 25em;
  }
</style>