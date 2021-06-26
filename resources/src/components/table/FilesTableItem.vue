<template lang="pug">
.files-table-item 
  span.name {{ fileName }}
  .actions
    button.delete(@click='onFileDeleteClick') ✖️
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useData } from '../../composables/use-data';

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
    const { deleteFile } = useData();

    async function onFileDeleteClick() {
      await deleteFile(props.fileName);
      emit('file-delete');
    }
    return {
      onFileDeleteClick,
    };
  },
});
</script>

<style lang="scss" scoped>
.files-table-item {
  display: flex;
  padding: 0.75em;
  transition: background-color 0.35s ease, transform 0.5s ease,
    opacity 0.5s ease;
  background-color: rgba(255, 255, 255, 0.2);

  &:hover {
    background-color: rgba(255, 255, 255, 0.4);
  }
}

.name {
  flex: 1;
}
</style>