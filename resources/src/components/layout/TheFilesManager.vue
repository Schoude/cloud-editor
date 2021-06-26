<template lang="pug">
.the-files-manager
  .save-file(v-if='fileLoaded')
    .form-field
      label(for='save-file__name') Dateiname
      input#save-file__name.save-file__name(
        type='text',
        v-model='saveFileName'
      )
    BaseButton(@click='saveFile') JSON-Datei speichern
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue';
import { useData } from '../../composables/use-data';
import BaseButton from '../buttons/BaseButton.vue';

export default defineComponent({
  name: 'TheFilesManager',
  components: {
    BaseButton,
  },
  setup: () => {
    const { currentFile, currentFileName, fileLoaded, saveFileName, saveFile } =
      useData();

    return {
      currentFile,
      currentFileName,
      fileLoaded,
      saveFileName,
      saveFile,
    };
  },
});
</script>

<style lang="scss" scoped>
.save-file {
  display: flex;
  align-items: center;
  column-gap: 2em;
}

.form-field {
  label {
    display: block;
    padding-left: 0.5em;
    margin-bottom: 0.5em;
  }

  .save-file__name {
    display: block;
    border: 1px solid rgba(white, 0.4);
    background: transparent;
    color: white;
    width: 300px;
    padding: 0 0.5em;
    height: 42px;
  }
}
</style>