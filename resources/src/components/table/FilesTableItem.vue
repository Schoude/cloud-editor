<template lang="pug">
.files-table-item 
  span.name {{ fileName }}
  .actions
    button.delete X
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'FilesTableItem',
  props: {
    fileName: {
      type: String,
      required: true,
    },
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