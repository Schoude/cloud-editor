<template lang="pug">
.property-item-entry(@click.stop='onPropertyItemClick')
  .text-content
    .text(v-if='entry.guid') {{ entry.guid }}
    .text(v-if='entry.meta.default.name') {{ entry.meta?.default.name }}
  .actions
    button.edit 🖊️
    button.delete 🗑️
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';
import { useEditor } from '../../composables/use-editor';
import { useModalManager } from '../../composables/use-modal-manager';
import { useSchema } from '../../composables/use-schema';
import { IPropertyItemEntry } from '../../types/property-schema';

export default defineComponent({
  name: 'PropertyItemEntry',
  props: {
    entry: {
      type: Object as PropType<IPropertyItemEntry>,
      required: true,
    },
  },
  setup: (props) => {
    const { setActiveModal } = useModalManager();
    const { selectedTab } = useEditor();
    const { makePropertyNameSingular } = useSchema();

    function onPropertyItemClick() {
      setActiveModal<{ title: string; entryBaseInfo: any }>(
        'ModalPropertyDetail',
        {
          title: `${
            (props.entry as IPropertyItemEntry)?.meta?.default.name ??
            (props.entry as IPropertyItemEntry)?.guid
          } - ${makePropertyNameSingular(selectedTab.value)}`,
          entryBaseInfo: props.entry,
        }
      );
    }

    return {
      onPropertyItemClick,
    };
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