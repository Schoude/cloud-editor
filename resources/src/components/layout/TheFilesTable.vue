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
  .table-content
    template(v-if='filteredFiles.length > 0') 
      TransitionGroup(name='list-filter')
        template(v-for='fileName of filteredFiles', :key='fileName')
          FilesTableItem(:fileName='fileName', @file-delete='loadFiles')
    template(v-else)
      span Keine Dateien gefunden.
</template>

<script lang="ts">
import { computed, defineComponent, ref } from 'vue';
import { useData } from '../../composables/use-data';
import FilesTableItem from '../table/FilesTableItem.vue';

export default defineComponent({
  name: 'TheFilesTable',
  components: {
    FilesTableItem,
  },
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
      loadFiles,
    };
  },
});
</script>

<style lang="scss" scoped>
.table-content {
  width: 500px;
  margin-top: 1em;
}
</style>