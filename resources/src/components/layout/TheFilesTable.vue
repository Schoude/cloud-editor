<template lang="pug">
.the-files-table
  .form-field
    label(for='search-term') Suche nach Dateinamen
    input#search-term.search-term(
      type='text',
      autocomplete='off',
      v-model='searchTerm',
      placeholder='cloud-project-property-data'
    )
  template(v-for='file of filteredFiles')
    div {{ file }}
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useData } from '../../composables/use-data';

export default defineComponent({
  name: 'TheFilesTable',
  setup: async () => {
    const { loadFiles, existingFiles } = useData();
    const searchTerm = ref('');
    await loadFiles();

    const filteredFiles = computed(() =>
      existingFiles.value.filter((fileName) =>
        fileName.includes(searchTerm.value)
      )
    );

    return {
      filteredFiles,
      searchTerm,
    };
  },
});
</script>

<style lang="scss" scoped>
</style>