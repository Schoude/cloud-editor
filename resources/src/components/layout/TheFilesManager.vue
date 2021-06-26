<template lang="pug">
.the-files-manager
  .save-file(v-if='fileLoaded')
    .form-field
      label(for='save-file__name') Dateiname
      input#save-file__name.save-file__name(
        type='text',
        autocomplete='off',
        v-model='saveFileName'
      )
    BaseButton(@click='onSaveFileClick') 💾 JSON-Datei speichern
  Suspense
    template(#default)
      TheFilesTable
    template(#fallback)
      span Lade Dateien
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useData } from '../../composables/use-data';
import BaseButton from '../buttons/BaseButton.vue';
import TheFilesTable from './TheFilesTable.vue';

export default defineComponent({
  name: 'TheFilesManager',
  components: {
    BaseButton,
    TheFilesTable,
  },
  setup: () => {
    const {
      currentFile,
      currentFileName,
      fileLoaded,
      saveFileName,
      saveFile,
      loadFiles,
    } = useData();

    async function onSaveFileClick() {
      await saveFile();
      loadFiles();
    }

    return {
      currentFile,
      currentFileName,
      fileLoaded,
      saveFileName,
      onSaveFileClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.the-files-manager {
  display: flex;
  flex-direction: column;
  row-gap: 2em;
}

.save-file {
  display: flex;
  align-items: center;
  column-gap: 2em;
}
</style>