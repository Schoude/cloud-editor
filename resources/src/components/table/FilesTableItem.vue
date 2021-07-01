<template lang="pug">
.files-table-item 
  button.load-file(title='Datei laden', @click='onLoadFromStorageClick') ⬆️
  span.name {{ fileName }}
  .actions
    button.download(title='Datei herunterladen', @click='onDownLoadFileClick') ⬇️
    button.delete(@click='onFileDeleteClick', title='Datei löschen') ✖️
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useData } from '../../composables/use-data';
import { useConfirmationTask } from '../../composables/use-confirmation-task';
import { useModalManager } from '../../composables/use-modal-manager';
import { TheInrealCloudProperty } from '../../types/property';

export default defineComponent({
  name: 'FilesTableItem',
  emits: ['file-delete'],
  props: {
    fileName: {
      type: String,
      required: true,
    },
  },
  setup: (props, { emit }) => {
    const { deleteFile, loadFileFromStorage, setCurrentFile, writeJsonFile } =
      useData();
    const { setActiveModal } = useModalManager();
    const { createConfirmationTask } = useConfirmationTask();

    async function onFileDeleteClick() {
      createConfirmationTask({
        title: 'JSON-Datei löschen',
        description: `Datei <i>${props.fileName}</i> wirklich löschen?`,
        buttonText: 'Löschen bestätigen',
        type: 'deletion',
        confirm: async () => {
          await deleteFile(props.fileName);
          emit('file-delete');
        },
      });
      setActiveModal('ModalConfirmation');
    }

    async function onLoadFromStorageClick() {
      const res = await loadFileFromStorage(props.fileName);
      // TODO: validate the contents of loaded file
      // 1) check if all guids are valid
      // 2) check if all required properties are there
      // 3) check if the contents are there
      // 4) show modal with accumulated errors
      setCurrentFile(
        res?.fileName as string,
        res?.file as TheInrealCloudProperty
      );
    }

    async function onDownLoadFileClick() {
      const res = await loadFileFromStorage(props.fileName);
      await writeJsonFile(
        res?.fileName as string,
        res?.file as TheInrealCloudProperty
      );
    }

    return {
      onFileDeleteClick,
      onLoadFromStorageClick,
      onDownLoadFileClick,
    };
  },
});
</script>

<style lang="scss" scoped>
  @use '../../styles/_variables' as *;

  .files-table-item {
    display: flex;
    padding: 0.75em;
    padding-left: 0;
    transition: background-color 0.35s ease, transform 0.5s ease,
      opacity 0.5s ease;
    background-color: rgba($color-primary, 0.2);

    &:hover {
      background-color: rgba($color-primary, 0.4);
    }
  }

  .name {
    flex: 1;
  }
</style>