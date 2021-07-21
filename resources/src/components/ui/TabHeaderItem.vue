<template lang="pug">
.tab-header-item(
  :class='{ selected: isTabSelected(tabName) }',
  :title='getDescription(tabName)',
  @click='setSelectedTab(tabName)'
) {{ tabName }}
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useEditor } from '../../composables/use-editor';
import { useSchema } from '../../composables/use-schema';

export default defineComponent({
  name: 'TabHeaderItem',
  props: {
    tabName: {
      type: String,
      required: true,
    },
  },
  setup: () => {
    const { getDescription } = useSchema();
    const { isTabSelected, setSelectedTab } = useEditor();

    return {
      getDescription,
      isTabSelected,
      setSelectedTab,
    };
  },
});
</script>

<style lang="scss" scoped>
@use '../../styles/_variables' as *;

.tab-header-item {
  display: flex;
  align-items: center;
  height: 50px;
  padding: 0 0.5em;
  background-color: rgba($color-primary, 0.4);
  transition: background-color 0.4s ease;
  cursor: pointer;

  &:hover,
  &.selected {
    background-color: rgba($color-primary, 0.8);
  }
}
</style>