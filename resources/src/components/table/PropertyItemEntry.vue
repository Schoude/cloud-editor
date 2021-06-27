<template lang="pug">
.property-item-entry
  .text-content
    .text(v-if='entry.guid') {{ entry.guid }}
    .text(v-if='entry.meta.default.name') {{ entry.meta?.default.name }}
  .actions
    button.edit 🖊️
    button.delete 🗑️
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { IPropertyItemEntry } from '../../types/property-schema';

export default defineComponent({
  name: 'PropertyItemEntry',
  props: {
    entry: {
      type: Object as PropType<IPropertyItemEntry>,
      required: true,
    },
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.property-item-entry {
  border-radius: 0.25em;
  padding: 0.25em 0.5em;
  background-color: rgba($color-secondary, 0.4);
  transition: background-color 0.4s ease;
  display: flex;
  align-items: center;

  transition: background-color 0.35s ease, transform 0.5s ease,
    opacity 0.5s ease;

  .text-content {
    flex: 1;
  }

  .actions {
    align-self: stretch;

    button {
      height: 100%;
    }
  }

  &:hover {
    background-color: rgba($color-secondary, 0.8);
  }
}
</style>