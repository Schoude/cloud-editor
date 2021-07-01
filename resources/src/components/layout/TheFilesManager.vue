<template lang="pug">
.the-files-manager
  .save-file(v-if='fileLoaded')
    form.form-json-file
      .form-field
        label(for='save-file__name') Dateiname
        input#save-file__name.save-file__name(
          type='text',
          autocomplete='off',
          v-model='saveFileName'
        )
      BaseButton.save-button(@click.prevent='onSaveFileClick') 💾 JSON-Datei speichern
  .save-file(v-else)
    span Keine Datei geladen
  Suspense
    template(#default)
      TheFilesTable
    template(#fallback)
      span Lade Dateien
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useConfirmationTask } from '../../composables/use-confirmation-task';
import { useData } from '../../composables/use-data';
import { useModalManager } from '../../composables/use-modal-manager';
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
      existingFiles,
    } = useData();
    const { createConfirmationTask } = useConfirmationTask();
    const { setActiveModal } = useModalManager();

    async function onSaveFileClick() {
      if (existingFiles.value.includes(saveFileName.value)) {
        createConfirmationTask({
          title: 'Datei existiert bereits',
          description: `Eine Datei mit dem Namen <i>${saveFileName.value}</i> existiert bereits.`,
          buttonText: 'Speichern bestätigen',
          type: 'confirmation',
          confirm: async () => {
            await saveFile();
            loadFiles();
          },
        });
        setActiveModal('ModalConfirmation');
        return;
      }

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
    display: grid;
    grid-template-columns: 50% 50%;
    row-gap: 2em;

    .save-file__name {
      min-width: 25em;
    }
  }

  .save-file {
    .save-button {
      margin-top: 2em;
    }
  }
</style>